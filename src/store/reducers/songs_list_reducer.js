import { STORE_SONGS } from '../types/types';

export const initialState = {
    songs:[]
};

const songsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_SONGS: {
            return {
                ...state,
                songs: action.songs,
            }
        }
        default:
            return state;
    }
};

export default songsListReducer;

