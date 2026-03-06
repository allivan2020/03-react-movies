import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
// import './App.css';
import css from './App.module.css';
import type { Movie } from 'types/movie';
import { fetchMovies } from '../movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    setIsError(false);
    setMovies([]);
    setIsLoading(true);
    try {
      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }
      setMovies(data);
    } catch {
      setIsError(true);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  return (
    <div className={css.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
