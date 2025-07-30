import React from "react";
import { useNavigate } from 'react-router-dom';

// Fonction utilitaire pour formater la date de YYYY-MM-DD à DD/MM/YYYY
function formatDate(dateString) {
  if (!dateString) return "Date inconnue";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

// Composant pour afficher les détails d'un livre sous forme de carte
export default function BookCard({ id, titre, auteur, genre, date, resume, couverture, deleteBook }) {
  const navigate = useNavigate();

  // Définir une image de couverture par défaut si aucune n'est fournie
  const coverUrl = couverture && couverture.trim() !== ""
    ? couverture
    : "/images/couvertures/blank-img.webp"; // Image par défaut

  return (
    <div style={{
      border: '1px solid #ccc',
      margin: '1rem',
      borderRadius: '8px',
      backgroundColor: '#fff',
      width: '350px',
      height: '550px',
      fontFamily: "Instrument Sans, sans-serif",
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }}>
      <img
        src={coverUrl}
        alt={titre}
        style={{
          width: '100%',
          height: '45%',
          borderRadius: '4px',
          objectFit: 'cover'
        }}
      />
      <div style={{ padding: "15px" }}>
        <h2 style={{ fontSize: "19px" }}>{titre}</h2>
        <br />
        <h4 style={{ color: "#2596be" }}>{auteur}</h4>
        <br />
        <div style={{ color: "gray" }}>
          <p>{genre}</p>
          <br />
          <p>{formatDate(date)}</p>
        </div>
        <br />
        <p style={{
          display: "-webkit-box",
          overflow: "hidden",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical"
        }}>{resume}</p>
        <br />
        <div style={{ display: "flex", gap: "5px" }}>
          <button onClick={() => navigate(`/edit/${id}`)} style={{
            width: "100px", height: "40px",
            backgroundColor: "#3795dc", border: "none", borderRadius: "5px",
            color: "white"
          }}>Modifier</button>
          <button onClick={() => deleteBook(id)} style={{
            width: "100px", height: "40px",
            backgroundColor: "#e44c3b", border: "none", borderRadius: "5px",
            color: "white"
          }}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}
