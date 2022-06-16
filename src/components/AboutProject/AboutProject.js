import React from 'react';
import './AboutProject.css';

export default function AboutProject() {
    return ( 
        
        <section className='project' >
            <div className='project__container'>
                <h2 className='project__title'>О проекте</h2>
                <div className='project__line'></div>
            </div>
            <ul className='project__list'>
                <li className='project__list-item'>
                    <h3 className='project__subtitle'>Дипломный проект включал 5 этапов</h3>
                    <p className='project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className='project__list-item'>
                    <h3 className='project__subtitle'>На выполнение диплома ушло 5 недель</h3>
                    <p className='project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p> 
                </li>
            </ul>
            <ul className='columns'>
                <li className='columns__list'>1 неделя</li>
                <li className='columns__list'>4 недели</li>
                <li className='columns__list'>Back-end</li>
                <li className='columns__list'>Front-end</li>
            </ul>

        </section>
    );
}
