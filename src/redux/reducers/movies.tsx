import Movie from "../../movie/Movie";
import { MovieActionTypes, SET_MOVIES } from "../actionTypes";

export interface MovieStore {
    movies: Movie[],
    page: number,
    totalPages: number,
    searchText: string
}

const initialState: MovieStore = {
  movies: [],
  page: 1,
  totalPages: 0,
  searchText: ""
};

export default function moviesReducer(state = initialState, action: MovieActionTypes) {
  switch (action.type) {
    case SET_MOVIES: {
      return action.payload;
    }
    default:
        return state;
  }
}
