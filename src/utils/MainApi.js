class MainApi {
    constructor(url) {
      this._url = url;
      
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
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('jwt'),
        },
      })
      .then(this._checkResponse);
    }
  
    editUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
        }),
      })
      .then(this._checkResponse);
    }
  
    getMovies() {
      return fetch(`${this._url}/movies`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('jwt'),
        },
      })
      .then(this._checkResponse);
    }
    
    //сохранить фильм в избранное
    saveMovie(movie) {
      return fetch(`${this._url}/movies`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('jwt'),
        },
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
  
    //удалить фильм из избранного
    deleteMovie(movieId) {
      //this._id = movieId;
      return fetch(`${this._url}/movies/${movieId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { authorization: localStorage.getItem('jwt') }
      })
      .then(this._checkResponse);
    }
  }
  
  const mainApi = new MainApi({
    url: 'https://api.movies.agronomovs.nomoredomains.xyz',  
  });

  export default mainApi;