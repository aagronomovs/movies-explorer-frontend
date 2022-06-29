import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

export default function Profile(props) {
    return (
        <section className='profile'>
            <div className='profile__container'>
                <h2 className='profile__header'>Привет, Анна!</h2>
                <form className='profile__form'>
                    <label className='profile__label' htmlFor='name'>Имя
                    <input
                    required
                    className='profile__input'
                    id='name'
                    type='text'
                    name='name'
                    value={props.name}
                    />
                    </label>
                    <label className='profile__label' htmlFor='email'>E-mail
                    <input
                    required
                    className='profile__input'
                    id='email'
                    type='text'
                    name='email'
                    value={props.email}
                    />
                    </label>
                </form>
                <button className='profile__button' type='submit'>Редактировать</button>
                <Link to='/signin' className='profile__logout-link'>Выйти из аккаунта</Link>
            </div>
        </section>
    );
}