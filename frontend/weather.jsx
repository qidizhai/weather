import React from 'react';

class Weather extends React.Component {
  constructor(props){
    super(props);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.state = {
      weather: null
    };
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(this.fetchWeather);
  }

  fetchWeather(pos) {
    let url = 'https://api.openweathermap.org/data/2.5/weather?';
    const params = {
      lat: pos.coords.latitude,
      long: pos.coords.longitude
    };
    url += `lat=${params.lat.toString()}&lon=${params.long.toString()}`;
    const apiKey = 'f816d7f39052e3a98b21952097a43076';
    url += `&APPID=${apiKey}`;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.status === 200 && xmlhttp.readyState === XMLHttpRequest.DONE) {
        const data = JSON.parse(xmlhttp.responseText);
        this.setState({weather: data});
      }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  }

  render(){
    let content= <div></div>;
    if (this.state.weather) {
      let weather = this.state.weather;
      let icon = weather.weather[0].icon;
      let iconSrc = "https://openweathermap.org/img/w/" + icon + ".png";
      let description = weather.weather[0].description;
      let temp = (weather.main.temp - 273.15) * 1.8 + 32;
      let humidity = weather.main.humidity;
      let wind = weather.wind.speed;
      content =<div>
                <h1>{weather.name}</h1>
                <span className="description">{description}</span>
                <div className="info-holder">
                  <img className="icon" src= {iconSrc} />
                  <div className="temp-info">
                    <p className="temp">{temp.toFixed(1)}°</p>
                    <div>
                      <p>Humidity: {humidity}%</p>
                      <p>Wind: {wind} mph</p>
                    </div>
                  </div>
                </div>
              </div>

    } else {
      content = <div className="loading">loading weather...</div>;
    }
    return (
      <div className="weather-layout">
        <div>{content}</div>
      </div>

    );
  }
}

export default Weather;
