import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import { CurrentUser } from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';


function App() {
  // Popup
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
  // CurrentUser
  const [currentUser, setCurrentUser] = useState();
  // Preloader
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [messageError, setMessageError] = useState('');
  const [error, setError] = useState('');
  const [favouriteList, setFavouriteList] = useState([]);
  
  const routes = useLocation();
  const history = useHistory();

  const isHeader =
    routes.pathname === '/' ||
    routes.pathname === '/movies' ||
    routes.pathname === '/saved-movies' ||
    routes.pathname === '/profile';

  const isFooter =
    routes.pathname !== '/profile' && 
    routes.pathname !== '/signin' && 
    routes.pathname !== '/signup' &&
    routes.pathname !== '/*'; 
  
  // Регистрация
  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    MainApi.register({ name, password, email })
        .then((userData) => {
            if (userData) {
              setIsInfoTooltipOpen(true);
              setTimeout(() => {
                history.push('/signin');
                setIsInfoTooltipOpen(false);
                handleAuthorize({ email, password });
            },
                500)
            }
        })
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false))
  } 

  // авторизация
  function handleAuthorize({ email, password }) {
    setIsLoading(true)
    MainApi.authorize({ email, password })
        .then((userInfo) => {
            localStorage.setItem('auth', true)
            setCurrentUser(userInfo)
            localStorage.setItem('currentUser', JSON.stringify(userInfo))
            setLoggedIn(true);
            setDataUser();
            setMoviesData();
            history.push('/movies');
        })
        .catch((error) => {
          console.log(`Ошибка ${error}`);
        }) 
        .finally(() => setIsLoading(false))
  }

  // выйти из аккаунта
  function handleLogout() {
    MainApi.logout()
        .then(() => {
            setCurrentUser([])
            setLoggedIn(false);
            history.push('/')
            localStorage.clear()
        })
        .catch((error) => {
          console.log(`Ошибка ${error}`);
        });
  }

  // Проверка наличия токена
  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      MainApi.checkToken(localStorage.getItem('token'))
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  };

  useEffect(() => {
    handleTokenCheck()
  }, []);

  // Проверка авторизации на сайте
useEffect(() => {
  if (localStorage.auth) {
      setLoggedIn(true);
      MainApi.getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
          localStorage.setItem('currentUser', JSON.stringify(userInfo)) 
          history.push(routes.pathname);
        })
        .catch((error) => {
          history.push('/signin');
          console.log(`Ошибка ${error}`);
        })
        .finally(() => setIsLoading(false))
  }  
   // eslint-disable-next-line react-hooks/exhaustive-deps           
}, []);

