import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: `Bearer ${TMDB_TOKEN}`,
};

export const get = async (url, params = {}) => {
    try {
        const {data} = await axios.get(`${BASE_URL}${url}`, {
            params,
            headers,
        });
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}