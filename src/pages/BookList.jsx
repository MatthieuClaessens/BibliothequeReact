import React, { useState, useEffect } from "react";
import BookCard from '../components/BookCard.jsx';

// Composant pour lister et afficher les livres
function BookList({ filters }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Récupérer les données des livres
  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setFilteredBooks(data);
      })
      .catch(err => console.error(err));
  }, []);

  // Appliquer les filtres aux livres
  useEffect(() => {
    const filtered = books.filter(book => {
      const matchesSearch = book.titre.toLowerCase().includes(filters.search.toLowerCase()) ||
                            book.auteur.toLowerCase().includes(filters.search.toLowerCase());
      const matchesGenre = !filters.genre || book.genre === filters.genre;
      const matchesYear = !filters.year || new Date(book.date).getFullYear().toString() === filters.year;

      return matchesSearch && matchesGenre && matchesYear;
    });
    setFilteredBooks(filtered);
  }, [filters, books]);

  // Gérer la suppression d'un livre
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce livre?')) {
      try {
        await fetch(`http://localhost:3001/books/${id}`, {
          method: "DELETE"
        });
        setBooks(prev => prev.filter(book => book.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression :', error);
      }
    }
  };

  return (
    <div style={{
      backgroundColor: "#beb8b9",
      minHeight: "100vh",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      paddingTop: "20px"
    }}>
      {filteredBooks.map(book => (
        <BookCard
          key={book.id}
          {...book}
          deleteBook={handleDelete}
        />
      ))}
    </div>
  );
}

export default BookList;
