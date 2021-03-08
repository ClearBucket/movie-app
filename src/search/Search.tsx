import React, { ChangeEvent } from "react";
import { Button, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import Movie from "../movie/Movie";
import SearchApi from "../apis/SearchApi";
import { connect, ConnectedProps, InferableComponentEnhancerWithProps } from "react-redux";
import { setMovies } from "../redux/actionTypes";

interface State {
    searchText: string
}

interface Props extends ConnectedProps<InferableComponentEnhancerWithProps<{
    setMovies: typeof setMovies
}, {}>> {

}

class Search extends React.Component<Props, State>  {

    state = {
        searchText: ""
    };

    constructor(props: Props) {
        super(props);

        this.searchInputChange = this.searchInputChange.bind(this);
        this.performSearch = this.performSearch.bind(this);
    }

    searchInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            searchText: event.currentTarget.value
        });
    }

    performSearch(event: React.FormEvent<HTMLElement>) {
        event.preventDefault();

        SearchApi.movies(this.state.searchText).then((response) => {
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
                movies: movies,
                page: 1,
                totalPages: response.data.total_pages,
                searchText: this.state.searchText
            });
        });
    }
    
    render() {
        return (
            <Row className="justify-content-center">
                <Col>
                    <Form onSubmit={ this.performSearch } className="mb-4">
                        <InputGroup>
                            <FormControl
                                placeholder="Movie Title"
                                aria-label="Input Movie Title"
                                value={ this.state.searchText }
                                onChange={ this.searchInputChange.bind(this) }
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={ this.performSearch } type="submit" >Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        );
    }

}

export default connect(
    null,
    { setMovies }
)(Search);
  