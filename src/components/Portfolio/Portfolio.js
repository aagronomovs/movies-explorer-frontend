import React from 'react';
import './Portfolio.css';

export default function Portfolio() {
    return ( 
        
        <section className='portfolio' >
            <div className='portfolio__container'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <nav>
                <ul className='portfolio__list'>
                    <li className='portfolio__item'>
                        <p className='portfolio__item-name'>Статичный сайт</p>
                        <a className='portfolio__item-link' href='https://github.com/aagronomovs/how-to-learn' target="_blank" rel='noreferrer'>
                            <p className='portfolio__symbol'>↗</p>
                        </a>
                    </li>
                    <li className='portfolio__item'>
                        <p className='portfolio__item-name'>Адаптивный сайт</p>
                        <a className='portfolio__item-link' href='https://github.com/aagronomovs/russian-travel' target="_blank" rel='noreferrer'>
                            <p className='portfolio__symbol'>↗</p>
                        </a>
                    </li>
                    <li className='portfolio__item'>
                        <p className='portfolio__item-name'>Одностраничное приложение</p>
                        <a className='portfolio__item-link' href='https://github.com/aagronomovs/react-mesto-api-full' target="_blank" rel='noreferrer'>
                            <p className='portfolio__symbol'>↗</p>
                        </a>
                    </li>
                </ul>
            </nav>
            </div>          
        </section>
    );
}