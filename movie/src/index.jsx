import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter >

    ,
    document.getElementById('root')
    );