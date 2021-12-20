import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import App from './components/App';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import reducers from './reducers';
import thunk from 'redux-thunk';
import authGuard from './components/HOCs/authGuard';


const jwtToken = localStorage.getItem('JWT_TOKEN');

ReactDOM.render(
    <Provider store={createStore(reducers, {
      auth: {
        token: jwtToken,
        isAuthenticated: jwtToken ? true : false
      }
    }, applyMiddleware(thunk))}>
    <Router>
      <App>
          <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/dashboard" component={authGuard(Dashboard)} />
          </Switch>
      </App>
    </Router>
    </Provider>,
document.querySelector('#root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
