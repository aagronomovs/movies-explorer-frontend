import React from 'react';
import './Promo.css';
import landing from '../../images/landing.png';

export default function Promo() {
    return ( 
        
        <section className = "promo" >
            <div className='promo__container'>
                <img src={landing} className='promo__image' alt='Логотип Яндекс.Практикум' />
                <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
            </div>
        </section>
    );
}
