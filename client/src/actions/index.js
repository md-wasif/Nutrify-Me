import axios from 'axios';
import { AUTH_SIGN_UP, AUTH_SIGN_OUT, AUTH_SIGN_IN, AUTH_ERROR } from './types';


export const oauthGoogle = data => {
    return async dispatch => {
        const res = await axios.post('http://localhost:5000/users/oauth/google', {
            access_token: data
        });
        dispatch({
            type: AUTH_SIGN_UP,
        });

        localStorage.setItem('JWT_TOKEN', res.data.token);
   }
}


export const oauthFacebook = data => {
    return async dispatch => {
        const res = await axios.post('http://localhost:5000/users/oauth/facebook', {
            access_token: data
        });
        dispatch({
            type: AUTH_SIGN_UP,
        });

        localStorage.setItem('JWT_TOKEN', res.data.token);
    }
}


export const signUp = data => {
    /*
    Step 1: Use the data, make a http request to our BE and send it along...
    Step 2: Take the BE response...
    Step 3: Dispatch user just sign up...
    step 4: save the JWTToken to local storage...
    */
    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:5000/users/register', data);
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email is already in use..'
            })
        }
    }
}


export const signIn = data => {
    /*
    Step 1: Use the data, make a http request to our BE and send it along...
    Step 2: Take the BE response...
    Step 3: Dispatch user just sign up...
    step 4: save the JWTToken to local storage...
    */
    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:5000/users/login', data);
            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email and password are not valid..'
            })
        }
    }
}


export const signOut = data => {

    return async dispatch => {
        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        });

        localStorage.removeItem('JWT_TOKEN');
    }
}