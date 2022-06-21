import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox() {
    return (
        <div className='checkbox'>
            <input
                className='checkbox__input'
                id='filter-checkbox'
                type='checkbox'
            />
            <label className='checkbox__label' htmlFor='filter-checkbox'>
            Короткометражки
            </label>
        </div>
    )
}