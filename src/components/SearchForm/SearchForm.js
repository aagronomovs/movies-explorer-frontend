import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
    return (
        <section className='search'>
            <div className='search__container'>
                <form className='search__form'>
                    <div className='search__row'>
                        <input 
                        className='search__input' 
                        name='search' 
                        placeholder='Фильм' 
                        type="text"
                        />
                        <button className='search__button' type='submit'>Поиск</button>
                    </div>
                </form>
                <FilterCheckbox />
            </div>
            <div className='search__line'></div>
        </section>
      );
}