import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Barra from "./components/Barra";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Barra></Barra>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


