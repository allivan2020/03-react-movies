import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN?.trim()}`,
  },
});

export const fetchMovies = async (query: string) => {
  const response = await API.get('search/movie', {
    params: {
      query,
      language: 'en-US',
    },
  });
  return response.data.results;
};
