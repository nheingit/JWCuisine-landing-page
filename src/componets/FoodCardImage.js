import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 645,
    background: 'rgba(0,0,0,0.5)',
    margin: "1rem"
  },
  media: {
    height: 440,
  },
  title:{
      fontFamily: 'Nunito',
      fontWeight: 'bold',
      fontSize: '2rem',
      color:'#fff',
  },
  desc:{
      fontFamily: 'nunito',
      fontSize: '1.1rem',
      color: '#ddd',
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
          <Typography gutterBottom variant="h5"
           component="h1"
            className={classes.title}
            >
            {prop.title}
          </Typography>
          <Typography variant="body2"
           color="textSecondary"
            component="p"
             className={classes.desc}
             >
            {prop.description}
          </Typography>
        </CardContent>
    </Card>
  );
}
