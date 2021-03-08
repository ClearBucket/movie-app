import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import Movies from './movie/Movies'
import Search from './search/Search';
import { Provider } from 'react-redux'
import store from './redux/store'
import ShowMore from './search/ShowMore';

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={ store }>
        <Container className="pb-4" fluid>
          <Row className="justify-content-center mb-2">
            <h3>Movie Search App</h3>
          </Row>
          <Search />
          <Movies />
          <ShowMore />
        </Container>
      </Provider>
    );
  }

}
