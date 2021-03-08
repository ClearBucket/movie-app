export default class Movie {
    id: number;
    title: string;
    overview: string;
    releaseYear: string;
    rating: number;
    poster: string;
    votes: number;

    constructor(
        id: number,
        title: string,
        overview: string,
        releaseDate: string | undefined,
        rating: number,
        poster: string | null,
        votes: number
    ) {
        const releaseYear = (releaseDate || "").match(/[0-9]{4}/) || ["No Release Date Available"];

        this.id = id;
        this.title = title;
        this.overview = overview;
        this.releaseYear = releaseYear[0];
        this.rating = Math.floor(rating / 2);
        this.poster = poster ? `https://image.tmdb.org/t/p/original${poster}` : "https://via.placeholder.com/64";
        this.votes = votes;
    }
}
