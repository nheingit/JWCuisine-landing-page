import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from './Typography'



const styles = (theme) => ({
  root: {
    minHeight: '100vh',
    display: 'cover',
    overflow: 'hidden',
    backgroundColor: 'rgba(16, 34, 101, 1)',
    backgroundRepeat: "no-repeat",
    backgroundSize:"cover",
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(10),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});
function AboutJoseph(props) {
  const { classes } = props;

  return (
    <section className={classes.root} id='recipe-values'>
      <Container className={classes.container}>
        <img
          src={process.env.PUBLIC_URL+ "./assets/productCurvyLines.png"}
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5} justify='center'>
          <Grid item xs={12} md={4}>
          <img src={process.env.PUBLIC_URL+ "./assets/chefHatIcon.png"}/>
           <Typography variant="h5" style={{color: '#fff'}} className={classes.title}>
             About the Chef
           </Typography>
          <hr/>
          <Typography style={{color: '#fff', fontFamily: 'Roboto '}} variant="h6">
            Chef Joseph has over 16 years of experience in the hospitality  industry and culinary arts,
            and now brings his passion and joy of cooking from the corporate world of hospitality into 
            meals that can be enjoyed from the comforts of home.<br/> From the young age of 14 Chef Joseph gained an interest
            and passion in cooking, both for himself and for others. This amplified as he went to Culinary School and graduated
            with honors. He has worked in multiple fine dining concepts as well as catering, hotels, casual dining, and private events.<br/>
            Whether it's making a meal for the whole family to enjoy, or planning an epic multiple course meal for a romantic night in, Chef has you covered.
            At  J.W.Cuisine we are all about creating memories and giving time back to those that need it most; 
            which is everyone! From our kitchen to your table, we hope you enjoy.<br/> Bon Appetit!
        </Typography>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

AboutJoseph.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutJoseph);