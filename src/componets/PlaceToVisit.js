import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import FoodCardImage from "./FoodCardImage";
import recipes from "../static/recipe";
import useWindowPosition from '../hook/useWindowPosition';
import { Grid } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
    root:{
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

        
    }
}));
export default function(){
    const classes = useStyles();
    const checked = useWindowPosition('header');
    return(
        <div className={classes.root} id='recipe-to-use'>
            <Grid container spacing={0} className={classes.gridContainer} justify='center'>
                <Grid item xs={12} sm={6} lg={4}>
            <FoodCardImage prop={recipes[0]} checked={checked}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
            <FoodCardImage prop={recipes[0]} checked={checked}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
            <FoodCardImage prop={recipes[0]} checked={checked}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
            <FoodCardImage prop={recipes[0]} checked={checked}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
            <FoodCardImage prop={recipes[0]} checked={checked}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
            <FoodCardImage prop={recipes[0]} checked={checked}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
            <FoodCardImage prop={recipes[0]} checked={checked}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
            <FoodCardImage prop={recipes[0]} checked={checked}/>
                </Grid>
           </Grid>

        </div>
    )
}