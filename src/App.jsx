import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import * as BooksAPI from "./BooksAPI.js";
import SearchBook from "./SearchBook.jsx";
import BookList from "./BookList.jsx";

function App() {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    const res = await BooksAPI.getAll();
    setBooks(res);
  };

  const updateBookState = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    await getBooks();
  };

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
   return (
        <Routes>
            <Route
                exact
                path="/"
                element={
                    <BookList books={books} updateBookState={updateBookState}/>
                }
            />
            <Route
                path="/search"
                element={
                    <SearchBook books={books} updateBookState={updateBookState}/>
                }
            />
        </Routes>
    );
}

export default App;
