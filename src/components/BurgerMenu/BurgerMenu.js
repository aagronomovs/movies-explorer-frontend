import React from 'react';
import './BurgerMenu.css';
import icon__menu from '../../images/icon__menu.svg';
import menu_close from '../../images/menu_close.svg';
import  profile_icon from '../../images/profile_icon.svg';
import { Link } from 'react-router-dom';

export default function BurgerMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuOpenClassName = `burgerMenu_open ${isMenuOpen ? "burgerMenu_open_active" : ""}`;

    function handleMenuClick() {
        if (!isMenuOpen) {
            setIsMenuOpen(true);
        } else setIsMenuOpen(false);
    }


    return (
        <>
            <section className='burgerMenu'>
                <button className='burgerMenu__button' onClick={handleMenuClick}>
                    <img src={icon__menu} alt='Кнопка меню' />
                </button>
            </section>

            <section className={menuOpenClassName}>
                <div className='burgerMenu__overlay'></div>
                <div className='burgerMenu__container'>
                    <button className='burgerMenu__button_close' onClick={handleMenuClick}>
                        <img src={menu_close} alt='Кнопка крестик' />
                    </button>
                    <div className='burgerMenu__links'>
                        <Link to='/' className='burgerMenu__link'>Главная</Link>
                        <Link to='/movies' className='burgerMenu__link'>Фильмы</Link>
                        <Link to='/saved-movies' className='burgerMenu__link'>Сохранённые фильмы</Link>
                    </div>
                    <button className='burgerMenu__button-account'>
                        <img src={ profile_icon} alt='Кнопка аккаунт' />
                    </button>
                </div>
            </section>
        </>
    );
}