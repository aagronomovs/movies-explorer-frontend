import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';

function App() {
  return (
    <div className="page">
      <Header />
      <Promo />
      <NavTab />
      <AboutProject />
       <Routes>
         <Route path='/' exact></Route>
           </Routes> 
      
    </div>
  );
}

export default App;
