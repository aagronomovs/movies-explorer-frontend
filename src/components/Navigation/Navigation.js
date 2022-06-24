import React from 'react';
import { Link } from "react-router-dom";
import icon_account from '../../images/icon_account.svg';
import './Navigation.css';

export default function Navigation() {
    const [isMenuOpened, setIsMenuOpened] = React.useState(false);

    function openMenu() {
      setIsMenuOpened(true);
    }
  
    function closeMenu() {
      setIsMenuOpened(false);
    }
  

    return ( 
      <>
      <nav className='menu__navigation'>
        <Link to='/movies' className='menu__link' target='_self'>Фильмы</Link>
        <Link to='/saved-movies' className='menu__link' target='_self'>Сохранённые фильмы</Link>
        <Link to='/profile' className='menu__link' target='_self'>Аккаунт</Link>
      </nav>
      <div className='menu__box'>
        <img className='menu__account-image' src={ icon_account } alt='Иконка аккаунта' />
      </div>
      <button className={`menu_open-button ${isMenuOpened ? 'close' : ''}`} onClick={openMenu} />
      <div className={`'menu__mobile' ${isMenuOpened ? 'active' : ''}`}>
        <button className='menu_close-button' onClick={closeMenu} />
        <nav className='menu__navigation_mobile'>
            <Link to='/' className='menu__link_mobile' target='_self'>Главная</Link>
            <Link to='/movies' className='menu__link_mobile' target='_self'>Фильмы</Link>
            <Link to='/saved-movies' className='menu__link_mobile' target='_self'>Сохранённые фильмы</Link>
        </nav>
        <div className='menu__box_mobile'>
            <Link to='/profile' className='menu__link' target='_self'>Аккаунт</Link>
            <div className='menu__account_mobile'>
                <img className='menu__account-image' src={ icon_account } alt='Иконка аккаунта' />
            </div>
        </div>
      </div>
      </>  
    );
}