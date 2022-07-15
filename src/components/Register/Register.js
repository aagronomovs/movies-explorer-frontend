import React, { useEffect } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useFormValidation from '../../hooks/useFormValidation';

export default function Register({ onRegister }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormValidation();

    const handleSubmit = (e) => {
      e.preventDefault();
      const name = values.name;
      const email = values.email;
      const password = values.password;
      onRegister(name, email, password);
    };
  
    useEffect(() => {
      resetForm({}, {}, true);
    }, [resetForm]);

    return (
        <div className='register'>
            <div className='register__container'>
                <Link to='/' className='register__logo-link'>
                <img className='register__logo' src={logo} alt='логотип проекта' />
                </Link>
                <h2 className='register__title'>Добро пожаловать!</h2>
                <form className='register__form' onSubmit={handleSubmit}>
                    <label className='register__label' htmlFor='name'>Имя</label>
                        <input className='register__input'
                        required
                        type='text'
                        name='name'
                        id='name'
                        minLength='2'
                        maxLength='30'
                        value={values.name || ''}
                        onChange={handleChange}
                        />
                        <span className='register__input-error'>{errors.name || ''}</span>
                    
                    <label className='register__label' htmlFor='email'>E-mail</label>
                        <input className='register__input'
                        required
                        type='email'
                        name='email'
                        id='email'
                        minLength='6'
                        maxLength='30'
                        value={values.email || ''}
                        onChange={handleChange}
                        />
                        <span className='register__input-error'>{errors.email || ''}</span>
                        
                    <label className='register__label' htmlFor='password'>Пароль</label>
                        <input className='register__input'
                        required
                        type='password'
                        name='password'
                        id='password'
                        minLength='6'
                        maxLength='30'
                        value={values.password || ''}
                        onChange={handleChange}
                        />
                        <span className='register__input-error'>{errors.password || ''}</span>
                    
                    <button 
                        className={`register__button ${!isValid && 'register__button_disabled'}`} 
                        type='submit'
                        onSubmit={handleSubmit}
                        disabled={!isValid}
                    >
                        {''}    
                        Зарегистрироваться
                    </button>        
                </form>
                <div className='register__wrapper'>
                    <p className='register__text'>Уже зарегистрированы?</p>
                    <Link to='/signin' className='register__link'>Войти</Link>
                </div>
            </div>
        </div>
    );
}