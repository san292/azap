import axios from 'axios';

const api_key='455dc6a8d89a57de7742f24ebbf4b441';

export default axios.create({
    baseURL: `https://api.themoviedb.org/3/search/movie?api_key=${api_key}`,
    timeout: 10000,
  });