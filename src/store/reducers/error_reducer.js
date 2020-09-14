import { SONGS_ERROR } from '../types/types.js';


const errorReducer = (state = {}, action) => {
    switch (action.type) {
        case SONGS_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }

        default:
            return state;
    }
};


export default errorReducer;
