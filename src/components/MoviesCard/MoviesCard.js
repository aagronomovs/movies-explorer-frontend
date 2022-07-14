import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';


export default function MoviesCard({
    movieData,
    handleSaveMovie,
    handleDeleteMovie,
    favouriteList
}) {
    const routes = useLocation();
    const isSaved = () => {
        return favouriteList.some((item) => item.movieId === movieData.id);
    }

    const transformDuration = () => {
        return `${Math.floor(movieData.duration / 60)}ч ${movieData.duration % 60}м`;
    };

    function handleSaveClick() {
        handleSaveMovie(movieData);
    }
    
    function handleDeleteClick() {
        handleDeleteMovie(movieData);
    }

    const url =
    movieData.image.url === undefined
        ? movieData.image
        : `https://api.nomoreparties.co${movieData.image.url}`;

    const trailer =
    movieData.trailer === undefined ? movieData.trailerLink : movieData.trailer;
      

    return (
        <li className='movies-card'>
            <div className='movies-card__container'>
                {
                    routes.pathname === '/saved-movies' ? (
                        <button 
                        className='movies-card__delete-button' 
                        onClick={handleDeleteClick}
                        aria-label='удаление фильма'
                        ></button>
                    ) :
                    (
                        <button
                        onClick={isSaved ? handleDeleteClick : handleSaveClick} 
                        className={ isSaved ? 'movies-card__saved-button' : 'movies-card__save-button'}
                        aria-label='добавление фильма'
                        ></button>   
                    )
                }
                    <a href={trailer} target='_blank' rel='noopener noreferrer'>
                        <img src={url}
                        alt={movieData.nameRU}
                        className='movies-card__image' />
                    </a>
                </div>
               
            <div className='movies-card__box'>
                <h2 className='movies-card__title'>{movieData.nameRU}</h2>
                <p className='movies-card__time'>{transformDuration()}</p>
            </div>
        </li>
    )
}