"use client";
import { useState } from "react";
import { Book } from "../_type/iCustomBooks";




export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddBook(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newBook.title || !newBook.author) {
      setFeedback("Please provide both title and author.");
      return;
    }

    const newId = books.length ? books[books.length - 1].id + 1 : 1;
    setBooks((prev) => [...prev, { id: newId, ...newBook }]);
    setNewBook({ title: "", author: "" });
    setFeedback(null);
  }

  function handleLogout() {

    window.location.href = "/login";
  }

  return (
    <div className="h-screen flex flex-col bg-slate-700 text-white">
      {/* Header */}
      <header className="p-4 bg-blue-600 flex justify-between items-center">
        <h1 className="text-2xl">Book Tracker</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-400"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Add New Book Form */}
        <form
          onSubmit={handleAddBook}
          className="flex gap-4 mb-6 items-center bg-gray-800 p-4 rounded"
        >
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={newBook.title}
            onChange={handleInputChange}
            className="flex-1 p-2 rounded text-black"
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newBook.author}
            onChange={handleInputChange}
            className="flex-1 p-2 rounded text-black"
            required
          />
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-400"
          >
            Add Book
          </button>
        </form>

        {/* Feedback Message */}
        {feedback && <p className="text-red-400 mb-4">{feedback}</p>}

        {/* Book List */}
        <section>
          <h2 className="text-xl mb-4">Books</h2>
          {books.length > 0 ? (
            <ul className="space-y-2">
              {books.map((book) => (
                <li
                  key={book.id}
                  className="flex justify-between items-center bg-gray-800 p-4 rounded"
                >
                  <div>
                    <h3 className="text-lg">{book.title}</h3>
                    <p className="text-gray-400">by {book.author}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No books added yet. Start by adding a new book!</p>
          )}
        </section>
      </main>
    </div>
  );
}
