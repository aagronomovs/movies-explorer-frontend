class MainApi {
    constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${(res.status, res.statusText)}`);
    }
  
    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    editUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          email: data.email,
        }),
      }).then(this._checkResponse);
    }
  
    getMovies() {
      return fetch(`${this._url}/movies`, {
        method: 'GET',
        credentials: 'include',
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    saveMovie(movie) {
      return fetch(`${this._url}/movies`, {
        method: 'POST',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify(movie),
      }).then(this._checkResponse);
    }
  
    deleteMovie(movieId) {
      this._id = movieId;
      return fetch(`${this._url}/movies/${this._id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
      }).then(this._checkResponse);
    }
  }
  
  export default new MainApi({
    url: 'https://api.movies.agronomovs.nomoredomains.xyz',
    headers: {
      'content-type': 'application/json',
    },
  });