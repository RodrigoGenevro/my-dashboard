import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Menu from './components/Menu.jsx';
import SummaryCard from './components/SummaryCard.jsx';
import Panel from './components/Panel.jsx';
import InfoRow from './components/InfoRow.jsx';
import StatusBadge from './components/StatusBadge.jsx';
import DetailsToggle from './components/DetailsToggle.jsx';
import ListItem from './components/ListItem.jsx';

const summaryCards = [
  { id: 'films', title: 'Filmes', value: 42, icon: '🎥' },
  { id: 'hours', title: 'Horas assistidas', value: 318, icon: '⏱️' },
  {
    id: 'favorites',
    title: 'Filmes favoritos',
    value: 17,
    icon: '🏆',
    isHighlighted: true,
  },
  { id: 'rating', title: 'Nota média', value: '8,6', icon: '⭐' },
];

const movies = [
  {
    id: 'duna-parte-dois',
    title: 'Duna: Parte Dois',
    year: 2024,
    genre: 'Ficção científica',
    isWatched: false,
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    year: 2023,
    genre: 'Drama / História',
    isWatched: false,
  },
  {
    id: 'gladiador-dois',
    title: 'Gladiador II',
    year: 2024,
    genre: 'Ação / Drama',
    isWatched: false,
  },
  {
    id: 'interestelar',
    title: 'Interestelar',
    year: 2014,
    genre: 'Ficção científica / Drama',
    isWatched: true,
  },
  {
    id: 'a-origem',
    title: 'A Origem',
    year: 2010,
    genre: 'Ação / Ficção científica',
    isWatched: true,
  },
  {
    id: 'clube-da-luta',
    title: 'Clube da Luta',
    year: 1999,
    genre: 'Drama / Suspense',
    isWatched: true,
  },
];
function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main
        className="grid flex-1 grid-cols-1 content-start gap-4 p-4
          md:grid-cols-2 md:gap-6 md:p-6
          xl:grid-cols-[15rem_1fr_1fr] xl:p-8"
      >
        <Menu />

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

        <Panel
          id="highlight"
          title="Filme em destaque"
          className="md:col-span-2"
        >
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-xl font-bold"> O Livro de Eli</h3>
            <StatusBadge label="Assistido" isActive />
            <StatusBadge label="Favorito" variant="favorite" />
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
              <p>
                <strong>Idioma original:</strong> Inglês
              </p>
            </p>
            <p>
              <p>
                <strong>Nota no IMDb:</strong> 6,8/10
              </p>
            </p>
          </DetailsToggle>
        </Panel>

        <Panel id="list" title="Minha lista de filmes" className="xl:min-h-80">
          <ul>
            {movies.map((movie) => (
              <ListItem
                key={movie.id}
                title={movie.title}
                year={movie.year}
                genre={movie.genre}
                isWatched={movie.isWatched}
              />
            ))}
          </ul>
        </Panel>

        <Panel id="chart" title="Gráfico" className="xl:min-h-80">
          <p className="text-muted">Em construção.</p>
        </Panel>
      </main>
      <Footer />
    </div>
  );
}

export default App;
