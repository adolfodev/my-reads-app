import "./App.css";
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

export default BookSection;
