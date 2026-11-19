import { useState } from 'react';
import { Link } from 'react-router-dom';

import Panel from '../components/Panel.jsx';

const inputClass =
  'mt-1 w-full rounded-lg border bg-background px-3 py-2 focus:border-primary focus:outline-none';

function NewItemPage() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [isWatched, setIsWatched] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (title.trim() === '') {
      newErrors.title = 'Informe o título do filme.';
    } else if (title.trim().length < 2) {
      newErrors.title = 'O título precisa ter pelo menos 2 caracteres.';
    }

    if (genre.trim() === '') {
      newErrors.genre = 'Informe o gênero do filme.';
    } else if (genre.trim().length < 2) {
      newErrors.genre = 'O gênero precisa ter pelo menos 2 caracteres.';
    }

    if (year === '') {
      newErrors.year = 'Informe o ano de lançamento.';
    } else if (Number(year) < 0) {
      newErrors.year = 'O ano não pode ser negativo.';
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (newErrors.title || newErrors.genre || newErrors.year) return;
  }

  return (
    <Panel
      id="new-item"
      title="Novo filme"
      className="md:col-span-2 xl:row-span-3"
    >
      <form onSubmit={handleSubmit} className="grid gap-4 md:max-w-xl">
        <div>
          <label htmlFor="movie-title" className="font-bold">
            Título do filme
          </label>
          <input
            id="movie-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'movie-title-error' : undefined}
            className={`${inputClass} ${errors.title ? 'border-danger' : 'border-border'}`}
          />
          {errors.title && (
            <p id="movie-title-error" className="mt-1 text-sm text-danger">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="movie-genre" className="font-bold">
            Gênero
          </label>
          <input
            id="movie-genre"
            type="text"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            placeholder="Ex.: Drama / Suspense"
            aria-invalid={Boolean(errors.genre)}
            aria-describedby={errors.genre ? 'movie-genre-error' : undefined}
            className={`${inputClass} ${errors.genre ? 'border-danger' : 'border-border'}`}
          />
          {errors.genre && (
            <p id="movie-genre-error" className="mt-1 text-sm text-danger">
              {errors.genre}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="movie-year" className="font-bold">
            Ano de lançamento
          </label>
          <input
            id="movie-year"
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            aria-invalid={Boolean(errors.year)}
            aria-describedby={errors.year ? 'movie-year-error' : undefined}
            className={`${inputClass} ${errors.year ? 'border-danger' : 'border-border'}`}
          />
          {errors.year && (
            <p id="movie-year-error" className="mt-1 text-sm text-danger">
              {errors.year}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="movie-watched"
            type="checkbox"
            checked={isWatched}
            onChange={(event) => setIsWatched(event.target.checked)}
            className="size-5 accent-primary"
          />
          <label htmlFor="movie-watched">Já assisti a este filme</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="movie-favorite"
            type="checkbox"
            checked={isFavorite}
            onChange={(event) => setIsFavorite(event.target.checked)}
            className="size-5 accent-primary"
          />
          <label htmlFor="movie-favorite">Marcar como favorito</label>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 font-bold text-background hover:opacity-90"
          >
            Salvar
          </button>
          <Link to="/lista" className="text-muted hover:text-primary">
            Cancelar
          </Link>
        </div>
      </form>
    </Panel>
  );
}

export default NewItemPage;