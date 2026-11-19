import { useNavigate } from 'react-router-dom';
import { useMovies } from '../context/MoviesContext.js';

import Panel from '../components/Panel.jsx';
import ItemForm from '../components/ItemForm.jsx';

function NewItemPage() {
  const navigate = useNavigate();

  const { addMovie } = useMovies();

  function handleSave(values) {
    const newMovie = {
      id: String(Date.now()),
      ...values,
    };

    addMovie(newMovie);

    navigate('/lista');
  }

  return (
    <Panel
      id="new-item"
      title="Novo filme"
      className="md:col-span-2 xl:row-span-3"
    >
      <ItemForm onSave={handleSave} />
    </Panel>
  );
}

export default NewItemPage;
