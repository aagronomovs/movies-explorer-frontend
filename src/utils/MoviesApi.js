class MoviesApi {
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
  
    getMovies() {
      return fetch(`${this._url}`, {
        method: 'GET',
        headers: this._headers,
      }).then(this._checkResponse);
    }
  }
  
  export default new MoviesApi({
    url: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      'Content-Type': 'application/json',
    },
  });