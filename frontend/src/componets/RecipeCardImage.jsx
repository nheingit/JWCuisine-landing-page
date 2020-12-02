import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minHeight: '33vh',
    width: '100%',
    margin: '2vw'
  },
  media: {
    display: 'flex',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    height: '50vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
});

export default function MediaCard({prop}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={prop.imageUrl}
          title={prop.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {prop.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {prop.description}
          </Typography>
        </CardContent>
    </Card>
  );
}