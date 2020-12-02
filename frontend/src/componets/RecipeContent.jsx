import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Carousel from 'react-material-ui-carousel';
import recipes from '../static/recipes'
import RecipeCardImage from '../componets/RecipeCardImage';


const useStyles = makeStyles((theme)=>({
    backGround: {
    background: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    },
}));

const RecipeContent = () => {
const classes = useStyles();
return (
    <div className={classes.backGround}>
    <Carousel animation='slide'>{
        recipes.map(data=>(
            <RecipeCardImage prop={data}/>
        ))
    }</Carousel>
    </div>
)
}
export default RecipeContent;