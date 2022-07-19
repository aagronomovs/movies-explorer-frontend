import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import ScreenSize from '../../hooks/useScreenSize';

export default function MoviesCardList({
    moviesList,
    message,
    handleDeleteMovie,
    handleSaveMovie,
    favouriteList,    
}) {
    const routes = useLocation();
    //число карточек для отображения
    const [count, setCount] = useState(0);
    //карточки
    const [cards, setCards] = useState(0);
    //ширина экрана
    const width = ScreenSize();
    
    //Добавление карточек при нажатии кнопки "Еще"
    function addCards() {
        setCount(count + cards);
      }

    // Эффект для отображения карточек на странице в зависимости от ширины экрана  
    useEffect(() => {
      if (routes.pathname === '/movies') {
        function getSize() {
          if (width >= 1280) {
            setCount(12);
            setCards(3);
          }
          if (width < 1280 && width > 767) {
            setCount(8);
            setCards(2);
          }
          if (width <= 767) {
            setCount(5);
            setCards(2);
          }
        }
        getSize();
      }
      }, [width]); 
      
    // cравнение сохраненных фильмов
    function isSaved(arr, movie) {
      return arr.find((item) => {
        return item.movieId === (movie.id || movie.movieId);
      });
    }

     // изменяем отображаемый массив фильмов в зависимости от ширины экрана
  //useEffect(() => {
    //if (moviesList.length) {
    //  const res = moviesList.filter((item, i) => i < cardsShowDetails.total);
    //  setShowMovieList(res);
   // }
 // }, [moviesList, cardsShowDetails.total]); 
  
  
    return (
        
        <div className='movies-card-list'>
            {message && 
            <p className='movies__message'>{message}</p>
            }
            <ul className='movies-card-list__grid'> 
                   {moviesList.map(movie => {
                    if (movie +1 <= count) {
                        return <MoviesCard
                            key={movie.id || movie._id}
                            movie={movie}
                            saved={isSaved(favouriteList, movie)}
                            handleDeleteMovie={handleDeleteMovie}
                            handleSaveMovie={handleSaveMovie}
                            />;
                    } else {
                        return '';
                    }
                   })}
                   
            </ul>
            {routes.pathname === '/movies' && 
            count < moviesList.length && !message && (
                <div className='movies-card-list__wrapper'>
                        <button className='movies-card-list__button-add' onClick={addCards}>Ещё</button>
                </div>    
            )}

        </div>
    );
}
             