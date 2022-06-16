import React from 'react';
import './NavTab.css';


export default function NavTab() {
    return ( 
        <section className='navtab'>
            <nav className='navtab__container'>
                <a href='#aboutProject' className='navtab__link'>О проекте</a>
                <a href='#techs' className='navtab__link'>Технологии</a>
                <a href='#aboutMe' className='navtab__link'>Студент</a>
            </nav>
        </section>
    )
}