import StatusBadge from './StatusBadge.jsx';

function ListItem({ title, year, genre, isWatched, isFavorite }) {
  return (
    <li className="flex items-center justify-between gap-3 border-b border-border py-3">
      <div className="min-w-0">
        <p className="font-bold">{title}</p>
        <p className="text-sm text-muted">
          {year} · {genre}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className="flex w-28 justify-center">
          <StatusBadge
            label={isWatched ? 'Assistido' : 'Para assistir'}
            isActive={isWatched}
          />
        </div>

        <div className="flex w-5 justify-center">
          {isFavorite && (
            <span title="Favorito" aria-label="Favorito">
              ⭐
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

export default ListItem;
