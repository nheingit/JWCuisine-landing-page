import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Collapse, IconButton, Toolbar} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme)=> ({
  root:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito, Monospace'
  },
  appbar:{
    background: 'none',
  },
  appbarTitle:{
    flexGrow: '1',
  },
  textColorRed:{
    color: '#fc0303',
  },
  textColorBlack:{
    color: '#1c1b1b',
  },
  appbarWrapper:{
    width: '80%',
    margin: '0 auto',
  },
  icon:{
    color: '#fff',
    fontsize: '2rem',
  },
  title:{
    color: '#fff',
    fontSize: '4.5rem',
  },
  container:{ 
    textAlign: 'center',
  },
  downArrow:{
    fontSize: '5rem',
    color: '#1c1b1b'
  },

}));
export default function Header(){
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(()=> {setChecked(true);},[])
  return (
  <div className={classes.root}>
<AppBar className={classes.appbar} elevation={0}>
  <Toolbar className={classes.appbarWrapper}>
    <h1 classname={classes.appbarTitle}><span className={classes.textColorBlack}>J.W.</span><span className={classes.textColorRed}>Cuisine</span></h1>
      <IconButton>
        <sortIcon className={classes.icon}/>
      </IconButton>
  </Toolbar>
</AppBar>
<Collapse in={checked}
{...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
<div className={classes.container}>
  <h1 className={classes.title}>Welcome to <br/>
    <span className={classes.textColorBlack}>J.W.</span><span className={classes.textColorRed}>Cuisine</span></h1>
    <IconButton>
      <ExpandMoreIcon className={classes.downArrow}/>
    </IconButton>
</div>
</Collapse>
  </div>
   );
 }