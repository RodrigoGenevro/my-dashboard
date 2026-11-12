import StatusBadge from './StatusBadge';

function ListItem({ title, year, genre, isWatched }) {
  return (
    <li
      className="flex flex-wrap items-center justify-between gap-2
        border-b border-border py-3"
    >
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-sm text-muted">
          {year} · {genre}
        </p>
      </div>

      <StatusBadge
        label={isWatched ? 'Assistido' : 'Quero assistir'}
        isActive={isWatched}
      />
    </li>
  );
}

export default ListItem;
