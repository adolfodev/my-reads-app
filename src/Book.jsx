import "./App.css";
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
          <select onChange={changeShelf}>
            <option value="none" disabled selected>
              Move to...
            </option>
            {
              Object.values(STATES_OF_BOOKS).map(state => {
                return (<option value={state.shelf}>{state.title}</option>)
              })
            }
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book?.authors?.map((author) => {
        return <div className="book-authors">{author}</div>;
      })}
    </div>
  );
};
export default Book;
