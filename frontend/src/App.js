import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Home from './views/home';
import UserProfile from './views/user-profile';
import {CartProvider, CartContext} from './hook/CartContext';
import {useAuth0} from '@auth0/auth0-react';
import PrivateRoute from './componets/PrivateRoute';

const useStyles = makeStyles((theme)=> ({
  root:{
    minHeight: '100vh',
    backgroundImage:`url(${process.env.PUBLIC_URL+ "./assets/bg.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize:"cover",
  },
}));
export default function(){
  const classes = useStyles();
  const {isLoading} = useAuth0();

  return(
    
    <CartProvider>
   <div className={classes.root}>
   <CssBaseline />
   <Switch>
     <Route path="/"  exact component={Home}/>
     <PrivateRoute path='/profile' component={UserProfile}/>
   </Switch>
  </div>
  </CartProvider>
  );
  }