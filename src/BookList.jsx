import "./App.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BookSection from "./BookSection.jsx";
import { STATES_OF_BOOKS } from "./Constants.js";

const BookList = ({books, updateBookState}) => {
    const filterBooks = (shelf) => {
        return books.filter((book) => book.shelf === shelf);
    };
    return  (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookSection
                title={STATES_OF_BOOKS.CURRENTY_READING.title}
                books={filterBooks(STATES_OF_BOOKS.CURRENTY_READING.shelf)}
                updateBookState={updateBookState}
              />
              <BookSection
                title={STATES_OF_BOOKS.WANT_TO_READ.title}
                books={filterBooks(STATES_OF_BOOKS.WANT_TO_READ.shelf)}
                updateBookState={updateBookState}
              />
              <BookSection
                title={STATES_OF_BOOKS.READ.title}
                books={filterBooks(STATES_OF_BOOKS.READ.shelf)}
                updateBookState={updateBookState}
              />
            </div>
          </div>
          <div className="open-search">
            <Link className="open-search" to="/search">
                Add a book
            </Link>
          </div>
        </div>
      )
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      shelf: PropTypes.string,
    })
  ).isRequired,
  updateBookState: PropTypes.func.isRequired,
};

export default BookList;