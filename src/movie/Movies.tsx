import React from "react";
import { Col, Media, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { RootStore } from "../redux/reducers";
import { MovieStore } from "../redux/reducers/movies";
import { getMoviesState } from "../redux/selectors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as unfilledStar } from "@fortawesome/free-regular-svg-icons";

interface State {

}

interface Props {
    movieData: MovieStore;
}

class Movies extends React.Component<Props, State> {

    stars(rating: number) {
        const stars: JSX.Element[] = [];

        for (let i = 1; i <= rating; i++) {
            stars.push(<FontAwesomeIcon icon={ filledStar } key={ `filled-${i}` } />);
        }

        if(rating === 5) {
            return stars;
        }

        for (let i = 1; i <= 5 - rating; i++) {
            stars.push(<FontAwesomeIcon icon={ unfilledStar } key={ `unfilled-${i}` } />);
        }

        return stars;
    }

    render() {
        return (
            <Row className="row-cols-1 g-3" sm={2} md={3}>
            { this.props.movieData.movies.map((movie, index) => {
                return <Col className="mt-4 d-flex align-items-stretch" key={ index.toString() }>
                    <Media className="shadow-sm py-2 px-2">
                        <img
                            width={64}
                            className="mr-3"
                            src={ movie.poster }
                            alt={ movie.title }
                        />
                        <Media.Body>
                            <h5>{ movie.title } </h5>
                            <p>
                                <small>{ movie.releaseYear }</small><br />
                                { movie.overview }<br />
                                { this.stars(movie.rating) }
                                &nbsp;
                                { movie.votes }
                            </p>
                        </Media.Body>
                    </Media>
                </Col>
            }) }
            </Row>
        );
    }

}

function mapStateToProps(state: RootStore): Props {
    const movieData = getMoviesState(state);

   return { movieData };
}

export default connect(
    mapStateToProps
)(Movies);
