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
      })
      .then(this._checkResponse);
    }
  
    editUserInfo(name, email) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      })
      .then(this._checkResponse);
    }
  
    getMovies() {
      return fetch(`${this._url}/movies`, {
        method: 'GET',
        credentials: 'include',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }
  
    saveMovie(movie) {
      return fetch(`${this._url}/movies`, {
        method: 'POST',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `https://api.nomoreparties.co${movie.image.url}`,
          trailer: movie.trailerLink,
          thumbnail: movie.trailerLink,
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          }),
      })
      .then(this._checkResponse);
    }
  
    deleteMovie(movieId) {
      this._id = movieId;
      return fetch(`${this._url}/movies/${this._id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }

    register(name, email, password) {
      return fetch(`${this._url}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({ 
          name: name,
          email: email,
          password: password
        }),
      })
      .then(this._checkResponse);
    }

    authorize(email, password) {
      return fetch(`${this._url}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({ 
          email: email,
          password: password
        }),
      })
      .then(this._checkResponse);
    }

    logout() {
      return fetch(`${this._url}/signout`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }

    checkToken(token) {
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: this._headers,
      })
      .then(this._checkResponse);
    }


  }
  
  export default new MainApi({
    url: 'https://api.movies.agronomovs.nomoredomains.xyz',
    headers: {
      'Content-Type': 'application/json',
    },
  });