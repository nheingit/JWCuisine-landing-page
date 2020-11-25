import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Home from './routes/home';
import {CartProvider} from './hook/CartContext';
import loginView from "./routes/loginView"
import registerView from "./routes/registerView"
import Account from "./routes/Account";
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
   </Switch>
  </div> 
  <SocialFollow/>
  </CartProvider>
  );
  }
