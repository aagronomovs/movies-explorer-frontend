import React, { useEffect, useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';

export default function SearchForm({ 
    handleCheckboxChange,
    handleSubmitSearchForm
 }) {
    const routes = useLocation();
    // Состояние поиска
    const search = localStorage.getItem('search');
    const [searchPerform, setSearchPerform] = useState(search && routes.pathname === '/movies' ? search : '');

    //Стейт состояния переключателя чекбокса
    const [isActive, setIsActive] = useState(false);
    const checkboxStatus = JSON.parse(localStorage.getItem('checkboxStatus'));

    // Изменение инпута
    function handleChangeInput(e) {
        setSearchPerform(e.target.value)
        if (routes.pathname === '/movies') {
            localStorage.setItem('search', e.target.value);
        }
    }

    // Поведение чекбокса
    function moveCheckbox() {
        if (routes.pathname === '/movies' && isActive === false) {
            localStorage.setItem('checkBoxStatus', true);
            setIsActive(true);
            handleCheckboxChange(true)
        } else if (routes.pathname === '/movies' && isActive === true) {
            localStorage.setItem('checkBoxStatus', false);
            setIsActive(false);
            handleCheckboxChange(false)
        } else if (routes.pathname === '/saved-movies' && isActive === false) {
            setIsActive(true);
            handleCheckboxChange(true)
        } else if (routes.pathname === '/saved-movies' && isActive === true ) {
            setIsActive(false);
            handleCheckboxChange(false)
        }
}

    useEffect(() => {
        routes.pathname === '/movies' &&
            handleCheckboxChange(checkboxStatus);
    }, []);


    //сабмит формы
    function handleSubmit(e) {
        e.preventDefault();
        handleSubmitSearchForm(search);
    }

    return (
        <section className='search'>
            <div className='search__container'>
                <form 
                    className='search__form' 
                    onSubmit={handleSubmit} 
                    name='search-form'
                    noValidate
                >
                    <div className='search__row'>
                        <input 
                            className='search__input'
                            id='search' 
                            name='search'
                            minLength='2'
                            maxLength='60'
                            value={searchPerform} 
                            onChange={handleChangeInput}
                            placeholder='Фильм' 
                            type="text"
                            required
                        />
                        <button className='search__button' type='submit'>Поиск</button>
                    </div>
                </form>
                
                <FilterCheckbox 
                    moveCheckbox={moveCheckbox}
                    checkboxStatus={
                        routes.pathname === '/movies' ?
                        checkboxStatus :
                        isActive }
                />
            </div>
            <div className='search__line'></div>
        </section>
      );
}