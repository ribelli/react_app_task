import { combineReducers } from 'redux';
import errorReducer from './error_reducer.js';
import songsListReducer from './songs_list_reducer.js';
import favoritesListReducer from './favorites_list_reducer';


const masterReducer = combineReducers( {
    songsListReducer,
    favoritesListReducer,
    errorReducer,
});

export default masterReducer;



