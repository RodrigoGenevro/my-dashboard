import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Menu from './components/Menu.jsx';
import SummaryCard from './components/SummaryCard.jsx';
import Panel from './components/Panel.jsx';
import InfoRow from './components/InfoRow.jsx';

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
            <SummaryCard title="Filmes" value={42} icon="🎥" />
            <SummaryCard title="Horas assistidas" value={318} icon="⏱️" />
            <SummaryCard
              title="Filmes favoritos"
              value={17}
              icon="🏆"
              isHighlighted
            />
            <SummaryCard title="Nota média" value="8,6" icon="⭐" />
          </div>
        </Panel>

        <Panel
          id="highlight"
          title="Filme em destaque"
          className="md:col-span-2"
        >
          <h3 className="font-heading text-xl font-bold">O livro de Eli</h3>
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
        </Panel>

        <Panel id="list" title="Lista" className="xl:min-h-80">
          <p className="text-muted">Em construção.</p>
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
