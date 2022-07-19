import React, { useContext, useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../hooks/useFormValidation';

export default function SearchForm({ 
    handleCheckboxChange,
    shortMovies,
    handleSubmitSearchForm
 }) {
    const currentUser  = useContext(CurrentUserContext);
    const routes = useLocation();
    const { values, handleChange, errors, isValid, setIsValid, setErrors} = useFormValidation();
    
    //состояние инпута из локального хранилища
    useEffect(() => {
        if (routes.pathname === '/movies' && localStorage.getItem(`${currentUser.email} - movieSearch`)) {
            const searchValue = localStorage.getItem(`${currentUser.email} - movieSearch`);
            values.search = searchValue;
            setIsValid(true);
        }
    }, [currentUser]);


    //сабмит формы
    function handleSubmit(e) {
        e.preventDefault();
        isValid ? handleSubmitSearchForm(values.search) : setErrors('Нужно ввести ключевое слово.');
    }

    //useEffect(() => {
    //    setErrors('');
    //}, [isValid]);

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
                            value={values.search || ''} 
                            onChange={handleChange}
                            placeholder='Фильм' 
                            type="text"
                            required
                        />
                        <span className='search__error'>{errors.search}</span>
                        <button className='search__button' type='submit'>Поиск</button>
                    </div>
                </form>
                
                <FilterCheckbox 
                    shortMovies={shortMovies}
                    handleCheckboxChange={handleCheckboxChange}
                />
            </div>
            <div className='search__line'></div>
        </section>
      );
}