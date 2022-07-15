import React, { useEffect } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useFormValidation from '../../hooks/useFormValidation';

export default function Login({ onLogin }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormValidation();

    const handleSubmit = (e) => {
      e.preventDefault();
      const email = values.email;
      const password = values.password;
      onLogin(email, password);
    };
  
    useEffect(() => {
      resetForm({}, {}, true);
    }, [resetForm]);
  

    return (
        <div className='login'>
            <div className='login__container'>
                <Link to='/' className='login__logo-link'>
                <img className='login__logo' src={logo} alt='логотип проекта' />
                </Link>
                <h2 className='login__title'>Рады видеть!</h2>
                <form className='login__form' onSubmit={handleSubmit} >
                                        
                    <label className='login__label' htmlFor='email'>E-mail</label>
                        <input className='login__input'
                        required
                        type='email'
                        name='email'
                        id='email'
                        minLength='6'
                        maxLength='30'
                        value={values.email || ''}
                        onChange={handleChange}
                        />
                        <span className='login__input-error'>{errors.email || ''}</span>
                        
                    <label className='login__label' htmlFor='password'>Пароль</label>
                        <input className='login__input'
                        required
                        type='password'
                        name='password'
                        id='password'
                        minLength='6'
                        maxLength='30'
                        value={values.password || ''}
                        onChange={handleChange}
                        />
                        <span className='login__input-error'>{errors.password || ''}</span>
                    
                    <button className={`login__button ${!isValid && 'login__button_disabled'}`} type='submit' onSubmit={handleSubmit} disabled={!isValid}>Войти</button>        
                </form>
                <div className='login__wrapper'>
                    <p className='login__text'>Ещё не зарегистрированы?</p>
                    <Link to='/signup' className='login__link'>Регистрация</Link>
                </div>
            </div>
        </div>
    );
}