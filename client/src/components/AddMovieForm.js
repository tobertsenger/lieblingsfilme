    import React, { useState } from 'react';

// This component renders a form to add a new movie.
// It receives the 'addMovie' function from its parent (App.js) via props.
function AddMovieForm({ addMovie }) {
  // State for the title input field
  const [title, setTitle] = useState('');
  // State for the year input field
  const [year, setYear] = useState('');

  // Handles form submission
  const handleSubmit = (e) => {
    // Prevents the default form submission behavior (which reloads the page)
    e.preventDefault();
    // Basic validation: if either field is empty, do nothing.
    if (!title || !year) return;

    // Call the addMovie function passed down from App.js
    addMovie({ title, year: Number(year) });

    // Clear the input fields after submission
    setTitle('');
    setYear('');
  };

  // Render the form
  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <h2>Add a New Favorite Movie</h2>
      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <button type="submit">Add Movie</button>
    </form>
  );
}

export default AddMovieForm;
