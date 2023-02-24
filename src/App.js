
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


const ACCESS_TOKEN = process.env.REACT_APP_LOCATION_ACCESS_TOKEN;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      results: [],
      weatherData: [],
      error: null
      
    }
  }
  handleSearch = async (e) => {
    try {
      // let request = {
      let url = `https://us1.locationiq.com/v1/search?key=${ACCESS_TOKEN}&q=${this.state.searchInput}&format=json`
        // method: 'Get'
        // }
        console.log(url);
      let response = await axios.get(url);
      this.setState({ results: response.data});
      this.getWeather();
    } catch (e) {
      console.log(e);
      this.setState({ error: e });
    }
  }
  
  
  //    () =>
  // this.getWeather(this.state.handleData.display_name));
getWeather = async () => {
  
  let request = {
    url: `http://localhost:3001/weather?city_name=${this.state.searchInput}`,
    method: 'GET'
  } 
  axios(request)
      .then(response => {
        this.setState({weatherData: response.data})
        console.log(response.data);
      });
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
              </ul>
            </nav>
            <Routes>
              <Route path='/maps' element={
                <Row>
                  {this.state.results.map(city => (
                    <Col>
                      <h2>{city.display_name}</h2>
                      <img src= {`https://maps.locationiq.com/v3/staticmap?key=${ACCESS_TOKEN}&center=${city.lat},${city.lon}&zoom=11&size=400x600`} alt={city.display_name} />
                      
                    </Col>
                  ))}
                </Row>
              } />
              <Route path='/weather' element={
              <Weather weather={this.state.weatherData}/>
              } />
            </Routes>
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
