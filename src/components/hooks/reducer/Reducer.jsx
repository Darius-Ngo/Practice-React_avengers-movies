import { ADD_FAVORITES, REMOVE_FAVORITES, ADD_HISTORY, REMOVE_HISTORY } from './Constant';

export const InitState = {
    moviesFavories: [],
    moviesHistory: [],
    tvFavories: [],
    tvHistory: []
}

const Reducer = (state, action) => {
    switch (action.type) {
        case ADD_FAVORITES:
            if (action.category === 'movie') {
                return {
                    ...state,
                    moviesFavories: [...state.moviesFavories, action.payload]
                }
            } else {
                return {
                    ...state,
                    tvFavories: [...state.tvFavories, action.payload]
                }
            }
        case ADD_HISTORY:
            if (action.category === 'movie') {
                return {
                    ...state,
                    moviesHistory: [...state.moviesHistory, action.payload]
                }
            } else {
                return {
                    ...state,
                    tvHistory: [...state.tvHistory, action.payload]
                }
            }
        case REMOVE_FAVORITES:
            if (action.category === 'movie') {
                let newState = [...state.moviesFavories];
                newState.splice(action.payload, 1)
                return {
                    ...state,
                    moviesFavories: [...newState]
                }
            } else {
                let newState = [...state.tvFavories];
                newState.splice(action.payload, 1)
                return {
                    ...state,
                    tvFavories: [...newState]
                }
            }
        case REMOVE_HISTORY:
            if (action.category === 'movie') {
                let newState = [...state.moviesHistory];
                newState.splice(action.payload, 1)
                return {
                    ...state,
                    moviesHistory: [...newState]
                }
            } else {
                let newState = [...state.tvHistory];
                newState.splice(action.payload, 1)
                return {
                    ...state,
                    tvHistory: [...newState]
                }
            }
    }
}

export default Reducer;