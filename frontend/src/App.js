import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Home from './views/home';
import UserProfile from './views/user-profile';
import {CartProvider, CartContext} from './hook/CartContext';
import {useAuth0} from '@auth0/auth0-react';
import PrivateRoute from './componets/PrivateRoute';
import loginView from "./views/loginView"
import registerView from "./views/registerView"
import Account from "./componets/Account";
import {ApplicationBar} from "./componets/Header";
import SocialFollow from './componets/SocialFollow';
const useStyles = makeStyles((theme)=> ({
  root:{
    minHeight: '100vh',
    backgroundImage:`url(${process.env.PUBLIC_URL+ "./assets/bg.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize:"cover",
    position: "relative",
  },
}));
export default function(){
  const classes = useStyles();
  const {isLoading} = useAuth0();

  return(
    
    <CartProvider>
   <div className={classes.root}>
   <CssBaseline />
   <ApplicationBar/>
   <Switch>
     <Route path="/"  exact component={Home}/>
     <Route path="/login" component={loginView}/>
     <Route path ="/register" component={registerView}/>
     <Route path="/account" component={Account}/>
     <PrivateRoute path='/profile' component={UserProfile}/>
   </Switch>
   
  </div> 
  <SocialFollow/>
  
 
  </CartProvider>
  );
  }
