import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies({
    favouriteList,
    handleSaveMovie,
    handleDeleteMovie,
}) {
    const [searchPerform, setSearchPerform] = useState('');
    const [checkboxActive, setCheckboxActive] = useState(false);
    const [message, setMessage] = useState('');

    const [favouriteMoviesList, setFavouriteMoviesList] = useState([]);    
    const [savedListRendering, setSavedListRendering] = useState([]);
    const [shortMoviesListSaved, setShortMoviesListSaved] = useState([]);
    
    // Установка чекбокса для короткометражек
    function handleCheckboxChange(isActive) {
        setMessage('');
        setCheckboxActive(isActive)
    }

    // Сабмит формы поиска
    function handleSubmitSearchForm(search) {
        setMessage('');
        setSearchPerform(search);
    }

    // Поиск фильмов
    useEffect(() => {
        if (searchPerform) {
            const newMovieList = JSON.parse(localStorage.getItem('savedMoviesList')).filter((movie) =>
                movie.nameRU.toLowerCase().indexOf(searchPerform.toLowerCase()) > -1)
            if (newMovieList.length) {
                setSavedListRendering(newMovieList)
            } else {
                setMessage('Ничего не найдено')
                setSavedListRendering([])
            }
        } else {
            setSavedListRendering(favouriteMoviesList)
        } 
        favouriteMoviesList.length ? setMessage('') : setMessage('Ничего не найдено')        
    }, [searchPerform, favouriteMoviesList, checkboxActive])

    // Эффект обработки чекбокса при выборе короткометражек
    useEffect(() => {
        if (checkboxActive && savedListRendering.length) {
            const newShortMovieList = savedListRendering.filter(movie => movie.duration <= 40)
            newShortMovieList.length ?
            setShortMoviesListSaved(newShortMovieList) : setMessage('Ничего не найдено') && setSavedListRendering([])
        } else {
            setShortMoviesListSaved([])
        }
    }, [savedListRendering, checkboxActive])

    //  отрисовка прошлого поиска при возврате
    useEffect(() => {
        localStorage.savedMoviesList &&  setFavouriteMoviesList(JSON.parse(localStorage.getItem('savedMoviesList')))
    }, [handleSaveMovie, handleDeleteMovie, checkboxActive])


    return (
        <div className='saved-movies'>
            <SearchForm
                handleCheckboxChange={handleCheckboxChange}
                handleSubmitSearchForm={handleSubmitSearchForm}
            />
            <MoviesCardList 
                favouriteList={favouriteList}
                favouriteMoviesData={
                    shortMoviesListSaved.length ?
                        shortMoviesListSaved
                        :
                        savedListRendering   
                }
                handleDeleteMovie={handleDeleteMovie}
                message={message}
            />
        </div>
    );
}