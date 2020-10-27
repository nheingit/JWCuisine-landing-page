import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from './componets/Header';
import PlaceToVisit from './componets/PlaceToVisit';
import SocialFollow from './componets/SocialFollow';
import {CartProvider, CartContext} from './hook/CartContext';
import {useAuth0} from '@auth0/auth0-react';

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
  <Header />
    <PlaceToVisit />
    <SocialFollow />
  </div>
  </CartProvider>
  );
  }
