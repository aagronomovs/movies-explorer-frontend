import React from 'react';
import { Link } from "react-router-dom";
import './Navigation.css';
import profile_icon from '../../images/profile_icon.svg';


export default function Navigation({loggedIn}) {
   
    return ( 
      <div className='navigation'>
            {!loggedIn ? (
                <>
                    <Link to='/signup' className='button__registration'>Регистрация</Link>
                    <Link to='/signin' className='button__login'>Войти</Link>
                </>
            ) : (
                <>
                    <div className='navigation__menu'>
                        <Link to='/movies' className='navigation__link' target='_self'>Фильмы</Link>
                        <Link to='/saved-movies' className='navigation__link' target='_self'>Сохранённые фильмы</Link>
                    </div>
                    
                      <Link to='/profile' target='_self'>
                        <button className='button__account'>
                            <img src={ profile_icon } alt='Иконка аккаунта' />
                        </button>
                      </Link>  
                    
                </>
            )}
      </div>

    );
}