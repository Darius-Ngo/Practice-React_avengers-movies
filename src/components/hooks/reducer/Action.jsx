import { ADD_FAVORITES, REMOVE_FAVORITES, ADD_HISTORY, REMOVE_HISTORY } from './Constant';

export const addMovieFavorites = payload => ({
    type: ADD_FAVORITES,
    category: 'movie',
    payload
})

export const removeMovieFavorites = payload => ({
    type: REMOVE_FAVORITES,
    category: 'movie',
    payload
})

export const addTvFavorites = payload => ({
    type: ADD_FAVORITES,
    category: 'tv',
    payload
})

export const removeTvFavorites = payload => ({
    type: REMOVE_FAVORITES,
    category: 'tv',
    payload
})

export const addMovieHistory = payload => ({
    type: ADD_HISTORY,
    category: 'movie',
    payload
})

export const removeMovieHistory = payload => ({
    type: REMOVE_HISTORY,
    category: 'movie',
    payload
})

export const addTvHistory = payload => ({
    type: ADD_HISTORY,
    category: 'tv',
    payload
})

export const removeTvHistory = payload => ({
    type: REMOVE_HISTORY,
    category: 'tv',
    payload
})