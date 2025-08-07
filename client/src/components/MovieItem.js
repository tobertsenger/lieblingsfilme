import React from 'react';

// Diese Komponente zeigt die Details eines einzelnen Films an.
// Sie erhält das 'movie'-Objekt und die 'deleteMovie'-Funktion von MovieList.js.
function MovieItem({ movie, deleteMovie }) {
  return (
    <div className="movie-item">
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      {/* Der Löschen-Button ruft die deleteMovie-Funktion mit der ID des Films auf */}
      <button onClick={() => deleteMovie(movie._id)}>Löschen</button>
    </div>
  );
}

export default MovieItem;
