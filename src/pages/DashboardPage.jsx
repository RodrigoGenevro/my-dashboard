import { useState } from 'react';

import SummaryCard from '../components/SummaryCard.jsx';
import Panel from '../components/Panel.jsx';
import InfoRow from '../components/InfoRow.jsx';
import StatusBadge from '../components/StatusBadge.jsx';

import { movies } from '../data/movies.js';

function DashboardPage() {
  const [showDetails, setShowDetails] = useState(false);

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

  return (
    <div className="flex flex-col gap-6">
      {/* Resumo */}
      <Panel id="summary" title="Resumo da biblioteca">
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
      <Panel id="featured-movie" title="Filme em destaque">
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

            {/* Botão de detalhes */}
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="w-fit text-sm font-semibold text-primary hover:underline"
            >
              {showDetails ? 'Ocultar detalhes' : 'Ver detalhes'}
            </button>

            {showDetails && (
              <div className="flex flex-col gap-2 border-t border-border pt-4">
                <InfoRow label="Título" value={featuredMovie.title} />
                <InfoRow label="Ano" value={featuredMovie.year} />
                <InfoRow label="Gênero" value={featuredMovie.genre} />

                <InfoRow
                  label="Status"
                  value={
                    featuredMovie.isWatched ? 'Assistido' : 'Para assistir'
                  }
                />

                <InfoRow
                  label="Favorito"
                  value={featuredMovie.isFavorite ? 'Sim' : 'Não'}
                />
              </div>
            )}
          </div>
        )}
      </Panel>

      {/* Estatísticas */}
      <Panel id="statistics" title="Estatísticas">
        <div className="flex flex-col gap-3">
          <InfoRow label="Total de filmes" value={totalMovies} />
          <InfoRow label="Filmes assistidos" value={watchedCount} />
          <InfoRow label="Filmes para assistir" value={unwatchedCount} />
          <InfoRow label="Filmes favoritos" value={favoritesCount} />
        </div>
      </Panel>
    </div>
  );
}

export default DashboardPage;
