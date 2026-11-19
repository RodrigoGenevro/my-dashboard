import { Link } from 'react-router-dom';

import Panel from '../components/Panel.jsx';

function NotFoundPage() {
  return (
    <Panel
      id="not-found"
      title="Página não encontrada"
      className="md:col-span-2 xl:row-span-3"
    >
      <p className="text-muted">
        Não encontramos essa página. Confira o endereço ou volte ao painel.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block font-bold text-primary hover:underline"
      >
        Voltar ao painel
      </Link>
    </Panel>
  );
}

export default NotFoundPage;