import "./App.css";
import PropTypes from "prop-types";
import { STATES_OF_BOOKS } from "./Constants.js";

const Book = ({ book, updateBookState}) => {
  const changeShelf = (e) => {
    const shelf = e.target.value;
    if (shelf != book.shelf) {
      updateBookState(book, e.target.value);    
    }
  }
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${book.imageLinks?.thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select onChange={changeShelf} value={book.shelf || "none"}>
            <option value="none" disabled>
              Move to...
            </option>
            {
              Object.values(STATES_OF_BOOKS).filter(state => state.shelf !== "none").map(state => {
                return (<option key={state.shelf} value={state.shelf}>{state.title}</option>)
              })
            }
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book?.authors?.map((author) => {
        return <div key={author} className="book-authors">{author}</div>;
      })}
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
    shelf: PropTypes.string,
  }).isRequired,
  updateBookState: PropTypes.func.isRequired,
};

export default Book;
