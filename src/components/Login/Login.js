import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Login() {
    return (
        <div className='login'>
            <div className='login__container'>
                <Link to='/' className='login__logo-link'>
                <img className='login__logo' src={logo} alt='логотип проекта' />
                </Link>
                <h2 className='login__title'>Рады видеть!</h2>
                <form className='login__form'>
                                        
                    <label className='login__label' htmlFor='email'>E-mail</label>
                        <input className='login__input'
                        required
                        type='email'
                        name='email'
                        id='email'
                        minLength='6'
                        maxLength='30'
                        />
                        <span className='login__input-error'></span>
                        
                    <label className='login__label' htmlFor='password'>Пароль</label>
                        <input className='login__input'
                        required
                        type='password'
                        name='password'
                        id='password'
                        minLength='6'
                        maxLength='30'
                        />
                        <span className='login__input-error'></span>
                    
                    <button className='login__button' type='submit'>Войти</button>        
                </form>
                <div className='login__wrapper'>
                    <p className='login__text'>Ещё не зарегистрированы?</p>
                    <Link to='/signup' className='login__link'>Регистрация</Link>
                </div>
            </div>
        </div>
    );
}