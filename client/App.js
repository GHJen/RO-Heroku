import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import history from './history';
import {Navbar} from './components'
import Routes from './routes'
import '../public/index.css';



ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Navbar />
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('app')
);
