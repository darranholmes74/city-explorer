
import './App.css';
import axios from 'axios';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from "./Weather"
import Movie from "./Movie"


const ACCESS_TOKEN = process.env.REACT_APP_LOCATION_ACCESS_TOKEN;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      results: [],
      weatherData: [],
      movieData: [],
      error: null

    }
  }

  handleSearch = async (e) => {
    e.preventDefault();
    this.setState({ error: null });
    try {
      let request = {
        url: `https://us1.locationiq.com/v1/search?key=${ACCESS_TOKEN}&q=${this.state.searchInput}&format=json`,
        method: 'Get'
      }
      let response = await axios(request);
      this.setState({ results: response.data });
      this.getWeather();
      this.getMovies();
    } catch (e) {
      console.log(e);
      this.setState({ error: e });
    }
  }



  getMovies = async () => {
    try {
    let request ={
      url: `http://localhost:3001/movie?cityName=${this.state.searchInput}`,
      method: 'GET'
    }
    let response = await axios(request)
        this.setState({movieData: response.data})
        console.log(response.data);
      }catch (e){
        this.setState({error: e})
      }
  }


  getWeather = async () => {
    try {
      let request = `http://localhost:3001/weather?city_name=${this.state.searchInput}`
      console.log(request, "***")
      let response = await axios.get(request)
      this.setState({ weatherData: response.data })
      console.log(response.data);
    } catch (e){
      this.setState({ error: e })
    };
  }
    // async is just syntactic sugar, it just delays code like a callback
    handleInput = async (e) => {
      let value = e.target.value;

      // this changes the state object.
      this.setState({
        searchInput: value,
      });

    }

    render() {
      let condition = this.state.searchInput && this.state.results.length;
      console.log(this.state);
      return (

        <div className="App">
          <header className="App-header">
            <input type="text" onChange={this.handleInput} placeholder="Seattle" />
            <button onClick={this.handleSearch}>Explore!</button>
          </header>
          {condition

            ?
            <BrowserRouter>
              <Container>
                <nav>
                  <h2>Navigate to a feature listed below</h2>
                  <ul>
                    <li>
                      <Link to={`/maps`}>Maps</Link>
                    </li>
                    <li>
                      <Link to={`/weather`}>Weather</Link>
                    </li>
                    <li>
                      <Link to={`/movie`}>Movies</Link>
                    </li>
                  </ul>
                </nav>
                <Routes>
                  <Route path='/maps' element={
                    <Row>
                      {this.state.results.map((city, idx) => (
                        <Col key={idx}>
                          <h2>{city.display_name}</h2>
                          <img src={`https://maps.locationiq.com/v3/staticmap?key=${ACCESS_TOKEN}&center=${city.lat},${city.lon}&zoom=11&size=400x600`} alt={city.display_name} />

                        </Col>
                      ))}
                    </Row>
                  } />
                  <Route path='/weather' element={
                    <Weather weather={this.state.weatherData} />   
              }/>
                </Routes>
                <Movie movies={this.state.movieData}/>
              </Container>
            </BrowserRouter>

            : <h2>Please Search for a city</h2>
          }
          {this.state.error
            ? <p>
              Something went wrong: {this.state.error.message}
              <button onClick={() => this.setState({ error: null })}>Dismiss</button>
            </p>
            : null}
        </div>
      );
    }
  }

export default App;
