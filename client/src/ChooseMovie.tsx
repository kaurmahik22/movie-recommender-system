import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ChooseMovie.css';
import MovieRecsDisplay from './MovieRecsDisplay';

// component displays options of movies user can choose to personalize movie recomendations
function ChooseMovie() {

  interface Movie {
    title: string;
    poster_path: string;
    overview: string;
  }

  const [movies, setMovies] = useState<Movie[]>([]); // to set random movies for user to select
  const [movie, setMovieRecs] = useState<Movie[]>([]); // to set movie recommendations
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); // assign user's movie preference
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null); // to show movie title and description
  const [showComponent, setShowComponent] = useState(false); // to show MovieRecsDisplay component

  // get random set of movies from API 
  useEffect(() => {
    axios.get('http://localhost:3000/movies') 
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // assign user's selected movie to movie
  function handleMovieSelect(movie: Movie) {
    setSelectedMovie(movie);
  }

  // handles form submission by making call to the API 
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowComponent(!showComponent);
    
    const payload = {"description": selectedMovie?.overview};

    try {
      // API call to get content-based movie recommendations 
      const response = await axios.post('http://localhost:3000/selected-movie', payload);
      setMovieRecs(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting:", error);
    }
  }

  return (
    <div className="container">
      {!showComponent ? (
        <>
          <h2 className="title">🎬 Personalize Your Recommendations!</h2>
          <h3 className="subtitle">Hover over the movies to read the description and select a movie you like.</h3>

          <form method="post" onSubmit={handleSubmit}>
            <div className="movie-grid">
              {movies.map((movie, index) => (
                <div
                  key={index}
                  className={`movie-card ${selectedMovie?.title === movie.title ? 'selected' : ''}`}
                  onClick={() => handleMovieSelect(movie)}
                  onMouseEnter={() => setHoveredMovie(movie)}
                  onMouseLeave={() => setHoveredMovie(null)}
                >
                  <div className="movie-image-container">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                      className="movie-image"
                    />

                    {hoveredMovie?.title === movie.title && (
                      <div className="movie-overlay">
                        <p className="movie-title">{movie.title}</p>
                        <p className="movie-description">{movie.overview}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className={`submit-button ${selectedMovie ? 'enabled' : 'disabled'}`}
              disabled={!selectedMovie}
            >
              Submit
            </button>
          </form>
        </>
      ) : (
        <MovieRecsDisplay movies={movie} />
      )}
    </div>
  );
}

export default ChooseMovie;
