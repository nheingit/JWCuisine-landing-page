import React, {useEffect, useState} from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {AppBar,  Toolbar, Collapse, IconButton, Grid, createMuiTheme, Typography, responsiveFontSizes } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import "../index.css"


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

theme.typography.h2 = {
  fontSize: "3.75rem",
  [theme.breakpoints.up('md')]: {
    fontSize: '3.75rem',
  },
  fontFamily: 'Nunito',
  color: '#fff',
};
const useStyles = makeStyles((theme)=> ({
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
    color: '#fff',
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerFont:{
    fontFamily: 'nunito',
    fontSize: '3.75rem'
  },


}));

export function ApplicationBar(){
    const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(()=> {setChecked(true);},[])

  return(
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
            <Typography fontSize={classes.headerFont} variant='h2'>
             <a href="/" className={classes.appbarTitle}>
              J.W.<span className={classes.textColorRed}>Cuisine</span>
            </a> 
           </Typography>
          </Grid> 
           <Grid item>
              <LoginButton className={classes.userLogButtons}/>
              <LogoutButton className={classes.userLogButtons}/>
            </Grid>
         </Grid>
        </Toolbar>
      </AppBar>
     </ThemeProvider>
    </div>
  )
  }

export default function Header(){
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(()=> {setChecked(true);},[])

  

  return (
  <div className={classes.root} id='header'>

<Collapse in={checked}
{...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
<div className={classes.container}>
  <h1 className={classes.title}>Welcome to <br/>
    <span className={classes.textColorBlack}>J.W.</span><span className={classes.textColorRed}>Cuisine</span></h1>
    <Scroll to='recipe-to-use' smooth={true}>
      <IconButton>
        <ExpandMoreIcon className={classes.downArrow}/>
      </IconButton>
    </Scroll>
</div>
</Collapse>
  </div>
   );
 }
