# Weather App
[Live](https://qidizhai.github.io/weather)

##Instructions of running the code
1. open the terminal and navigate into `weather` directory
2. run `npm install`
3. run `npm run webpack`
4. right click `index.html` file and select `copy full path`
5. open path in browser or use [Live](https://qidizhai.github.io/weather) link

##Background
![alt text](https://github.com/qidizhai/flappy-monkey/blob/master/background.png "Logo Title Text 1")
This weather application is implemented by React.js, which can detect user's current
location, and display the local weather information.

##Features
###OpenWeatherMapAPI
```js
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
```
OpenWeatherMapAPI is used for rendering the current weather information. The `url` is based on
user's current location and the special api key which is registered by user. XMLHttpRequest object
is used to interact with servers, which allows to retrieve data from a URL without having to do
a full page refresh.

###Geolocation
```js
componentDidMount(){
  navigator.geolocation.getCurrentPosition(this.fetchWeather);
}
```
`Geolocation.getCurrentPosition` is used to get the current position of a user in terms of
coordinates, which takes a callback `fetchWeather` and passes the position into that callback function.
