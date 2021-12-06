import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import App from './components/App';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import reducers from './reducers';
import thunk from 'redux-thunk';

const jwtToken = localStorage.getItem('JWT_TOKEN');

ReactDOM.render(
    <Provider store={createStore(reducers, {
      auth: {
        token: jwtToken,
        isAuthenticated: jwtToken ? true : false
      }
    }, applyMiddleware(thunk))}>
    <BrowserRouter>
      <App>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          </Routes>
      </App>
    </BrowserRouter>
    </Provider>,
document.querySelector('#root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
