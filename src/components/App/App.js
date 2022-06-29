import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import InfoToolTip from '../InfoToolTip/InfoToolTip';


function App() {
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState('');
 // const navigate = useNavigate();
  const routes = useLocation();

  const isHeader =
    routes.pathname === '/' ||
    routes.pathname === '/movies' ||
    routes.pathname === '/saved-movies' ||
    routes.pathname === '/profile';

  const isFooter =
    routes.pathname !== '/profile' && 
    routes.pathname !== '/signin' && 
    routes.pathname !== '/signup' &&
    routes.pathname !== '/*';  

  //Закрыть модальное окно  
  function closeInfoToolTip() {
    setIsInfoTooltipOpen(false)
  }  
    

  return (
    
    <div className='page'>
      {isHeader && <Header  />}
      
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
         
          <Route path='/movies'>
            <Movies />
          </Route>

          <Route path='/saved-movies'>
           <SavedMovies />
          </Route> 

          <Route path='/profile'>
            <Profile />
          </Route>

          <Route path='/signup'>
            <Register />  
           </Route>   

          <Route path='/signin'>
            <Login />
          </Route>

          <Route path='/*'>
            <NotFound />
          </Route>
        
      </Switch>
      {isFooter && <Footer />}
      <InfoToolTip isOpen={isInfoToolTipOpen} onClose={closeInfoToolTip} message={infoTooltipMessage} />
          
    </div>
  );
}

export default App;
