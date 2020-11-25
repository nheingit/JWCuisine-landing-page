import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../componets/Typography'

const styles = (theme) => ({
  root: {
    display: 'cover',
    overflow: 'hidden',
    backgroundColor: 'rgba(94, 2, 2, 0.65)',
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
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
function RecipeValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src={process.env.PUBLIC_URL+ "./assets/productCurvyLines.png"}
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={process.env.PUBLIC_URL+ "./assets/walletIcon.png"}
                alt="wallet"
              />
              <Typography variant="h6" style={{color: '#fff'}} className={classes.title}>
                The Highest Quality
              </Typography>
              <Typography style={{color: '#dddd', fontFamily: 'Nunito '}} variant="h5">
                {'The money you spend goes towards purchasing the highest quality ingredients '}
                {'from local and sustainable sources'}
                {', so you can feel good not only about what you eat, but what you buy'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={process.env.PUBLIC_URL+ "./assets/chefHatIcon.png"}
                alt="chefHat"
              />
              <Typography variant="h6" style={{color: '#fff'}} className={classes.title}>
                 Delicious easy meals
              </Typography>
              <Typography variant="h5" style={{color: '#dddd', fontFamily: 'Nunito '}} >
                {'With a recipe created by chef Joseph, just follow instructions and enjoy '}
                {'for easy meals you thought impossible'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={process.env.PUBLIC_URL+ "./assets/menuIcon.png"}
                alt="clock"
              />
              <Typography variant="h6" style={{color: '#fff'}} className={classes.title}>
                Diverse menu
              </Typography>
              <Typography variant="h5" style={{color: '#dddd', fontFamily: 'Nunito '}}> 
                {'chef Joseph spent a lot of time thinking of delicious, and diverse dietary options'}
                {'that can be substitutied for various ingredients to suit your own personal needs'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

RecipeValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeValues);