export const BASE_URL = 'https://api.movies.agronomovs.nomoredomains.xyz';

const checkResponse = (res) => {
    if(res.ok){
      return res.json();
    } 
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
    .then(checkResponse);
  }

  export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password }),
    })
    .then(checkResponse);
  }

  export const logout = () => {
    return fetch(`${BASE_URL}/signout`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(checkResponse);
  }

  //export const checkToken = () => {
    //return fetch(`${BASE_URL}/users/me`, {
    //  method: 'GET',
     //credentials: 'include',
     //headers: {
      //  'Content-Type': 'application/json',
     //},
    //})
   //.then(checkResponse);
// }