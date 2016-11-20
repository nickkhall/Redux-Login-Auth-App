import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';


const API_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email / pass to server
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        // If req is good
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // Save the JWT Token
        localStorage.setItem('token', response.data.token);
        // Redirect to route/feature
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If req is bad
        // - Show an error to user
        dispatch(authError('Bad Login Information'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    // Submit email / pass to server
    axios.post(`${API_URL}/signup`, { email, password })
      .then(response => {
        // If req is good
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // Save the JWT Token
        localStorage.setItem('token', response.data.token);
        // Redirect to route/feature
        browserHistory.push('/feature');
      })
      .catch(response => {
        // If req is bad
        // - Show an error to user
        dispatch(authError(response.data.error));
      });
  }
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(API_URL, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}
