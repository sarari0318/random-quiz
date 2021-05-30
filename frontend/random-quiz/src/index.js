import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from "./components/Login"
import { CookiesProvider } from 'react-cookie';
import ApiContextProvider from "./context/ApiContext";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const routing = (
  <React.StrictMode>
  <BrowserRouter>
  <CookiesProvider>
    <ApiContextProvider>
    <AlertProvider template={AlertTemplate} {...options}>

      <Route exact path="/" component={Login} />
      <Route exact path="/table" component={App} />

    </AlertProvider>
    </ApiContextProvider>
  </CookiesProvider>
  </BrowserRouter>
  </React.StrictMode>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
