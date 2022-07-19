import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';


export default function MoviesCard({
    movie,
    handleSaveMovie,
    handleDeleteMovie,
    isSaved
}) {
    const routes = useLocation();
    
    function handleSaveClick() {
        handleSaveMovie(movie);
    }
    
    function handleDeleteClick() {
        handleDeleteMovie(movie);
    }

    const transformDuration = () => {
        return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
    };

    //const url =
    //movie.image.url === undefined
    //    ? movie.image
    //    : `https://api.nomoreparties.co${movie.image.url}`;

    //const trailer =
    //movie.trailer === undefined ? movie.trailerLink : movie.trailer;
      

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
                        onClick={isSaved() ? handleDeleteClick : handleSaveClick} 
                        //className={ isSaved ? 'movies-card__saved-button' : 'movies-card__save-button'}
                        className={`movies-card__save-button ${
                            isSaved() && `movies-card__saved-button`}`}
                        aria-label='добавление фильма'
                        ></button>   
                    )
                }
                    <a href={movie.trailerLink} target='_blank' rel='noopener noreferrer'>
                        <img src={movie.image}
                        alt={movie.nameRU}
                        className='movies-card__image' />
                    </a>
                </div>
               
            <div className='movies-card__box'>
                <h2 className='movies-card__title'>{movie.nameRU}</h2>
                <p className='movies-card__time'>{transformDuration()}</p>
            </div>
        </li>
    )
}