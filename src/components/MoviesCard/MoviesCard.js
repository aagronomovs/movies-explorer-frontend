import React from 'react';
import './MoviesCard.css';
import { Route } from 'react-router-dom';
import pic_33_card from '../../images/pic_33_card.png';

export default function MoviesCard() {
    const [ isSaved, setIsSaved ] = React.useState(false);

    function onSaveMovie() {
        setIsSaved(true);
    }

    function onDeleteMovie() {
        setIsSaved(false);
    }

    return (
        <li className='movies-card'>
            <div className='movies-card__container'>
                <Route path='/movies'>
                    <button
                    onClick={onSaveMovie} 
                    className={ isSaved ? 'movies-card__saved-button' : 'movies-card__save-button'}
                    aria-label='добавление фильма'
                    >Сохранить</button> 
                </Route>
                <Route path='/saved-movies'> 
                    <button 
                    className='movies-card__delete-button' 
                    onClick={onDeleteMovie}
                    aria-label='удаление фильма'
                    ></button>
                    </Route>
                
               
                <img src={pic_33_card} alt='фото фильма' className='movies-card__image' />
                
            </div>
            <div className='movies-card__box'>
                <h2 className='movies-card__title'>33 слова о дизайне</h2>
                <p className='movies-card__time'>1ч 17м</p>
            </div>
        </li>
    )
}