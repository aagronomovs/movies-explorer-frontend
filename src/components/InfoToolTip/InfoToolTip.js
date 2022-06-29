import React from 'react';
import './InfoToolTip.css';

export default function InfoToolTip({ isOpen, onClose, message }) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container'>
                <button
                className='popup__close-button'
                type='button'
                aria-label='Закрыть окно'
                onClick={onClose}
                ></button>
                <p className='popup__text'>{message}</p>
            </div>
        </div>
    );
}