import { RootStore } from "./reducers";

export const getMoviesState = (store: RootStore) => {
    return store.movies;
};
