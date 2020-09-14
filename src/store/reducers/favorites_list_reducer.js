import { STORE_FAVORITES } from '../types/types';


export const initialState = {
    favorites: []
};

const favoritesListReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_FAVORITES: {
            return {
                ...state,
                favorites: action.favorites,
            }
        }
        default:
            return state
    }
};

export default favoritesListReducer;
