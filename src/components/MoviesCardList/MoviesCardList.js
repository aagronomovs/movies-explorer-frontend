import React from 'react';
import './MoviesCardList.css';
import { Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
    return (
        <div className='movies-card-list'>
            <Route path='/movies'>
            <ul className='movies-card-list__grid'>
                <MoviesCard />
            </ul>
            <div className='movies-card-list__wrapper'>
                <button className='movies-card-list__button-add'>Ещё</button>
            </div>
            </Route>

            <Route path='/saved-movies'>
            <ul className='movies-card-list__grid'>
                <MoviesCard />
            </ul>
            <div className='movies-card-list__divider'></div>
            </Route>
        </div>
    );
}