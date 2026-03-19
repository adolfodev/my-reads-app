import "./App.css";
import { useState } from 'react';
import { Link } from "react-router-dom";
import BookSection from "./BookSection";
import * as BooksAPI from "./BooksAPI.js";
const SearchBook = ({updateBookState}) => {
  const [query, setQuery] = useState("");
  const [foundBooks, setFoundBooks] = useState([]);
  
    const searchBook = async (searchQuery) => {
       const res = await BooksAPI.search(searchQuery,10);
       setFoundBooks(res ?? []); 
    }
    
  
    const updateQuery = async (query) => {
      const trimmedQuery = query.trim();
      setQuery(trimmedQuery);
      await searchBook(trimmedQuery);
    };
  
    const clearData = () => {
      setQuery("");
      setFoundBooks([]);
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
      {foundBooks.length ?
        <div className="search-books-results">
          <BookSection title="" books={foundBooks} updateBookState={updateBookState}/>
        </div>
      : ''}
    </div>
  );
};
export default SearchBook;
