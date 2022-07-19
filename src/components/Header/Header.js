import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

export default function Header({loggedIn}) {
    const routes = useLocation(); 

        return ( 
        
                <header className={`${!loggedIn || routes.pathname === '/' ? 'header' : 'header_black'}`}>
                    <div className='header__container'>
                        <Link to='/'>
                            <img src={logo} className='header__logo' alt='Логотип' />
                        </Link>
                        {!loggedIn ? ( 
                            <div className='header__navlink'>
                            <Navigation loggedIn={!loggedIn} />
                            </div>
                        ) : (
                            <>
                            <div className='header__navlink header__navlink__visible'>
                                <Navigation loggedIn={loggedIn} />
                            </div>
                           <BurgerMenu /> 
                           </>    
                        )
                    }
                        
                    </div>
                </header>
           
                
            

    );
}