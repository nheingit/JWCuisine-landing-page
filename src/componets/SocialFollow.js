
import React from 'react';
import { IconButton, Grid } from "@material-ui/core";
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import {makeStyles} from "@material-ui/core/styles";
import useWindowPosition from '../hook/useWindowPosition';

const useStyles = makeStyles((theme)=> ({
    gridContainer:{
        flexDirection: 'row',
        backgroundColor: '#1c1b1b',
        justifyContent: 'center',
    },
    Youtube:{
        color: '#d61a1a',
    },
    faceBook:{
        color: '#2d4ee0',
        
    },
    twitter:{
        color: '#1f96c2',
    },
    instagram: {
        color:'#b82ee6',
    },
    footerText:{
        fontFamily: 'Nunito',
        color: '#fff'
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
    const checked = useWindowPosition('footer');
    return(
        <div id='footer'>
            <Grid container spacing={0} className={classes.gridContainer}>
                <Grid>
                    <IconButton>
                        <YouTubeIcon className={classes.Youtube} />
                    </IconButton>
                </Grid>
                <Grid>
                    <IconButton href='https://www.facebook.com/JWCuisine-132752860237120'>
                        <FacebookIcon className={classes.faceBook} />
                    </IconButton>
                </Grid>
                <Grid>
                    <IconButton>
                        <InstagramIcon className={classes.instagram} />
                    </IconButton>
                </Grid>
                <Grid>
                    <IconButton>
                        <TwitterIcon className={classes.twitter} />
                    </IconButton>
                </Grid>
                <Grid>
                    <h3 className={classes.footerText}><span className={classes.redText}>J.W.</span>Cuisine</h3>
                </Grid>
                <Grid>
                    <h3 className={classes.footerText}><pre className={classes.tab}>       Contact Us:</pre></h3>
                </Grid>
                <Grid>
                    <h3 className={classes.footerText}><pre className={classes.tab}>                Email: jwcusine@gmail.com <br/>                Phone: (210)-717-1805  </pre></h3>
                </Grid>
                <Grid>
            </Grid>

            </Grid>
            
        </div>
      
    );
}