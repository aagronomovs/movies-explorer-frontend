import React, { useContext, useState } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { CurrentUser } from '../../contexts/CurrentUserContext';

export default function Profile({ handleLogout, loggedIn, changeProfileInfo }) {
    const currentUser = useContext(CurrentUser);
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const changed = currentUser.email === email && currentUser.name === name;

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        changeProfileInfo({ name, email });
    }

    return (
        <section className='profile'>
            <div className='profile__container'>
                <h2 className='profile__header'>Привет, {currentUser && currentUser.name}!</h2>
                <form className='profile__form' onSubmit={handleSubmit}>
                    <label className='profile__label' htmlFor='name'>Имя
                    <input
                    required
                    className='profile__input'
                    id='name'
                    type='text'
                    name='name'
                    value={name}
                    onChange={handleChangeName}
                    />
                    </label>
                    <label className='profile__label' htmlFor='email'>E-mail
                    <input
                    required
                    className='profile__input'
                    id='email'
                    type='text'
                    name='email'
                    value={email}
                    onChange={handleChangeEmail}
                    />
                    </label>
                </form>
                <button className='profile__button' type='submit' disabled={changed} onSubmit={handleSubmit}>Редактировать</button>
                <Link to='/signin' className='profile__logout-link' onClick={handleLogout}>Выйти из аккаунта</Link>
            </div>
        </section>
    );
}