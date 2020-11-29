import React, {Fragment, useEffect, useState} from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {AppBar,  Toolbar, Collapse, IconButton, Grid, createMuiTheme, Typography, responsiveFontSizes } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import "../index.css"


const theme = createMuiTheme();

theme.typography.h2 = {
  fontSize: '3.75rem',
  fontFamily: 'Nunito',
  color: '#fff',
};
const useStyles = makeStyles((theme)=> ({
  backGround:{
    minHeight: '100vh',
    backgroundImage:`url(${process.env.PUBLIC_URL+ "./assets/bg.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize:"cover",
    position: "relative",
  },
  root:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    fontFamily: 'Nunito, Monospace'
  },
   applicationbar:{
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Nunito, Monospace'
  },
  
  appbar:{
    background: 'none',
    maxWidth: '100vw',
    justifyContent:'left',
  },
  appbarTitle:{
    flexGrow: '1',
  },
  textColorRed:{
    color: '#cf3121',
  },
  textColorWhite:{
    color: '#fff',
  },
  appbarWrapper:{
    width: '80%',
    margin: '0 auto',
  },
  icon:{
    color: '#1c1b1b',
    fontSize: '5vw'
  },
  title:{
    color: '#262626',
    fontSize: '8vw',
  },
  container:{ 
    textAlign: 'center',
  },
  downArrow:{
    fontSize: '5rem',
    color: '#1c1b1b'
  },
  headerText:{
    margin: '1rem',
  },
  userLogButtons:{
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  gridContainer:{
    display: 'flex',
    justifyContent: "flex-end"
  },
  headerFont:{
    fontFamily: 'nunito',
    fontSize: '3.75rem'
  },
  spacer:{
    backgroundImage:`url(${process.env.PUBLIC_URL+ "./assets/header-background-food.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize:"cover",
    width: '100%',
    height: '100px',
  },


}));

export function ApplicationBar(){
    const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(()=> {setChecked(true);},[])

  return(
    <Fragment>
    <div className={classes.spacer}></div>
    <div className={classes.applicationbar}>
     <ThemeProvider theme={theme}>
      <AppBar style={{position: 'fixed'}} className={classes.appbar} elevation={0}>
        <Toolbar>
        <Grid container
          spacing={2}
          direction="row"
          justify='space-between'
          alignItems='center'>
            <Grid item>
              <Typography variant='h3'>
                 <a href="/" className={classes.appbarTitle}>
                  J.W.<span className={classes.textColorRed}>Cuisine</span>
                </a> 
              </Typography>
            </Grid> 
          </Grid>
           <Grid item container justify='flex-end' alignItems='center'>
              <LoginButton/>
              <LogoutButton/>
           </Grid>
         
        </Toolbar>
      </AppBar>
     </ThemeProvider>
    </div>
    </Fragment>
  )
  }

export default function Header(){
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(()=> {setChecked(true);},[])

  

  return (
    <div className={classes.backGround}>
  <div className={classes.root} id='header'>

<Collapse in={checked}
{...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
<div className={classes.container}>
  <h1 className={classes.title}>Chef curated recipes<br/>
    <span className={classes.textColorBlack}>delivered</span><span className={classes.textColorRed}> to you</span></h1>
    <Scroll to='recipe-values' smooth={true}>
      <IconButton>
        <ExpandMoreIcon className={classes.downArrow}/>
      </IconButton>
    </Scroll>
</div>
</Collapse>
  </div>
  </div>
   );
 }
