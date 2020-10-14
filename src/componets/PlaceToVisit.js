import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import FoodCardImage from "./FoodCardImage";
import recipes from "../static/recipe";


const useStyles = makeStyles((theme) => ({
    root:{
        height:'100vh',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

}));
export default function(){
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <FoodCardImage prop={recipes[0]} />
            <FoodCardImage prop={recipes[1]} />
        </div>
    )
}