import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ checkboxStatus, moveCheckbox }) {
    
    function onChange() {
        const filter = document.querySelector('input[type=checkbox]');
        const isFiltered = filter.checked;
        moveCheckbox(isFiltered)
    }

    return (
        <div className='checkbox'>
            <input
                className='checkbox__input'
                id='filter-checkbox'
                type='checkbox'
                onChange={onChange}
                checked={checkboxStatus === true ? true : false}
            />
            <label className='checkbox__label' htmlFor='filter-checkbox'>
            Короткометражки
            </label>
        </div>
    )
}