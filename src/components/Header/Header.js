import React from 'react';
import { Link, Route, Routes } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

export default function Header({loggedIn}) {
        return ( 
        <Routes>
            <Route exact path='/' element={
                <header className='header'>
                    <div className='header__container'>
                        <Link to='/'>
                            <img src={logo} className='header__logo' alt='Логотип' />
                        </Link>
                        <div className='header__navlink'>
                            <Navigation loggedIn={loggedIn} />
                        </div>
                    </div>
                </header>
            } />
                
            

            <Route exact path='/(movies|saved-movies|profile)' element={
                <header className='header_black'>
                    <div className='header__container'>
                        <Link to='/'>
                            <img src={logo} className='header__logo' alt='Логотип' />
                        </Link>
                        <div className='header__navlink header__navlink__visible'>
                            <Navigation loggedIn={!loggedIn} />
                        </div>
                        <BurgerMenu />
                    </div>
                    
                </header>
            } >
            </Route>
        </Routes>
    );
}