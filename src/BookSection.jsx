import "./App.css";
import PropTypes from "prop-types";
import Book from "./Book.jsx";

const BookSection = ({ title, books, updateBookState }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <li key={book.id}>
                <Book book={book} updateBookState={updateBookState}/>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

BookSection.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  updateBookState: PropTypes.func.isRequired,
};

export default BookSection;
