import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookForm from "../components/BookForm";

// Composant pour modifier un livre
export default function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  // Récupérer les données du livre pour l'édition
  useEffect(() => {
    fetch(`http://localhost:3001/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Erreur GET book:", err));
  }, [id]);

  return (
    <div>
      {book ? (
        <BookForm mode="edit" initialData={book} />
      ) : (
        <p>Chargement du livre...</p>
      )}
    </div>
  );
}
