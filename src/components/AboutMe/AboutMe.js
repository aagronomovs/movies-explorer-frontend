import React from 'react';
import './AboutMe.css';
import myfoto from '../../images/myfoto.jpg';

export default function AboutMe() {
    return ( 
        
        <section className='student' >
            <h2 className='student__title'>Студент</h2>
            <div className='student__line'></div>
            <article className='student__container'>
                <div className='student__wrapper'>
                    <h2 className='student__subtitle'>Анна</h2>
                    <h3 className='student__about'>Фронтенд-разработчик, 37 лет</h3>
                    <p className='student__text'>Я живу в Москве, по образованию лингвист-переводчик. Я замужем, трое детей. 
                    Последние 10 лет занималась маркетингом, в том числе работой с сайтом - писала новости, создавала продуктовые страницы, слайдеры, перевела сайт на английский язык.
                    Решила заняться фронтенд-разработкой, стало интересно узнать как это работает изнутри.</p>
                    <div className='student__links'>
                        <a className='student__link' href='https://www.facebook.com/aagronomovs' target='_blank' rel="noopener noreferrer">Facebook</a>
                        <a className='student__link' href='https://github.com/aagronomovs' target='_blank' rel="noopener noreferrer">Github</a>
                    </div>
                </div>
                <img className='student__image' src={myfoto} alt='фото' />
            </article>
           
        </section>
    );
}