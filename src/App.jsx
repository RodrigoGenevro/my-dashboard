import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Menu from './components/Menu.jsx';
import SummaryCard from './components/SummaryCard.jsx';
import Panel from './components/Panel.jsx';
import InfoRow from './components/InfoRow.jsx';
import StatusBadge from './components/StatusBadge.jsx';
import DetailsToggle from './components/DetailsToggle.jsx';
import ListItem from './components/ListItem.jsx';
import { useState } from 'react';
import { movies } from './data/movies.js';

const filterOptions = [
  { id: 'all', label: 'Todos' },
  { id: 'unwatched', label: 'Para assistir' },
  { id: 'watched', label: 'Assistidos' },
  { id: 'favorites', label: '⭐ Favoritos' },
];

function App() {
  // Estados
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [activeList, setActiveList] = useState('catalog');

  // Estados da paginação
  const [catalogPage, setCatalogPage] = useState(1);
  const [myListPage, setMyListPage] = useState(1);

  const moviesPerPage = 5;

  // Cálculos do resumo
  const totalMovies = movies.length;

  const watchedCount = movies.filter((movie) => movie.isWatched).length;

  const favoritesCount = movies.filter((movie) => movie.isFavorite).length;

  const unwatchedCount = totalMovies - watchedCount;

  const summaryCards = [
    {
      id: 'films',
      title: 'Filmes',
      value: totalMovies,
      icon: '🎥',
    },
    {
      id: 'watched',
      title: 'Assistidos',
      value: watchedCount,
      icon: '🍿',
    },
    {
      id: 'favorites',
      title: 'Filmes favoritos',
      value: favoritesCount,
      icon: '🏆',
      isHighlighted: true,
    },
    {
      id: 'unwatched',
      title: 'Para assistir',
      value: unwatchedCount,
      icon: '🎬',
    },
  ];

  // Pesquisa
  const searchTerm = search.trim().toLowerCase();

  // Catálogo filtrado
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

  // Minha lista de filmes
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

  // Alterar pesquisa e reiniciar páginas
  function handleSearch(event) {
    setSearch(event.target.value);
    setCatalogPage(1);
    setMyListPage(1);
  }

  // Alterar filtro e reiniciar páginas
  function handleFilter(filter) {
    setStatusFilter(filter);
    setCatalogPage(1);
    setMyListPage(1);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main
        className="grid flex-1 grid-cols-1 content-start gap-4
          p-4 md:grid-cols-2 md:gap-6 md:p-6
          xl:grid-cols-[15rem_1fr_1fr] xl:p-8"
      >
        <Menu />

        {/* RESUMO */}
        <Panel id="summary" title="Resumo" className="md:col-span-2">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {summaryCards.map((card) => (
              <SummaryCard
                key={card.id}
                title={card.title}
                value={card.value}
                icon={card.icon}
                isHighlighted={card.isHighlighted}
              />
            ))}
          </div>
        </Panel>

        {/* FILME EM DESTAQUE */}
        <Panel
          id="highlight"
          title="Filme em destaque"
          className="md:col-span-2"
        >
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-xl font-bold">O Livro de Eli</h3>

            <StatusBadge label="Assistido" isActive />

            <span title="Favorito" aria-label="Favorito">
              ⭐
            </span>
          </div>

          <p className="mt-1 text-muted">
            Em um mundo pós-apocalíptico, devastado por uma guerra, Eli
            atravessa terras desoladas carregando um livro misterioso que
            acredita ser essencial para o futuro da humanidade. Durante sua
            jornada, ele enfrenta perigos e inimigos que querem tomar o livro
            para si, enquanto luta para cumprir sua missão.
          </p>

          <div className="mt-4 grid gap-x-6 md:grid-cols-2">
            <InfoRow label="Ano de lançamento" value="2010" />
            <InfoRow label="Gênero" value="Ação / Ficção científica" />
            <InfoRow label="Duração" value="1h 58min" />
            <InfoRow label="Classificação" value="14 anos" />
          </div>

          <DetailsToggle>
            <p>
              <strong>Diretor:</strong> Albert Hughes e Allen Hughes
            </p>
            <p>
              <strong>Elenco:</strong> Denzel Washington, Gary Oldman e Mila
              Kunis
            </p>
            <p>
              <strong>Idioma original:</strong> Inglês
            </p>
            <p>
              <strong>Nota no IMDb:</strong> 6,8/10
            </p>
          </DetailsToggle>
        </Panel>

        {/* BIBLIOTECA DE FILMES */}
        <Panel id="list" title="Biblioteca de Filmes" className="xl:min-h-80">
          {/* ABAS CLICÁVEIS */}
          <div className="mb-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveList('catalog');
                setCatalogPage(1);
              }}
              aria-pressed={activeList === 'catalog'}
              className={
                activeList === 'catalog'
                  ? 'rounded-lg bg-primary px-4 py-2 text-sm font-medium text-background'
                  : 'rounded-lg border border-border px-4 py-2 text-sm text-muted hover:border-primary'
              }
            >
              🎬 Catálogo de filmes
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveList('myList');
                setMyListPage(1);
              }}
              aria-pressed={activeList === 'myList'}
              className={
                activeList === 'myList'
                  ? 'rounded-lg bg-primary px-4 py-2 text-sm font-medium text-background'
                  : 'rounded-lg border border-border px-4 py-2 text-sm text-muted hover:border-primary'
              }
            >
              🍿 Minha lista
            </button>
          </div>

          {/* PESQUISA */}
          <label htmlFor="movie-search" className="text-sm text-muted">
            Buscar pelo nome ou gênero
          </label>

          <input
            id="movie-search"
            type="search"
            value={search}
            onChange={handleSearch}
            placeholder="Ex.: Interestelar ou Ação"
            className="mt-1 mb-3 w-full rounded-lg border border-border
              bg-background px-3 py-2 focus:border-primary focus:outline-none"
          />

          {/* FILTROS */}
          <div className="mb-4 flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleFilter(option.id)}
                aria-pressed={statusFilter === option.id}
                className={
                  statusFilter === option.id
                    ? 'rounded-full border border-primary bg-primary px-4 py-2 text-sm font-medium text-background'
                    : 'rounded-full border border-border px-4 py-2 text-sm font-medium text-muted hover:border-primary'
                }
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* CATÁLOGO */}
          {activeList === 'catalog' && (
            <section>
              <h3 className="mb-2 font-heading text-lg font-bold">
                Catálogo de filmes
              </h3>

              <p className="mb-2 text-sm text-muted">
                {catalogMovies.length} filmes encontrados
              </p>

              {visibleCatalogMovies.length === 0 ? (
                <p className="text-muted">Nenhum filme encontrado.</p>
              ) : (
                <ul>
                  {visibleCatalogMovies.map((movie) => (
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
              )}

              {/* PAGINAÇÃO DO CATÁLOGO */}
              {catalogTotalPages > 1 && (
                <div className="mt-4 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setCatalogPage((page) => page - 1)}
                    disabled={catalogPage === 1}
                    className="rounded-lg border border-border px-3 py-2 text-sm
                      disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Anterior
                  </button>

                  <span className="text-sm text-muted">
                    Página {catalogPage} de {catalogTotalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => setCatalogPage((page) => page + 1)}
                    disabled={catalogPage === catalogTotalPages}
                    className="rounded-lg border border-border px-3 py-2 text-sm
                      disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Próxima
                  </button>
                </div>
              )}
            </section>
          )}

          {/* MINHA LISTA */}
          {activeList === 'myList' && (
            <section>
              <h3 className="mb-2 font-heading text-lg font-bold">
                Minha lista de filmes
              </h3>

              <p className="mb-2 text-sm text-muted">
                {myMovies.length} filmes na minha lista
              </p>

              {visibleMyMovies.length === 0 ? (
                <p className="text-muted">
                  Nenhum filme adicionado à sua lista.
                </p>
              ) : (
                <ul>
                  {visibleMyMovies.map((movie) => (
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
              )}

              {/* PAGINAÇÃO DA MINHA LISTA */}
              {myListTotalPages > 1 && (
                <div className="mt-4 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setMyListPage((page) => page - 1)}
                    disabled={myListPage === 1}
                    className="rounded-lg border border-border px-3 py-2 text-sm
                      disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Anterior
                  </button>

                  <span className="text-sm text-muted">
                    Página {myListPage} de {myListTotalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => setMyListPage((page) => page + 1)}
                    disabled={myListPage === myListTotalPages}
                    className="rounded-lg border border-border px-3 py-2 text-sm
                      disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Próxima
                  </button>
                </div>
              )}
            </section>
          )}
        </Panel>

        {/* GRÁFICO */}
        <Panel id="chart" title="Gráfico" className="xl:min-h-80">
          <p className="text-muted">Em construção.</p>
        </Panel>
      </main>

      <Footer />
    </div>
  );
}

export default App;
