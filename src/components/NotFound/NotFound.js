import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className='error'>
            <div className='error__container'>
                <h2 className='error__title'>404</h2>
                <p className='error__text'>Страница не найдена</p>
                <Link to='/' className='error__link'>Назад</Link>
            </div>
        </div>
    );
}