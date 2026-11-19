import { createContext, useContext } from 'react';

export const MoviesContext = createContext(null);

export function useMovies() {
  const context = useContext(MoviesContext);

  if (!context) {
    throw new Error('useMovies deve ser usado dentro de MoviesProvider');
  }

  return context;
}
