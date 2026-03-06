import axios from 'axios';
import type { Movie } from 'types/movie';

const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',

  headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
});

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await API.get('search/movie', { params: { query } });

  return response.data.results;
};
