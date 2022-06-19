import React from 'react';
import './Footer.css';

export default function Footer() {
    return ( 
        
        <footer className='footer' >
            <div className='footer__container'>
                <h4 className='footer__info'>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
                <div className='footer__line'></div>
                <div className='footer__wrapper'>
                    <p className='footer__copyright'>&copy;{new Date().getFullYear()}</p>
                    <ul className='footer__list'>
                        <li className='footer__item'>
                            <a className='footer__link' href='https://practicum.yandex.ru' target="_blank" rel='noreferrer'>Яндекс.Практикум</a>
                        </li>
                        <li className='footer__item'>
                            <a className='footer__link' href='https://github.com' target="_blank" rel='noreferrer'>Github</a>
                        </li>
                        <li className='footer__item'>
                            <a className='footer__link' href='https://www.facebook.com/yandex.practicum/' target="_blank" rel='noreferrer'>Facebook</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}