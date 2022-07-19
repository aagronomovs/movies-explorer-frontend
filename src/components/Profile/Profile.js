import React, { useContext, useEffect } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from '../../hooks/useFormValidation';

export default function Profile({ handleLogout, changeProfileInfo }) {
    const currentUser = useContext(CurrentUserContext);
    console.log('Profile: currentUser = ', currentUser)
    const { values, handleChange, errors, isValid, resetForm } = useFormValidation();
    

    // после загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        resetForm({ name: currentUser.name, email: currentUser.email }, {}, true);
    }, [resetForm, currentUser]);

    const handleSubmit = (e) => {
            e.preventDefault();
            if (values.name !== currentUser.name ||
                values.email !== currentUser.email
                ) {
                    
                    changeProfileInfo({
                        name: values.name, 
                        email: values.email
                    });
                }
           
        }

    

    return (
        <section className='profile'>
            <div className='profile__container'>
                <h2 className='profile__header'>
                    Привет, {currentUser.name}!
                </h2>
                <form className='profile__form' onSubmit={handleSubmit}>
                    <label className='profile__label' htmlFor='name'>Имя
                    <input
                    required
                    className='profile__input'
                    id='name'
                    type='name'
                    name='name'
                    minLength='2'
                    maxLength='30'
                    defaultValue={currentUser.name || ''}
                    onChange={handleChange}
                    
                    />
                    <span className='profile__error'>{errors.name || ''}</span>
                    </label>
                    <label className='profile__label' htmlFor='email'>E-mail
                    <input
                    required
                    className='profile__input'
                    id='email'
                    type='email'
                    name='email'
                    defaultValue={currentUser.email || ''}
                    onChange={handleChange}
                    
                    />
                    <span className='profile__error'>{errors.email || ''}</span>
                    </label>
                </form>
                <button 
                    className={`profile__button ${(!isValid || (currentUser.name === values.name || currentUser.email === values.email)) ? 'profile__button_disabled' : ''}`}
                    type='submit' 
                    onClick={handleSubmit}
                    >
                    Редактировать
                </button>
                <Link to='/signin' className='profile__logout-link' onClick={handleLogout}>Выйти из аккаунта</Link>
            </div>
        </section>
    );
}