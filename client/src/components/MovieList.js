import React from 'react';
import MovieItem from './MovieItem';

// This component displays the list of movies.
// It receives the 'movies' array and the 'deleteMovie' function from App.js.
function MovieList({ movies, deleteMovie }) {
  return (
    <div className="movie-list">
      {/* If there are no movies, display a message. Otherwise, render the list. */}
      {movies.length === 0 ? (
        <p>No movies yet. Add one!</p>
      ) : (
        movies.map((movie) => (
          // For each movie in the array, render a MovieItem component
          <MovieItem key={movie._id} movie={movie} deleteMovie={deleteMovie} />
        ))
      )}
    </div>
  );
}

export default MovieList;
