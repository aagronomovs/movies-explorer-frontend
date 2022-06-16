import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Header.css';

export default function Header() {
    return ( 
        
        <header className = "header" >
            <div className='header__container'>
                <Link to='/' className='header__link'>
            <img className ='header_logo' src = {logo} alt = "Логотип" />
            </Link>
            <nav className='header__navigation'>
                <Link to='/signup' className='header__registration header__link'>Регистрация</Link>
                <Link to='/signin'>
                <button className='header__login-button header__link'>Войти</button>
                </Link>
            </nav>
            </div>
        </header>
    );
}
