import { combineReducers } from "redux";
import movies, { MovieStore } from "./movies";

export interface RootStore {
    movies: MovieStore
}

export default combineReducers({ movies });
