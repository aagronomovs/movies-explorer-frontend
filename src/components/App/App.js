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
import * as auth from '../../utils/auth';
import Preloader from '../Preloader/Preloader';


function App() {
  // Popup
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
  
  // CurrentUser
  const [currentUser, setCurrentUser] = useState({});
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


  
  //Закрыть модальное окно  
  function closeInfoToolTip() {
    setIsInfoTooltipOpen(false);
  }  
  
  // Регистрация
  function handleRegister(name, email, password) {
    setIsLoading(true);
    auth.register(name, email, password)
        .then((data) => {
            if (data._id) {                              
              setIsInfoTooltipOpen(true);
              setTimeout(() => {
                navigate('/signin');
                setIsInfoTooltipOpen(false);
                handleAuthorize(email, password);
                
            },
                3000)
          }
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
        .then((res) => {
          if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('token', res.token);
          //setCurrentUser(res.user);
         //handleTokenCheck();
          
          navigate('/movies');
        }
        })
        .catch((error) => {
          console.log(`Ошибка ${error}`);
        }) 
        .finally(() => setIsLoading(false))
  }

  
//Проверяем наличие токена и подтверждаем авторизацию
useEffect(() => {
  const token = localStorage.getItem('token');
    if (token) {
    setIsLoading(true);
    mainApi.getUserInfo()
      .then((data) => {
        console.log('data', data);
        setLoggedIn(true);
        setCurrentUser(data);
        navigate(routes.pathname);
      })
      .catch((error) => console.log(`${error}`))
      .finally(() => setIsLoading(false))
  }
}, []);


  // выйти из аккаунта
  function handleLogout() {
            setCurrentUser({ })
            localStorage.removeItem('token');
            localStorage.clear();
            navigate('/');
            setLoggedIn(false);
  }

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
    mainApi.editUserInfo(name, email)
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


  // Запрос карточек с моими фильмами
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
  }
  }, [currentUser, loggedIn]); 

  // Добавить фильм в избранное
  function handleSaveMovie(movie) {
    setIsLoading(true);
    mainApi.saveMovie(movie)
      .then((newMovie) => {
        setFavouriteList([...favouriteList, newMovie]);
       // let favouriteMovies = JSON.parse(localStorage.getItem('savedMoviesList'))
       // favouriteMovies = favouriteMovies.concat(savedMovie)
       // localStorage.setItem('savedMoviesList', favouriteMovies)
      })
      .catch((error) => console.log(`Ошибка ${error}`))
      .finally(() => setIsLoading(false))
  }

  // Удалить фильм из избранного
  function handleDeleteMovie(movie) {
    //const id = movieData.movieId || movieData.id;
    //const movieId = movieData._id || favouriteList.find((item) => item.movieId === movieData.id)._id;
    //console.log(id);
    const savedMovie = favouriteList.find((item) => item.movieId === movie.id || item.movieId === movie.movieid)
    mainApi.deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = favouriteList.filter(m => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
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
              navigate={navigate}
            />
          } />
          
          <Route path='/movies' element={
            <ProtectedRoute loggedIn={loggedIn}> 
              <Movies
                loggedIn={loggedIn}              
                favouriteList={favouriteList}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
              />
            </ProtectedRoute>
          } />  
         
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                loggedIn={loggedIn} 
                favouriteList={favouriteList}
                handleDeleteMovie={handleDeleteMovie}
              />
            </ProtectedRoute> 
          } />
         
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile
                loggedIn={loggedIn} 
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
