import { Link } from 'react-router-dom';

import SummaryCard from '../components/SummaryCard.jsx';
import Panel from '../components/Panel.jsx';
import InfoRow from '../components/InfoRow.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import DetailsToggle from '../components/DetailsToggle.jsx';
import ListItem from '../components/ListItem.jsx';

function DashboardPage({ movies }) {
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

  const featuredMovie = movies.find((movie) => movie.id === 'o-livro-de-eli');
  const firstMovies = movies.slice(0, 3);

  return (
    <>
      {/* Resumo */}
      <Panel
        id="summary"
        title="Resumo da biblioteca"
        className="md:col-span-2"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      {/* Filme em destaque */}
      <Panel
        id="highlight"
        title="Filme em destaque"
        className="md:col-span-2"
      >
        {featuredMovie && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-heading text-xl font-bold">
                {featuredMovie.title}
              </h3>

              {featuredMovie.isWatched && (
                <StatusBadge label="Assistido" isActive />
              )}

              {featuredMovie.isFavorite && (
                <span title="Favorito" aria-label="Favorito">
                  ⭐
                </span>
              )}
            </div>

            <p className="text-sm text-muted">
              {featuredMovie.year} · {featuredMovie.genre}
            </p>

            <p className="text-sm leading-relaxed text-muted">
              Um viajante atravessa um mundo devastado, protegendo um livro que
              pode guardar a chave para o futuro da humanidade.
            </p>

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
          </div>
        )}
      </Panel>

      {/* Prévia da biblioteca */}
      <Panel id="list" title="Biblioteca de filmes" className="xl:min-h-80">
        {firstMovies.length === 0 ? (
          <p className="text-muted">Nenhum filme cadastrado.</p>
        ) : (
          <ul>
            {firstMovies.map((movie) => (
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

        <Link
          to="/lista"
          className="mt-4 inline-block font-bold text-primary hover:underline"
        >
          Ver todos os {movies.length} filmes →
        </Link>
      </Panel>

      {/* Estatísticas */}
      <Panel id="chart" title="Estatísticas" className="xl:min-h-80">
        <div className="flex flex-col gap-3">
          <InfoRow label="Total de filmes" value={totalMovies} />
          <InfoRow label="Filmes assistidos" value={watchedCount} />
          <InfoRow label="Filmes para assistir" value={unwatchedCount} />
          <InfoRow label="Filmes favoritos" value={favoritesCount} />
        </div>
      </Panel>
    </>
  );
}

export default DashboardPage;
