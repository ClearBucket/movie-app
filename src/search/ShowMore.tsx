import React from "react";
import { Button, Row } from "react-bootstrap";
import { connect, ConnectedProps, InferableComponentEnhancerWithProps } from "react-redux";
import SearchApi from "../apis/SearchApi";
import Movie from "../movie/Movie";
import { setMovies } from "../redux/actionTypes";
import { RootStore } from "../redux/reducers";
import { MovieStore } from "../redux/reducers/movies";
import { getMoviesState } from "../redux/selectors";

interface State {
    showShowMore: Boolean
}

interface Props {
    movieData: MovieStore;
}

interface Props extends ConnectedProps<InferableComponentEnhancerWithProps<{
    setMovies: typeof setMovies
}, {}>> {
    movieData: MovieStore;
}

class ShowMore extends React.Component<Props, State> {

    state = {
        showShowMore: true
    }

    showMore() {
        const page = this.props.movieData.page + 1;
        const searchText = this.props.movieData.searchText;

        this.setState({
            showShowMore: false
        });

        SearchApi.movies(searchText, page).then((response) => {
            const movies = response.data.results.map(movie => {
                return new Movie(
                    movie.id,
                    movie.title,
                    movie.overview,
                    movie.release_date,
                    movie.vote_average,
                    movie.poster_path,
                    movie.vote_count
                )
            });

            this.props.setMovies({
                movies: [...this.props.movieData.movies, ...movies],
                page: page,
                totalPages: response.data.total_pages,
                searchText: searchText
            });

            this.setState({
                showShowMore: true
            });
        });
    }

    showButton(): JSX.Element | string {
        if (this.props.movieData.page < (this.props.movieData.totalPages - 1) && this.state.showShowMore) {
            return (
                <Row className="justify-content-center">
                    <Button variant="primary" onClick={ this.showMore.bind(this) }>Show More</Button>
                </Row>
            );
        }

        return "";
    }
    
    render() {
        return this.showButton();
    }
}

function mapStateToProps(state: RootStore) {
    const movieData = getMoviesState(state);

   return { movieData };
}

export default connect(
    mapStateToProps,
    { setMovies }
)(ShowMore);