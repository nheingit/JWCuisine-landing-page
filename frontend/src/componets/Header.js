import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,  Toolbar, Collapse, IconButton, } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import NavigationBar from './Navbar';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import "../index.css"

const useStyles = makeStyles((theme)=> ({
  root:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    fontFamily: 'Nunito, Monospace'
  },
   applicationbar:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20vh',
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

  }


}));

export function ApplicationBar(){
    const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(()=> {setChecked(true);},[])

  return(
    <div className={classes.applicationbar}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
            <h1 className={classes.appbarTitle}>
            <a href="/" className={classes.appbarTitle}>
             <span className={classes.headerText}>J.W.<span className={classes.textColorRed}>Cuisine</span></span>
            </a> 
         </h1> 
         <LoginButton className={classes.userLogButtons}/>
        <LogoutButton className={classes.userLogButtons}/>
        </Toolbar>
      </AppBar>
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
