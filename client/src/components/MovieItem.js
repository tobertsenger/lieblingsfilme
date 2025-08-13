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

  return (
    <div className="movie-item">
      {isEditing ? (
        // Bearbeitungsmodus: Eingabefelder anzeigen
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-input"
          />
          <input
            type="number"
            value={editYear}
            onChange={(e) => setEditYear(e.target.value)}
            className="edit-input"
          />
          <div className="edit-buttons">
            <button onClick={handleSave} className="save-btn">Speichern</button>
            <button onClick={handleCancel} className="cancel-btn">Abbrechen</button>
          </div>
        </>
      ) : (
        // Anzeigemodus: Film-Details anzeigen
        <>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <div className="movie-buttons">
            <button onClick={() => setIsEditing(true)} className="edit-btn">Bearbeiten</button>
            {/* Der Löschen-Button ruft die deleteMovie-Funktion mit der ID des Films auf */}
            <button onClick={() => deleteMovie(movie._id)} className="delete-btn">Löschen</button>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieItem;
