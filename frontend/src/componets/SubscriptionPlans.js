import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import FoodCardImage from "./FoodCardImage";
import subscriptions from "../static/subscriptionPlans";
import useWindowPosition from '../hook/useWindowPosition';
import RecipeContent from '../componets/RecipeContent';
import { Grid } from '@material-ui/core';
import '../index.css';




const useStyles = makeStyles((theme) => ({
    root:{
        Width: '100vw',
        backgroundImage:`url(${process.env.PUBLIC_URL+ "./assets/subscription-plan-background.jpg"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize:"cover",
        minHeight:'100vh',
        display:'flex',
        justify: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('md')]:{
            flexDirection:'column, 2',
        }
    },
    gridContainer:{
        justifyContent: 'center',
        padding: '10px',
        height: '100%',
        width: '100%'
    }
}));


export default function(){
    const ContentCards = ({array}) => {
        const checked = useWindowPosition('header')

        return(
                    array.map(data=>(
                    <Grid item xs={12} sm={6} lg={4}>
                <FoodCardImage prop={data} checked={checked}/>
                    </Grid>
                    ))
                )
    };
    const classes = useStyles();
    const checked = useWindowPosition('header');
    return(
        <div className={classes.root} id='recipe-to-use'>
            <Grid container spacing={0} className={classes.gridContainer} justify='center'>
                <ContentCards array={subscriptions}/>
                <Grid container justify="center" className={classes.gridContainer}>
                    <RecipeContent/>
                </Grid>
            </Grid>
            
        </div>
                
        
    )
}