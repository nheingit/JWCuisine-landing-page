
import React from 'react';
import { IconButton, Grid, Typography } from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import {makeStyles, ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import '../index.css';

const theme = createMuiTheme();

theme.typography.h2 = {
  fontSize: '1.3rem',
  '@media (min-width:600px)': {
    fontSize: '1.6rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
  fontFamily: 'Nunito',
  color: '#fff',
};
theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
  fontFamily: 'Nunito',
  color: '#fff',
};

const useStyles = makeStyles((theme)=> ({
    footer:{
        bottom: "0px",
        width: "100%",
        Height: "15vh",
        backgroundColor: '#1c1b1b',
    },
    gridContainer:{
        backgroundColor: '#1c1b1b',
        height: '100%'
    },
    faceBook:{
        color: '#2d4ee0',
        
    },
    footerText:{
        fontFamily: 'Nunito',
        color: '#fff',
    },
    redText:{
        color:'#ff0000',
    },
    tab:{
        tabSize: 8,
        fontFamily: 'nunito',
    },
    
  }));

export default function SocialFollow(){
    const classes = useStyles();
    return(
        <div className={classes.footer} id='footer'>
        <ThemeProvider theme={theme}>
            <Grid direction = 'row' container spacing={0} justify='space-evenly' alignItems='center' className={classes.gridContainer}>
                <Grid item>
                    <IconButton size="medium" href='https://www.facebook.com/JWCuisine-132752860237120'>
                        <FacebookIcon fontSize="large" className={classes.faceBook} />
                    </IconButton>
                </Grid>
                
                <Grid item>
                    <Typography variant='h2'><span className={classes.redText}>J.W.</span>Cuisine</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h3'> Email: JWCuisine@gmail.com</Typography>
                    <Typography variant='h3'> Phone: (210)-717-1805</Typography>
                </Grid>
            </Grid>
        </ThemeProvider>
        </div>
      
    );
}