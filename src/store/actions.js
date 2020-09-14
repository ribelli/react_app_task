import {
    STORE_SONGS,
    SONGS_ERROR,
    STORE_FAVORITES} from './types/types.js';
import axios from '../axios';


const API_URL = 'http://localhost:3004';

const storeSongsAction = songs => ({
    type: STORE_SONGS,
    songs
});

const storeFavoritesAction = favorites => ({
    type: STORE_FAVORITES,
    favorites
});

const fetchSongsErrorAction = error => ({
    type: SONGS_ERROR,
    error
});

const fetchFavoritesErrorAction = error => ({
    type: SONGS_ERROR,
    error
});


export const getSearchResultsAction = (query) => (dispatch) => {
    let url = `${API_URL}/songs?search_like=${encodeURI(query)}`;
    return axios.get(url)
        .then(response => {
            dispatch(storeSongsAction(response.data));
            return response.data;
        })
        .catch(error => console.log(error));
};

export const fetchSongsAction = (start, limit, searchParam, filter) => (dispatch) => {
    let requestParams = {
        '_start': start,
        '_limit': limit,
        'search_like': searchParam,
        'level': filter
    };
    let requestUrl = "/songs?";
    Object.entries(requestParams).forEach( param => {
       const [key, value] = param;
       if (value || value === 0) {
           requestUrl = `${requestUrl}&${key}=${value}`;
       }
    });
    return axios.get(`${API_URL}${requestUrl}`)
    .then(response => {
        dispatch(storeSongsAction(response.data));
        return response.data;
    })
    .catch(error => dispatch(fetchSongsErrorAction(error)));
};

export const fetchFavoritesAction = () => (dispatch) => {
    return axios.get(`${API_URL}/favorites`)
    .then(response => {
        dispatch(storeFavoritesAction(response.data));
        return response.data;
    })
    .catch(error => dispatch(fetchFavoritesErrorAction(error)));
};

export const addToFavoritesAction = (newFavorite) => (dispatch) => {
    return axios.post(`${API_URL}/favorites`, newFavorite)
    .then(response => {
        dispatch(storeFavoritesAction(response.data));
        return response.data;
    })
    .catch(error => dispatch(fetchSongsErrorAction(error)));
};

export const deleteFavoriteAction = (favoriteId) => (dispatch, getState) => {
    return axios.delete(`${API_URL}/favorites/${favoriteId}`)
    .then(() => {
        dispatch(fetchFavoritesAction(1));
    })
    .catch(error => dispatch(fetchSongsErrorAction(error)));
};
