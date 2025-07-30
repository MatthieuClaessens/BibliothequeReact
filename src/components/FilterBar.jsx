import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Composant pour filtrer les livres
export default function FilterBar({ onFilter, activeFilters }) {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    year: ''
  });

  // Synchroniser les entrées avec les filtres actifs
  useEffect(() => {
    setFilters(activeFilters);
  }, [activeFilters]);

  // Récupérer les genres et les années pour les options de filtre
  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => {
        setGenres([...new Set(data.map(book => book.genre))]);
        setYears([...new Set(data.map(book => new Date(book.date).getFullYear().toString()))]);
      });
  }, []);

  // Gérer les changements dans les entrées
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Appliquer les filtres
  const applyFilters = () => {
    onFilter(filters);
    setShowFilters(false);
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    const emptyFilters = { search: '', genre: '', year: '' };
    setFilters(emptyFilters);
    onFilter(emptyFilters);
  };

  // Vérifier si un filtre est appliqué
  const isAnyFilterApplied = activeFilters.search || activeFilters.genre || activeFilters.year;

  return (
    <div style={{ backgroundColor: "#beb8b9", padding: "20px 100px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={buttonStyle("#2a9ddb")}
        >
          {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
        </button>
        <button
          onClick={() => navigate('/add')}
          style={buttonStyle("#3ecb7b")}
        >
          Ajouter un livre
        </button>
      </div>
      {showFilters && (
        <div style={{
          backgroundColor: "white",
          padding: "20px",
          marginTop: "10px",
          borderRadius: "5px"
        }}>
          <div style={{ marginBottom: "15px" }}>
            <label>Recherche</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Titre ou auteur"
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Genre</label>
            <select
              name="genre"
              value={filters.genre}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Tous les genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Année</label>
            <select
              name="year"
              value={filters.year}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Toutes les années</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          {isAnyFilterApplied ? (
            <button
              onClick={resetFilters}
              style={buttonStyle("#ff4d4d", "100%")}
            >
              Réinitialiser les filtres
            </button>
          ) : (
            <button
              onClick={applyFilters}
              style={buttonStyle("#2a9ddb", "100%")}
            >
              Appliquer les filtres
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Fonction utilitaire pour le style des boutons
const buttonStyle = (color, width = "130px") => ({
  backgroundColor: color,
  color: "white",
  width: width,
  height: "40px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
});

// Style pour les éléments d'entrée
const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  borderRadius: "4px",
  border: "1px solid #ddd"
};
