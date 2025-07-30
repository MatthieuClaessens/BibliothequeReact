import { Link, useLocation } from 'react-router-dom';
import FilterBar from '../components/FilterBar.jsx';

// Composant d'en-tête avec des liens de navigation
export default function Header({ onFilter, resetFilters }) {
  const location = useLocation();
  const isAddPage = location.pathname === '/add';

  return (
    <>
      <header style={{
        backgroundColor: "#2c3f50",
        padding: "10px 0 15px 100px",
        color: "white",
        fontFamily: "Instrument Sans, sans-serif"
      }}>
        <h1 style={{ paddingBottom: "10px" }}>Bibliothèque</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            to="/"
            style={{ color: "white", textDecoration: "none" }}
            onClick={() => resetFilters()}
          >
            Accueil
          </Link>
          <Link to="/add" style={{ color: "white", textDecoration: "none" }}>Ajouter un livre</Link>
        </div>
      </header>
    </>
  );
}
