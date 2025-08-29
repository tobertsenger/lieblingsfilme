import React, { useState } from 'react';

// Diese Komponente zeigt die Details eines einzelnen Films an.
// Sie erhält das 'movie'-Objekt, die 'deleteMovie'-Funktion und die 'updateMovie'-Funktion von MovieList.js.
function MovieItem({ movie, deleteMovie, updateMovie }) {
  // State für den Bearbeitungsmodus
  const [isEditing, setIsEditing] = useState(false);
  // State für die bearbeiteten Werte
  const [editTitle, setEditTitle] = useState(movie.title);
  const [editYear, setEditYear] = useState(movie.year);

  // Funktion zum Speichern der Änderungen
  const handleSave = () => {
    // Einfache Validierung
    if (!editTitle || !editYear) return;
    
    // Die updateMovie-Funktion aufrufen
    updateMovie(movie._id, { title: editTitle, year: Number(editYear) });
    
    // Bearbeitungsmodus beenden
    setIsEditing(false);
  };

  // Funktion zum Abbrechen der Bearbeitung
  const handleCancel = () => {
    // Werte zurücksetzen
    setEditTitle(movie.title);
    setEditYear(movie.year);
    // Bearbeitungsmodus beenden
    setIsEditing(false);
  };

  // Generate a random movie poster image from Unsplash
  const posterImage = `https://source.unsplash.com/300x450/?movie,cinema,poster&sig=${movie._id}`;

  return (
    <div className="movie-item">
      {isEditing ? (
        // Bearbeitungsmodus: Eingabefelder anzeigen
        <div className="edit-mode">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-input"
            placeholder="Film Titel"
          />
          <input
            type="number"
            value={editYear}
            onChange={(e) => setEditYear(e.target.value)}
            className="edit-input"
            placeholder="Jahr"
          />
          <div className="edit-buttons">
            <button onClick={handleSave} className="save-btn">Speichern</button>
            <button onClick={handleCancel} className="cancel-btn">Abbrechen</button>
          </div>
        </div>
      ) : (
        // Anzeigemodus: Film-Details anzeigen
        <div className="movie-card">
          <div className="movie-poster">
            <img src={posterImage} alt={movie.title} />
            <div className="movie-overlay">
              <div className="movie-actions">
                <button onClick={() => setIsEditing(true)} className="action-btn edit-btn">
                  <i className="icon">✏️</i>
                </button>
                <button onClick={() => deleteMovie(movie._id)} className="action-btn delete-btn">
                  <i className="icon">🗑️</i>
                </button>
              </div>
            </div>
          </div>
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-year">{movie.year}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieItem;
