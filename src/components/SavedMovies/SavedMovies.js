import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies() {
    return (
        <div className='saved-movies'>
            <SearchForm />
            <MoviesCardList />
        </div>
    );
}