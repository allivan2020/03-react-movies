import axios, { type AxiosResponse } from 'axios';
import type Movie from '../types/movie';

interface TMDBResponse {
  results: Movie[];
  page: number;
  total_results: number;
  total_pages: number;
}

const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN?.trim()}`,
  },
});

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response: AxiosResponse<TMDBResponse> = await API.get('search/movie', {
    params: {
      query,
      language: 'en-US',
    },
  });
  return response.data.results;
};