// Получение карточек с фильмами
  useEffect(() => {
      MainApi.getMovies()
      .then((cardsInfo) => {
        setFavouriteList(cardsInfo);
        localStorage.setItem('savedMoviesList', JSON.stringify(cardsInfo))
      })
      .catch((error) => {
          console.log(`Ошибка ${error}`);
      })
      .finally(() => setIsLoading(false))
      setIsLoading(true)
      MoviesApi.getMovies()
          .then((cardsInfo) => {
              sessionStorage.setItem('initialMoviesList', JSON.stringify(cardsInfo))
          })
          .catch((error) => setError(error))
          .finally(() => setIsLoading(false))
          // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.savedMoviesList]);


  // Получить данные пользователя
  function setDataUser() {
    MainApi.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((error) => {
        console.log(`Ошибка ${error}`);
      })
  }  

  //Закрыть модальное окно  
  function closeInfoToolTip() {
    setIsInfoTooltipOpen(false);
    setMessageError('');
  }

  // Обработка ошибок
  useEffect(() => {
    if (error) {
      setMessageError(`Что то пошло не так ${error}!`);
      setIsInfoTooltipOpen(true);
    }
  }, [error]);
  
  // Запрос карточек с фильмами
  useEffect(() => {
    MainApi.getMovies()
    .then((cardsInfo) => {
      setFavouriteList(cardsInfo);
      localStorage.setItem('savedMoviesList', JSON.stringify(cardsInfo))
    })
    .catch((error) => {
      console.log(`Ошибка ${error}`);
    })
    .finally(() => setIsLoading(false))
    setIsLoading(true)
    MoviesApi.getMovies()
      .then((cardsInfo) => {
        sessionStorage.setItem('initialMoviesList', JSON.stringify(cardsInfo))
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false))
  }, [localStorage.savedMoviesList]) 

  // Получить данные карточек с фильмами
  function setMoviesData() {
    setIsLoading(true);
    MainApi.getMovies()
      .then((cardsInfo) => {
        setFavouriteList(cardsInfo);
        localStorage.setItem('savedMoviesList', JSON.stringify(cardsInfo))
        if (!sessionStorage.initialMoviesList) {
          MoviesApi.getMovies()
            .then((cardsInfo) => {
              sessionStorage.setItem('initialMoviesList', JSON.stringify(cardsInfo))
            })
            .catch((error) => setError(error))
        }
      })
      .catch((error) => {
        console.log(`Ошибка ${error}`)
      })
      .finally(() => setIsLoading(false))
  }

  // Добавить фильм в избранное
  function handleSaveMovie(movie) {
    setIsLoading(true);
    MainApi.saveMovie(movie)
      .then((savedMovie) => {
        setFavouriteList([...favouriteList, savedMovie]);
        let favouriteMovies = JSON.parse(localStorage.getItem('savedMoviesList'))
        favouriteMovies = favouriteMovies.concat(savedMovie)
        localStorage.setItem('savedMoviesList', favouriteMovies)
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false))
  }

  // Удалить фильм из избранного
  function handleDeleteMovie(movie) {
    const id = movie.movieId || movie.id;
    const movieId = movie._id || favouriteList.find((item) => item.movieId === movie.id)._id;
    console.log(id);
    MainApi.deleteMovie(movieId)
      .then((deleteMovie) => {
        setFavouriteList([...favouriteList, deleteMovie]);
        let favouriteMovies = JSON.parse(localStorage.getItem('savedMoviesList'))
        const index = favouriteMovies.findIndex(item => item.movieId === deleteMovie.movieId)
        favouriteMovies.splice(index, 1) 
        localStorage.setItem('savedMoviesList', JSON.stringify(favouriteMovies))
        })
        .catch((error) => setError(error))
  }

    

  return (
    <CurrentUser.Provider value={currentUser}>
      
      <div className='page'>
        {isHeader && <Header loggedIn={loggedIn} />}
        {isLoading ? (<Preloader />) :
        (<Switch>
        <Route exact path='/'>
           <Main />
        </Route>
      
         <Route path='/movies'>
           <Movies 
             favouriteList={favouriteList}
             handleSaveMovie={handleSaveMovie}
             handleDeleteMovie={handleDeleteMovie}
           />
         </Route>

         <Route path='/saved-movies'>
           <SavedMovies 
             favouriteList={favouriteList}
             handleSaveMovie={handleSaveMovie}
             handleDeleteMovie={handleDeleteMovie}
           />
         </Route> 

         <Route path='/profile'>
           <Profile />
         </Route>

         <Route path='/signup'>
           <Register 
              onRegister={handleRegister}
              messageError={messageError}
           />  
         </Route>   

         <Route path='/signin'>
           <Login 
              onLogin={handleAuthorize}
              loggedIn={loggedIn}
              messageError={messageError}
           />
         </Route>

         <Route path='/*'>
           <NotFound />
         </Route>
     
       </Switch>
        )}
          
        {isFooter && <Footer />}
        {isInfoTooltipOpen && 
          <InfoToolTip onClose={closeInfoToolTip} message={infoTooltipMessage} />
        }  
      </div>
      
    </CurrentUser.Provider>
  );
}

export default App;
