import React, { useEffect, useState } from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useLocation } from 'react-router-dom';


export default function Movies({
    favouriteList,
    handleSaveMovie,
    handleDeleteMovie,    
}) {
    
    const routes = useLocation();
    const [checkboxActive, setCheckboxActive] = useState(false);
    const [listRendering, setListRendering] = useState([]);
    const [shortMoviesRendering, setShortMoviesRendering] = useState([]);
    const [message, setMessage] = useState('');

    const search = localStorage.getItem('search');
    const [searchPerform, setSearchPerform] = useState(search && routes.pathname === '/movies' ? search : '');

    // Установка чекбокса для короткометражек
    function handleCheckboxChange(isActive) {
        setMessage('');
        setCheckboxActive(isActive)
    }

    // Поиск фильмов
    useEffect(() => {
        if (searchPerform) {
            const newMovieList = JSON.parse(sessionStorage.getItem('initialMoviesList')).filter((movie) =>
                movie.nameRU.toLowerCase().indexOf(searchPerform.toLowerCase()) > -1)
                if (newMovieList.length) {
                    setListRendering(newMovieList)
                    localStorage.setItem('foundMovies', JSON.stringify(newMovieList))
                } else {
                    setMessage('Ничего не найдено')
                    setListRendering([])
                } 
            } else {
                const  newMovieList = JSON.parse(sessionStorage.getItem('initialMoviesList'))
                if (newMovieList.length) {
                    setListRendering(newMovieList)
                    localStorage.setItem('foundMovies', JSON.stringify(newMovieList))
                } else {
                    setMessage('Ничего не найдено')
                    setListRendering([])
                } 
            }
        }, [searchPerform, checkboxActive])

    //  отрисовка прошлого поиска при возврате
    useEffect(() => {
        localStorage.foundMovies && setListRendering(JSON.parse(localStorage.getItem('foundMovies')))
    }, [handleSaveMovie, handleDeleteMovie])    

    // Эффект обработки чекбокса при выборе короткометражек
    useEffect(() => {
        if (checkboxActive) {
            const newShortMovieList = listRendering.filter(movie => movie.duration <= 40)
            newShortMovieList.length ?
            setShortMoviesRendering(newShortMovieList) : setMessage('Ничего не найдено') && setListRendering([])
        } else {
            setShortMoviesRendering([])
        }
    }, [checkboxActive, listRendering])

    // Сабмит формы поиска
    function handleSubmitSearchForm(search) {
        setMessage('');
        setSearchPerform(search);
    }


    return (
        <section className='movies'>
            <SearchForm
                handleCheckboxChange={handleCheckboxChange}
                handleSubmitSearchForm={handleSubmitSearchForm}
            />
            
            <MoviesCardList
                moviesList={checkboxActive ? shortMoviesRendering : listRendering} 
                    favouriteList={favouriteList}
                    message={message}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
             />
        </section>
    );
}