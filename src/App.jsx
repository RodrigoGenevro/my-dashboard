import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { initialMovies } from './data/movies.js';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Menu from './components/Menu.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ListPage from './pages/ListPage.jsx';
import NewItemPage from './pages/NewItemPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  const [movies, setMovies] = useState(initialMovies);

  function addMovie(newMovie) {
    setMovies((currentMovies) => [...currentMovies, newMovie]);
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

        <Routes>
          <Route path="/" element={<DashboardPage movies={movies} />} />
          <Route path="/lista" element={<ListPage movies={movies} />} />
          <Route
            path="/novo"
            element={<NewItemPage onAdd={addMovie} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
