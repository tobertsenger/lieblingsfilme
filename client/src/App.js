
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import './App.css';

// Basis-URL für unser Backend-API
const API_URL = 'https://lieblingsfilme.onrender.com/api/movies';

function App() {
  // State für das Array der Filme
  const [movies, setMovies] = useState([]);

  // useEffect-Hook, um Filme beim Laden der Komponente abzurufen
  useEffect(() => {
    getMovies();
  }, []);

  // --- API-Funktionen ---

  // Funktion, um alle Filme vom Backend zu holen
  const getMovies = async () => {
    try {
      const response = await axios.get(API_URL);
      setMovies(response.data); // State mit abgerufenen Filmen aktualisieren
    } catch (error) {
      console.error('Fehler beim Abrufen der Filme:', error);
    }
  };

  // Funktion, um einen neuen Film hinzuzufügen
  const addMovie = async (movie) => {
    try {
      const response = await axios.post(`${API_URL}/add`, movie);
      // Den neuen Film, der vom API zurückgegeben wird, zum lokalen State hinzufügen
      setMovies([...movies, response.data]);
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Films:', error);
    }
  };

  // Funktion, um einen Film anhand seiner ID zu aktualisieren
  const updateMovie = async (id, updatedMovie) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedMovie);
      // Den aktualisierten Film im lokalen State ersetzen
      setMovies(movies.map((movie) => 
        movie._id === id ? response.data : movie
      ));
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Films:', error);
    }
  };

  // Funktion, um einen Film anhand seiner ID zu löschen
  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Den gelöschten Film aus dem lokalen State herausfiltern
      setMovies(movies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error('Fehler beim Löschen des Films:', error);
    }
  };

  return (
    <div className="App">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Meine Lieblingsfilme</h1>
              <p className="hero-subtitle">
                Entdecke, sammle und verwalte deine persönliche Filmsammlung
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">{movies.length}</span>
                  <span className="stat-label">Filme</span>
                </div>
                <div className="stat">
                  <span className="stat-number">∞</span>
                  <span className="stat-label">Möglichkeiten</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="main-nav">
        <div className="container">
          <div className="nav-content">
            <div className="nav-logo">
              <span className="logo-icon">🎬</span>
              <span className="logo-text">FilmBox</span>
            </div>
            <div className="nav-links">
              <a href="#meine-filme" className="nav-link active">Meine Filme</a>
              <a href="#hinzufuegen" className="nav-link">Film hinzufügen</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="App-main">
        {/* Add Movie Section */}
        <section id="hinzufuegen" className="add-movie-section">
          <div className="container">
            <div className="section-header">
              <h2>Neuen Film hinzufügen</h2>
              <p>Erweitere deine Sammlung um weitere Lieblingsfilme</p>
            </div>
            <AddMovieForm addMovie={addMovie} />
          </div>
        </section>

        {/* Movies Collection */}
        <section id="meine-filme" className="movie-collection">
          <div className="container">
            <div className="section-header">
              <h2>Meine Filmsammlung</h2>
              <p>Hier findest du alle deine gespeicherten Lieblingsfilme</p>
            </div>
            <MovieList movies={movies} deleteMovie={deleteMovie} updateMovie={updateMovie} />
          </div>
        </section>

        {/* Featured Movies Placeholder */}
        {movies.length === 0 && (
          <section className="featured-section">
            <div className="container">
              <h2>Beginne deine Filmreise</h2>
              <div className="featured-grid">
                <div className="featured-item">
                  <div className="featured-poster">
                    <img src="https://images.unsplash.com/photo-1489599543865-a25e41e1ff08?w=300&h=450&fit=crop" 
                         alt="Featured Movie" />
                  </div>
                  <h3>Klassiker entdecken</h3>
                  <p>Füge zeitlose Filmklassiker zu deiner Sammlung hinzu</p>
                </div>
                <div className="featured-item">
                  <div className="featured-poster">
                    <img src="https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=300&h=450&fit=crop" 
                         alt="Featured Movie" />
                  </div>
                  <h3>Moderne Blockbuster</h3>
                  <p>Halte die neuesten Hits und Blockbuster fest</p>
                </div>
                <div className="featured-item">
                  <div className="featured-poster">
                    <img src="https://images.unsplash.com/photo-1489599543865-a25e41e1ff08?w=300&h=450&fit=crop" 
                         alt="Featured Movie" />
                  </div>
                  <h3>Persönliche Favoriten</h3>
                  <p>Sammle alle Filme, die dir am Herzen liegen</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="logo-icon">🎬</span>
              <span>FilmBox - Deine persönliche Filmsammlung</span>
            </div>
            <div className="footer-links">
              <span>Made with ❤️ for movie lovers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
