import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Register() {
    return (
        <div className='register'>
            <div className='register__container'>
                <Link to='/' className='register__logo-link'>
                <img className='register__logo' src={logo} alt='логотип проекта' />
                </Link>
                <h2 className='register__title'>Добро пожаловать!</h2>
                <form className='register__form'>
                    <label className='register__label' htmlFor='name'>Имя</label>
                        <input className='register__input'
                        required
                        type='text'
                        id='name'
                        minLength='2'
                        maxLength='30'
                        />
                        <span className='register__input-error'></span>
                    
                    <label className='register__label' htmlFor='email'>E-mail</label>
                        <input className='register__input'
                        required
                        type='email'
                        name='email'
                        id='email'
                        minLength='6'
                        maxLength='30'
                        />
                        <span className='register__input-error'></span>
                        
                    <label className='register__label' htmlFor='password'>Пароль</label>
                        <input className='register__input'
                        required
                        type='password'
                        name='password'
                        id='password'
                        minLength='6'
                        maxLength='30'
                        />
                        <span className='register__input-error'></span>
                    
                    <button className='register__button' type='submit'>Зарегистрироваться</button>        
                </form>
                <div className='register__wrapper'>
                    <p className='register__text'>Уже зарегистрированы?</p>
                    <Link to='/signin' className='register__link'>Войти</Link>
                </div>
            </div>
        </div>
    );
}