import React from 'react';
import { Link, Route, Switch } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

export default function Header() {
    const [loggedIn, setLoggedIn] = React.useState(false);

    return ( 
        <Switch>
            <Route exact path='/'>
                <header className='header'>
                    <div className='header__container'>
                        <Link to='/'>
                            <img src={logo} className='header__logo' alt='Логотип' />
                        </Link>
                        <div className='header__navlink'>
                            <Navigation loggedIn={false} />
                        </div>
                    </div>
                </header>
            </Route>

            <Route exact path='/(movies|saved-movies|profile)'>
                <header className='header_black'>
                    <div className='header__container'>
                        <Link to='/'>
                            <img src={logo} className='header__logo' alt='Логотип' />
                        </Link>
                        <div className='header__navlink header__navlink__visible'>
                            <Navigation loggedIn={true} />
                        </div>
                        <BurgerMenu />
                    </div>
                    
                </header>
            </Route>
        </Switch>
    );
}