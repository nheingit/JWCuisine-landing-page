import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from './Typography'
import { withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=>({
    backGround: {
    minHeight: '25vh',
    display: 'cover',
    overflow: 'hidden',
    backgroundColor: 'rgba(5, 5, 5, 1)',
    backgroundRepeat: "no-repeat",
    backgroundSize:"cover",
    }
}));

const AboutJoseph = () => {
const classes = useStyles();
return (
    <div className={classes.backGround}>
        <Typography style={{color: '#fff', fontFamily: 'Nunito '}} variant="h6">
            Chef Joseph has over 16 years of experience in the hospitality industry and culinary arts,
            and now brings his passion and joy of cooking from the corporate world of hospitality into 
            meals that can be enjoyed from the comforts of home. From the young age of 14 Chef Joseph gained an interest
            and passion in cooking, both for himself and for others. This amplified as he went to Culinary School and graduated
            with honors. He has worked in multiple fine dining concepts as well as catering, hotels, casual dining, and private events. 
            Whether it's making a meal for the whole family to enjoy, or planning an epic multiple course meal for a romantic night in, Chef has you covered.
            At J.W.Cuisine we are all about creating memories and giving time back to those that need it most, 
            which is everyone! From our kitchen to your table, we hope you enjoy it. Bon Appetit!
        </Typography>
    </div>
)
}
export default AboutJoseph;