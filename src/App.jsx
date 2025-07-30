import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import FilterBar from './components/FilterBar.jsx';
import BookList from './pages/BookList.jsx';
import AddBook from './pages/AddBook.jsx';
import BookForm from './components/BookForm.jsx';

// Composant principal de l'application
function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    year: ''
  });

  // Récupérer les données des livres
  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setFilteredBooks(data);
      });
  }, []);

  // Appliquer les filtres
  const onFilter = (newFilters) => {
    setFilters(newFilters);
    let filtered = [...books];
    if (newFilters.search) {
      const searchLower = newFilters.search.toLowerCase();
      filtered = filtered.filter(book =>
        book.titre.toLowerCase().includes(searchLower) ||
        book.auteur.toLowerCase().includes(searchLower)
      );
    }
    if (newFilters.genre) {
      filtered = filtered.filter(book => book.genre === newFilters.genre);
    }
    if (newFilters.year) {
      filtered = filtered.filter(book => {
        const bookYear = new Date(book.date).getFullYear().toString();
        return bookYear === newFilters.year;
      });
    }
    setFilteredBooks(filtered);
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    const emptyFilters = { search: '', genre: '', year: '' };
    setFilters(emptyFilters);
    setFilteredBooks(books);
  };

  return (
    <>
      <Header onFilter={onFilter} resetFilters={resetFilters} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <FilterBar onFilter={onFilter} activeFilters={filters} />
              <BookList books={filteredBooks} filters={filters} />
            </>
          }
        />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<BookForm />} />
      </Routes>
    </>
  );
}

export default App;
