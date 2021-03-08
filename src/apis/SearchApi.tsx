import axios from "axios";

interface SearchResults {
    results: {
        id: number,
        poster_path: string | null,
        release_date: string,
        title: string,
        vote_average: number,
        overview: string,
        vote_count: number
    }[],
    total_pages: number
}

export default class SearchApi {

    static movies(query: string, page: number = 1) {
        return axios.get<SearchResults>("https://api.themoviedb.org/3/search/movie", {
            params: {
                api_key: "d7a3a18bf1f75a32e20a4c21012ba47b",
                query: query,
                page: page
            }
        });
    }

}