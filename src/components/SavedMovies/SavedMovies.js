import React, { useContext, useEffect, useState } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function SavedMovies({
    favouriteList,
    handleSaveMovie,
    handleDeleteMovie,
}) {
    const currentUser = useContext(CurrentUserContext);

    const [shortMovies, setShortMovies] = useState(false);//состояние чекбокса
    const [showedMovies, setShowedMovies] = useState(favouriteList); // показываемывые фильмы
    const [filteredMovies, setFilteredMovies] = useState(showedMovies); // отфильтрованные фильтры по чекбоксу
    const [notFound, setNotFound] = useState(false); //фильмы не найдены, карточки не отображаются
    const [message, setMessage] = useState('');

        
    // Установка чекбокса для короткометражек
    function handleCheckboxChange() {
        if (!shortMovies) {
            setShortMovies(true);
            localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
            setShowedMovies(filterShortMovies(filteredMovies));
            filterShortMovies(filteredMovies).length === 0 ? setNotFound(true) : setNotFound(false);
          } else {
            setShortMovies(false);
            localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
            filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
            setShowedMovies(filteredMovies);
          }
    }

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

    // Сабмит формы поиска
    function handleSubmitSearchForm(input) {
        const moviesList = filterMovies(favouriteList, input, shortMovies);
        if (moviesList.length === 0) {
          setNotFound(true);
          setMessage('Ничего не найдено.');
        } else {
          setNotFound(false);
          setFilteredMovies(moviesList);
          setShowedMovies(moviesList);
        }
    }

    // Эффект обработки чекбокса при выборе короткометражек
    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === 'true') {
          setShortMovies(true);
          setShowedMovies(filterShortMovies(favouriteList));
        } else {
          setShortMovies(false);
          setShowedMovies(favouriteList);
        }
      }, [favouriteList, currentUser]);
    
      useEffect(() => {
        setFilteredMovies(favouriteList);
        favouriteList.length !== 0 ? setNotFound(false) : setNotFound(true);
      }, [favouriteList]);

    

    return (
        <div className='saved-movies'>
            <SearchForm
                handleCheckboxChange={handleCheckboxChange}
                handleSubmitSearchForm={handleSubmitSearchForm}
                shortMovies={shortMovies}
            />
            {!notFound && (
            <MoviesCardList 
                favouriteList={favouriteList}
                moviesList={showedMovies}
                handleDeleteMovie={handleDeleteMovie}
                message={message}
            />
            )}
        </div>
    );
}