import { useEffect, useState } from 'react';

import { MoviesContext } from './MoviesContext.js';
import { initialMovies } from '../data/movies.js';

// Identificador usado para armazenar os filmes no navegador
const STORAGE_KEY = 'my-dashboard:movies';

// Recupera os filmes salvos no navegador
function getInitialMovies() {
  try {
    const savedMovies = localStorage.getItem(STORAGE_KEY);

    if (savedMovies) {
      const parsedMovies = JSON.parse(savedMovies);

      if (Array.isArray(parsedMovies)) {
        return parsedMovies;
      }
    }
  } catch (error) {
    console.error('Erro ao recuperar os filmes:', error);
  }

  return initialMovies;
}

function MoviesProvider({ children }) {
  const [movies, setMovies] = useState(getInitialMovies);

  // Salva os filmes sempre que a lista for alterada
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  }, [movies]);

  // Adiciona um novo filme
  function addMovie(newMovie) {
    setMovies((currentMovies) => [...currentMovies, newMovie]);
  }

  // Restaura a lista original de filmes
  function resetMovies() {
    setMovies([...initialMovies]);
  }

  return (
    <MoviesContext.Provider
      value={{
        movies,
        addMovie,
        resetMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export default MoviesProvider;
