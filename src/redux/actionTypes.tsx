import { MovieStore } from "./reducers/movies";

export const SET_MOVIES = "SET_MOVIES";

export interface SetMoviesAction {
    type: typeof SET_MOVIES,
    payload: MovieStore
}

export const setMovies = (movieData: MovieStore) => ({
    type: SET_MOVIES,
    payload: movieData
});

export type MovieActionTypes = SetMoviesAction;
