import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

export default function Header({loggedIn}) {
    const routes = useLocation();

    return ( 
        <header className={`${!loggedIn || routes.pathname === '/' ? 'header' : 'header_black'}`} >
            <div className='header__container'>
                <Link to='/' className='header__link' target='_self'>
                    <img className ='header_logo' src = {logo} alt = "Логотип" />
                </Link>
                {loggedIn ? (
                    <Navigation />
                 ) : (
                    <nav className='header__navigation'>
                        <Link to='/signup' className='header__registration header__link' target='_self'>Регистрация</Link>
                        <Link to='/signin'>
                            <button className='header__login-button header__link' target='_self'>Войти</button>
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}
