import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const API_URL = "http://localhost:40310/api/books";

  const fetchBooks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setBooks(data);
  };

  const addBook = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author })
    });
    setTitle("");
    setAuthor("");
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "Arial" }}>
      <h1>📚 Book Management System</h1>
      <form onSubmit={addBook} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "8px", marginRight: "5px" }}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={{ padding: "8px", marginRight: "5px" }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>Add</button>
      </form>

      <h2>All Books</h2>
      <div>
        {books.map((b) => (
          <div key={b.id} style={{ border: "1px solid #ccc", margin: "5px", padding: "8px", borderRadius: "5px" }}>
            {b.title} by {b.author}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
