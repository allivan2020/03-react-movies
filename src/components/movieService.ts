import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

API.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token.trim()}`;
  }
  config.headers.Accept = 'application/json';
  return config;
});

export const fetchMovies = async (query: string) => {
  const response = await API.get('search/movie', { params: { query } });
  return response.data.results;
};
