import React from 'react';

// This component displays the details of a single movie.
// It receives the 'movie' object and the 'deleteMovie' function from MovieList.js.
function MovieItem({ movie, deleteMovie }) {
  return (
    <div className="movie-item">
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      {/* The delete button calls the deleteMovie function with the movie's ID */}
      <button onClick={() => deleteMovie(movie._id)}>Delete</button>
    </div>
  );
}

export default MovieItem;
