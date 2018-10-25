import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './weather.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Weather/>, document.getElementById('main'));
});
