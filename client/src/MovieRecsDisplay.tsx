import React, { useState } from 'react';
import './ChooseMovie.css';

interface Movie {
    title: string;
    poster_path: string;
    overview: string;
}
  
interface MovieRecsDisplayProps {
    movies: Movie[];
}

// displays content-based movie recommendations to user 
function MovieRecsDisplay({ movies }: MovieRecsDisplayProps) {
    const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null); // to show movie title and description
    
    return (
        <div className="container">
            <h2 className="title">🎬 Your Recommendations!</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', justifyContent:'center'}}>
                {movies.map((movie, index) => (
                    <div 
                        key={index} 
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
        </div>
    );
}

export default MovieRecsDisplay;