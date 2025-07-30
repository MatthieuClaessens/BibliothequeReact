import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Composant pour ajouter ou modifier un livre
export default function BookForm({ mode = "add" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === "edit" || !!id;

  // État pour les données du formulaire et les erreurs de validation
  const [formData, setFormData] = useState({
    titre: "",
    auteur: "",
    genre: "",
    date: "",
    urlcover: "",
    resume: "",
  });
  const [errors, setErrors] = useState({});

  // Récupérer les données du livre si on est en mode édition
  useEffect(() => {
    if (isEdit && id) {
      fetch(`http://localhost:3001/books/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Erreur lors de la récupération");
          return res.json();
        })
        .then(data => {
          setFormData({
            titre: data.titre || "",
            auteur: data.auteur || "",
            genre: data.genre || "",
            date: data.date || "",
            urlcover: data.couverture || "",
            resume: data.resume || "",
          });
        })
        .catch(console.error);
    }
  }, [id, isEdit]);

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { id: field, value } = e.target;
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  // Valider les données du formulaire
  const validate = () => {
    const newErrors = {};
    if (!formData.titre.trim()) newErrors.titre = "Le titre est requis.";
    if (!formData.auteur.trim()) newErrors.auteur = "L'auteur est requis.";
    if (!formData.genre.trim()) newErrors.genre = "Le genre est requis.";
    if (!formData.date.trim()) newErrors.date = "La date est requise.";
    if (!formData.resume.trim()) newErrors.resume = "Le résumé est requis.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      titre: formData.titre,
      auteur: formData.auteur,
      genre: formData.genre,
      date: formData.date,
      couverture: formData.urlcover,
      resume: formData.resume,
    };

    try {
      if (isEdit) {
        await fetch(`http://localhost:3001/books/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: parseInt(id), ...payload }),
        });
      } else {
        await fetch("http://localhost:3001/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      navigate("/");
    } catch {
      alert("Erreur lors de l'enregistrement, réessayez.");
    }
  };

  return (
    <div className="form-page">
      <h2 className="form-title">{isEdit ? "Modifier le livre" : "Ajouter un nouveau livre"}</h2>
      <form onSubmit={handleSubmit} className="book-form">
        {[
          { label: "Titre *", id: "titre", type: "text" },
          { label: "Auteur *", id: "auteur", type: "text" },
          { label: "Genre *", id: "genre", type: "text" },
          { label: "Date de publication *", id: "date", type: "date" },
          { label: "URL de la couverture", id: "urlcover", type: "text" },
        ].map(({ label, id, type }) => (
          <div className="form-group" key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              type={type}
              id={id}
              value={formData[id]}
              onChange={handleChange}
            />
            {errors[id] && <p className="error-message">{errors[id]}</p>}
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="resume">Résumé *</label>
          <textarea
            id="resume"
            value={formData.resume}
            onChange={handleChange}
          />
          {errors.resume && <p className="error-message">{errors.resume}</p>}
        </div>
        <button type="submit" className="submit-button">
          {isEdit ? "Enregistrer les modifications" : "Ajouter le livre"}
        </button>
      </form>
      <style>
        {`
          .form-page {
            background: #f5f5f5;
            min-height: 100vh;
            padding: 2rem;
          }
          .form-title {
            text-align: center;
            margin-bottom: 2rem;
            color: #333;
          }
          .book-form {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .form-group {
            margin-bottom: 1.5rem;
          }
          label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: #333;
          }
          input,
          textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
          }
          textarea {
            min-height: 120px;
          }
          .submit-button {
            width: 100%;
            background: #2ecc71;
            color: #fff;
            padding: 1rem;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
          }
          .submit-button:hover {
            background: #27ae60;
          }
          .error-message {
            color: red;
            font-size: 0.9rem;
            margin-top: 5px;
          }
        `}
      </style>
    </div>
  );
}
