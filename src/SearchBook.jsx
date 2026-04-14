import "./App.css";
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import BookSection from "./BookSection";
import * as BooksAPI from "./BooksAPI.js";

const SearchBook = ({books, updateBookState}) => {
  const [query, setQuery] = useState("");
  const [foundBooks, setFoundBooks] = useState([]);
  
  useEffect(() => {
    if (!query.trim()) {
      return;
    }
    
    const debounceTimer = setTimeout(() => {
      BooksAPI.search(query.trim(), 10)
        .then((res) => {
          if (Array.isArray(res)) {
            const booksWithShelf = res.map(searchBook => {
              const matchedBook = books.find(book => book.id === searchBook.id);
              return matchedBook ? { ...searchBook, shelf: matchedBook.shelf } : { ...searchBook, shelf: 'none' };
            });
            setFoundBooks(booksWithShelf);
          } else {
            setFoundBooks([]);
          }
        })
        .catch(() => {
          setFoundBooks([]);
        });
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [query]);
  
  const updateQuery = (queryValue) => {
    setQuery(queryValue);
  };
  
  const displayBooks = query.trim() ? foundBooks : [];
  
    const clearData = () => {
      setQuery("");
    };
    
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" onClick={clearData}>
          Close now
        </Link>
        <div className="search-books-input-wrapper">
          <input type="text" value={query} placeholder="Search by title, author, or ISBN" onInput={(event)=>updateQuery(event.target.value)}/>
        </div>
      </div>
      {displayBooks.length ?
        <div className="search-books-results">
          <BookSection title="" books={displayBooks} updateBookState={updateBookState}/>
        </div>
      : ''}
    </div>
  );
};

SearchBook.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  updateBookState: PropTypes.func.isRequired,
};

export default SearchBook;
