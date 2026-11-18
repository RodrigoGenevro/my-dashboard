import { useState } from 'react';

import Panel from '../components/Panel.jsx';
import ListItem from '../components/ListItem.jsx';

import { movies } from '../data/movies.js';

function LibraryPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [activeList, setActiveList] = useState('catalog');

  const [catalogPage, setCatalogPage] = useState(1);
  const [myListPage, setMyListPage] = useState(1);

  const moviesPerPage = 5;

  const filterOptions = [
    { id: 'all', label: 'Todos' },
    { id: 'unwatched', label: 'Para assistir' },
    { id: 'watched', label: 'Assistidos' },
    { id: 'favorites', label: '⭐ Favoritos' },
  ];

  // Pesquisa e filtros
  const searchTerm = search.trim().toLowerCase();

  const catalogMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.genre.toLowerCase().includes(searchTerm);

    if (statusFilter === 'watched') {
      return movie.isWatched && matchesSearch;
    }

    if (statusFilter === 'unwatched') {
      return !movie.isWatched && matchesSearch;
    }

    if (statusFilter === 'favorites') {
      return movie.isFavorite && matchesSearch;
    }

    return matchesSearch;
  });

  // Minha lista
  const myMovies = catalogMovies.filter((movie) => movie.inMyList);

  // Paginação do catálogo
  const catalogTotalPages = Math.ceil(catalogMovies.length / moviesPerPage);

  const catalogStart = (catalogPage - 1) * moviesPerPage;

  const visibleCatalogMovies = catalogMovies.slice(
    catalogStart,
    catalogStart + moviesPerPage,
  );

  // Paginação da minha lista
  const myListTotalPages = Math.ceil(myMovies.length / moviesPerPage);

  const myListStart = (myListPage - 1) * moviesPerPage;

  const visibleMyMovies = myMovies.slice(
    myListStart,
    myListStart + moviesPerPage,
  );

  function handleSearch(event) {
    setSearch(event.target.value);
    setCatalogPage(1);
    setMyListPage(1);
  }

  function handleFilter(filter) {
    setStatusFilter(filter);
    setCatalogPage(1);
    setMyListPage(1);
  }

  function handleActiveList(list) {
    setActiveList(list);

    if (list === 'catalog') {
      setCatalogPage(1);
    } else {
      setMyListPage(1);
    }
  }

  const currentMovies =
    activeList === 'catalog' ? visibleCatalogMovies : visibleMyMovies;

  const currentPage = activeList === 'catalog' ? catalogPage : myListPage;

  const totalPages =
    activeList === 'catalog' ? catalogTotalPages : myListTotalPages;

  const totalResults =
    activeList === 'catalog' ? catalogMovies.length : myMovies.length;

  function changePage(page) {
    if (activeList === 'catalog') {
      setCatalogPage(page);
    } else {
      setMyListPage(page);
    }
  }

  return (
    <Panel
      id="library"
      title="Biblioteca de filmes"
      className="md:col-span-2 xl:row-span-3"
    >
        {/* Navegação entre catálogo e minha lista */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-4">
          <button
            onClick={() => handleActiveList('catalog')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeList === 'catalog'
                ? 'bg-primary text-background'
                : 'border border-border text-muted hover:text-foreground'
            }`}
          >
            🎬 Catálogo de filmes
          </button>

          <button
            onClick={() => handleActiveList('myList')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeList === 'myList'
                ? 'bg-primary text-background'
                : 'border border-border text-muted hover:text-foreground'
            }`}
          >
            🍿 Minha lista
          </button>
        </div>

        {/* Campo de pesquisa */}
        <div className="py-4">
          <label htmlFor="movie-search" className="sr-only">
            Buscar filmes por nome ou gênero
          </label>
          <input
            id="movie-search"
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Pesquisar por filme ou gênero..."
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => handleFilter(filter.id)}
              aria-pressed={statusFilter === filter.id}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                statusFilter === filter.id
                  ? 'bg-primary text-background'
                  : 'border border-border text-muted hover:text-foreground'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <p className="mt-3 text-sm text-muted" aria-live="polite">
          {totalResults} de {movies.length} filmes
        </p>

        {/* Lista de filmes */}
        <div className="mt-4">
          {currentMovies.length > 0 ? (
            <ul>
              {currentMovies.map((movie) => (
                <ListItem
                  key={movie.id}
                  title={movie.title}
                  year={movie.year}
                  genre={movie.genre}
                  isWatched={movie.isWatched}
                  isFavorite={movie.isFavorite}
                />
              ))}
            </ul>
          ) : (
            <p className="py-8 text-center text-sm text-muted">
              Nenhum filme encontrado.
            </p>
          )}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <p className="text-sm text-muted">
              Página {currentPage} de {totalPages}
              {' · '}
              {totalResults} filmes
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border border-border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                Anterior
              </button>

              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </Panel>
  );
}

export default LibraryPage;
