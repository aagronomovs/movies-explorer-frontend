import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  return (
    <div className="page">
      <Header />
        <Routes>
          <Route path='/' exact>
            <Main />
          </Route>

          <Route path='/movies'>
            <Movies />
          </Route>

          <Route path='/saved-movies'>
            <SavedMovies />
          </Route>
      
      </Routes>
      <Footer />
             
    </div>
  );
}

export default App;
