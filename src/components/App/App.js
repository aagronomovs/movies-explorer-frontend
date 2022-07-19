import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import * as auth from '../../utils/auth';
import Preloader from '../Preloader/Preloader';


function App() {
  // Popup
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
  
  // CurrentUser
  const [currentUser, setCurrentUser] = useState({email: '', name: '' });
  // Preloader
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  //const [messageError, setMessageError] = useState('');
  //const [error, setError] = useState('');
  const [favouriteList, setFavouriteList] = useState([]);
  
  const routes = useLocation();
  const navigate = useNavigate();

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
  function handleRegister(name, email, password) {
    setIsLoading(true);
    auth.register(name, email, password)
        .then(() => {
                              
              setIsInfoTooltipOpen(true);
              setTimeout(() => {
                navigate('/signin');
                setIsInfoTooltipOpen(false);
                handleAuthorize(email, password);
                
            },
                3000)
        })
        .catch((error) => {
          console.log(`Ошибка ${error}`);
          setIsInfoTooltipOpen(true);
          setInfoTooltipMessage('Что-то пошло не так! Проверьте правильность введенных данных');
          setTimeout(() => {
            closeInfoToolTip();
          }, 3000);
        })
        .finally(() => setIsLoading(false))
  } 

  // авторизация
  function handleAuthorize(email, password) {
    setIsLoading(true);
    auth.authorize(email, password)
        .then((jwt) => {
          if (jwt.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', jwt.token);
         // setCurrentUser(res);
        
          //handleTokenCheck();
          
          navigate('/movies');
        }
        })
        .catch((error) => {
          console.log(`Ошибка ${error}`);
        }) 
        .finally(() => setIsLoading(false))
  }

  // выйти из аккаунта
  function handleLogout() {
            setCurrentUser({ })
            localStorage.removeItem('jwt');
            localStorage.clear();
            navigate('/');
            setLoggedIn(false);
  }

  // Проверка наличия токена
 // function handleTokenCheck() {
   //const token = localStorage.getItem('jwt');
   //if (token) {
    //   auth.checkToken(token)
    //  .then((res) => {
    //  if (res) {
     //   setLoggedIn(true);
     //   navigate('/movies');
     //   setCurrentUser({ name: res.name, email: res.email });
      //}
    //})
  //.catch((error) => {
  //  console.log(`${error}`);
 //});
//}
//};

 //useEffect(() => {
 // handleTokenCheck();
 //}, [loggedIn]);

  
// Получение карточек с фильмами
  useEffect(() => {
      mainApi.getMovies()
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
          .catch((error) => console.log(`Ошибка ${error}`))
          .finally(() => setIsLoading(false))
          // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.savedMoviesList]);

//Получить данные пользователя (проверка токена и авторизация)
useEffect(() => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    setIsLoading(true);
    mainApi.getUserInfo()
      .then((data) => {
        console.log(data);
        setLoggedIn(true);
        setCurrentUser(data);
        navigate(routes.pathname);
      })
      .catch((error) => console.log(`${error}`))
      .finally(() => setIsLoading(false))
  }
}, []);

//Получить данные пользователя
useEffect(() => {
  if (loggedIn) {
    setIsLoading(true);
    mainApi.getUserInfo()
      .then(res => setCurrentUser(res))
      .catch((error) => console.log(`${error}`))
      .finally(() => setIsLoading(false));
  }
}, [loggedIn]);


 
  // Изменить данные пользователя
  function changeProfileInfo({name, email}) {
    setIsLoading(true);
    mainApi.editUserInfo({name, email} )
      .then((data) => {
        setCurrentUser(data);   
        setIsInfoTooltipOpen(true);
            
        setInfoTooltipMessage('Ваши данные изменены');
        setTimeout(() => {
          setIsInfoTooltipOpen(false);
      },
      3000)
      })
      .catch((error) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipMessage('Что-то пошло не так! Проверьте правильность введенных данных');
        closeInfoToolTip();
        console.log(`${error}`);
      })
      .finally(() => setIsLoading(false));
  }

  //Закрыть модальное окно  
  function closeInfoToolTip() {
    setIsInfoTooltipOpen(false);
    
  }

  // Обработка ошибок
 // useEffect(() => {
 //   if (error) {
  //    setMessageError(`Что-то пошло не так ${error}!`);
  //    setIsInfoTooltipOpen(true);
  //  }
  //}, [error]);
  
  // Запрос карточек с сохраненными фильмами
  useEffect(() => {
    if (loggedIn && currentUser) {
    mainApi.getMovies()
      .then((data) => {
      const userMoviesList = data.filter(m => m.owner === currentUser._id);
      setFavouriteList(userMoviesList);
  //    setFavouriteList(cardsInfo);
  //    localStorage.setItem('savedMoviesList', JSON.stringify(cardsInfo))
   })
    .catch((error) => {
      console.log(`Ошибка ${error}`);
    })
  //  .finally(() => setIsLoading(false))
  //  setIsLoading(true)
  //  MoviesApi.getMovies()
  //    .then((cardsInfo) => {
  //      sessionStorage.setItem('initialMoviesList', JSON.stringify(cardsInfo))
  //    })
   //   .catch((error) => setError(error))
   //   .finally(() => setIsLoading(false))
  }
  }, [currentUser, loggedIn]); 

  // Получить данные карточек с фильмами
  //function setMoviesData() {
  //  setIsLoading(true);
  //  mainApi.getMovies()
  //    .then((cardsInfo) => {
  //      setFavouriteList(cardsInfo);
   //     localStorage.setItem('savedMoviesList', JSON.stringify(cardsInfo))
    //    if (!sessionStorage.initialMoviesList) {
    //      MoviesApi.getMovies()
     //       .then((cardsInfo) => {
      //        sessionStorage.setItem('initialMoviesList', JSON.stringify(cardsInfo))
        //    })
         //   .catch((error) => console.log(`Ошибка ${error}`))
       // }
     // })
  //    .catch((error) => {
  //      console.log(`Ошибка ${error}`)
   //   })
   //   .finally(() => setIsLoading(false))
 // }

  // Добавить фильм в избранное
  function handleSaveMovie(movieData) {
    setIsLoading(true);
    mainApi.saveMovie(movieData)
      .then((savedMovie) => {
        setFavouriteList([...favouriteList, savedMovie]);
       // let favouriteMovies = JSON.parse(localStorage.getItem('savedMoviesList'))
       // favouriteMovies = favouriteMovies.concat(savedMovie)
       // localStorage.setItem('savedMoviesList', favouriteMovies)
      })
      .catch((error) => console.log(`Ошибка ${error}`))
      .finally(() => setIsLoading(false))
  }

  // Удалить фильм из избранного
  function handleDeleteMovie(movieData) {
    //const id = movieData.movieId || movieData.id;
    //const movieId = movieData._id || favouriteList.find((item) => item.movieId === movieData.id)._id;
    //console.log(id);
    const savedMovie = favouriteList.find((item) => item.movieId === movieData.id || item.movieId === movieData.id)
    mainApi.deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = favouriteList.filter(m => {
          if (movieData.id === m.movieId || movieData.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setFavouriteList(newMoviesList);
        //setFavouriteList([...favouriteList, deleteMovie]);
        //let favouriteMovies = JSON.parse(localStorage.getItem('savedMoviesList'))
        //const index = favouriteMovies.findIndex(item => item.movieId === deleteMovie.movieId)
       // favouriteMovies.splice(index, 1) 
       // localStorage.setItem('savedMoviesList', JSON.stringify(favouriteMovies))
        })
        .catch((error) => console.log(`Ошибка ${error}`))
  }

    

  return (
    <CurrentUserContext.Provider value={currentUser}>
      
      <div className='page'>
        {isHeader && <Header loggedIn={loggedIn} />}
        {isLoading ? (<Preloader />) :
        (<Routes>
          <Route path='/' element={
            <Main />
          } />
           
        
          <Route exact path='/signup' element={
            <Register 
            onRegister={handleRegister}
            
            />  
          } />
           
          <Route exact path='/signin' element={
            <Login 
              onLogin={handleAuthorize}
              loggedIn={loggedIn}
              
            />
          } />
          
          <Route path='/movies' element={
            <ProtectedRoute loggedIn={loggedIn}> 
              <Movies
                favouriteList={favouriteList}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
              />
            </ProtectedRoute>
          } />  
         
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                favouriteList={favouriteList}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
              />
            </ProtectedRoute> 
          } />
         
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile
                handleLogout={handleLogout}
                changeProfileInfo={changeProfileInfo}
              />
            </ProtectedRoute>
          } />
         
          <Route path='/*' element={
            <NotFound />
          } />
     </Routes>
      )}
          
      {isFooter && <Footer />}
      {isInfoTooltipOpen && 
          <InfoToolTip onClose={closeInfoToolTip} message={infoTooltipMessage} />
      }  
      </div>
      
    </CurrentUserContext.Provider>
  );
}

export default App;
