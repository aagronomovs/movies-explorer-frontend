import React, { useContext, useEffect, useState } from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MoviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


export default function Movies({
    favouriteList,
    handleSaveMovie,
    handleDeleteMovie,    
}) {
    const currentUser = useContext(CurrentUserContext);
    
    const [shortMovies, setShortMovies] = useState(false);//состояние чекбокса
    const [initialMovies, setInitialMovies] = useState([]); //фильмы, полученные после поиска
    const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные фильтры по чекбоксу
    const [notFound, setNotFound] = useState(false); //фильмы не найдены, карточки не отображаются
    const [allMovies, setAllMovies] = useState([]); //все фильмы загруженные от АПИ
    const [message, setMessage] = useState(''); // сообщение при поиске
    
    // Установка чекбокса для короткометражек
    function handleCheckboxChange() {
        setShortMovies(!shortMovies);
        if (!shortMovies) {
            setFilteredMovies(filteredMovies(initialMovies));
        } else {
            setFilteredMovies(initialMovies);
        }
        localStorage.setItem(`${currentUser.email} - shortMovies`, !shortMovies);
    }

    // проверка чекбокса в локальном хранилище
    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true') {
        setShortMovies(true);
        } else {
        setShortMovies(false);
        }
    }, [currentUser]);

    // фильтрация по длительности/короткометражки
    function filterShortMovies(movies) {
        return movies.filter(movie => movie.duration <= 40);
    }
  
    // фильтрация по запросу
    function filterMovies(movies, search, filterCheckbox) {
        const moviesByUserSearch = movies.filter((movie) => {
        const movieRu = String(movie.nameRU).toLowerCase().trim();
        const movieEn = String(movie.nameEN).toLowerCase().trim();
        const userMovie = search.toLowerCase().trim();
        return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
        });
    
        if (filterCheckbox) {
        return filterShortMovies(moviesByUserSearch);
        } else {
        return moviesByUserSearch;
        }
    }

    // поиск по массиву и установка состояния
  function handleFilteredMovies(movies, search, filterCheckbox) {
    const moviesList = filterMovies(movies, search, filterCheckbox);
    if (moviesList.length === 0) {
      setMessage('Ничего не найдено');
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
        filterCheckbox ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem(
      `${currentUser.email} - movies`,
      JSON.stringify(moviesList)
    );
  }
 

    
    // Сабмит формы поиска
    function handleSubmitSearchForm(input) {
        localStorage.setItem(`${currentUser.email} - movieSearch`, input);
        localStorage.setItem(`${currentUser.email} - shortMovies`, shortMovies);

        if (allMovies.length === 0) {
            MoviesApi.getMovies()
                .then(movies => {
                    setAllMovies(movies);
                    handleFilteredMovies(
                //transformMovies(movies),
                input,
                shortMovies
            );
            })
            .catch(() =>
            setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'))
            } else {
        handleFilteredMovies(allMovies, input, shortMovies);
        }
    }

    //отрисовка фильмов из локального хранилища
    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - movies`)) {
          const movies = JSON.parse(
            localStorage.getItem(`${currentUser.email} - movies`)
          );
          setInitialMovies(movies);
          if (
            localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true'
          ) {
            setFilteredMovies(filterShortMovies(movies));
          } else {
            setFilteredMovies(movies);
          }
        }
      }, [currentUser]);


    return (
        <section className='movies'>
            <SearchForm
                handleCheckboxChange={handleCheckboxChange}
                handleSubmitSearchForm={handleSubmitSearchForm}
                shortMovies={shortMovies}
            />
            {!notFound && (
            <MoviesCardList
                moviesList={filteredMovies} 
                favouriteList={favouriteList}
                message={message}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
             />
             )}
        </section>
    );
}