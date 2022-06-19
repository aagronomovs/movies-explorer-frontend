import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />
       <Routes>
         <Route path='/' exact></Route>
           </Routes> 
      
    </div>
  );
}

export default App;
