import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ shortMovies, handleCheckboxChange }) {
    
    return (
        <div className='checkbox'>
            <input
                className='checkbox__input'
                id='filter-checkbox'
                type='checkbox'
                onChange={handleCheckboxChange}
                checked={shortMovies ? true : false}
            />
            <label className='checkbox__label' htmlFor='filter-checkbox'>
            Короткометражки
            </label>
        </div>
    )
}