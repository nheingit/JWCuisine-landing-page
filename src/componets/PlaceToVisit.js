import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import FoodCardImage from "./FoodCardImage";
import recipes from "../static/recipe";
import useWindowPosition from '../hook/useWindowPosition';


const useStyles = makeStyles((theme) => ({
    root:{
        height:'100vh',
        display:'flex',
        //not really sure what this does quite yet: justifyContent: 'center',
        alignItems: 'center',
    },

}));
export default function(){
    const classes = useStyles();
    const checked = useWindowPosition('header');
    return(
        <div className={classes.root} id='recipe-to-use'>
            <FoodCardImage prop={recipes[0]} checked={checked} />
            <FoodCardImage prop={recipes[1]} checked={checked}/>
        </div>
    )
}