import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {CardActions, Collapse, IconButton} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ReactCardFlip from 'react-card-flip';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles({
  root: {
    minHeight: '20vh',
    minWidth: '15vw',
    background: 'rgba(0,0,0,0.5)',
    margin: "6vw"
  },
  media: {
    minWidth: '15vw',
    minHeight: '15vh',

  },
  title:{
      fontFamily: 'Nunito',
      fontWeight: 'bold',
      fontSize: '2vw',
      color:'#fff',
  },
  desc:{
      fontFamily: 'nunito',
      fontSize: '1.5vw',
      color: '#ddd',
  },
  shoppingCartIcon:{
    color:'#00ff00',
    fontSize: '4vh'
  },
  CardFlipper:{
    fontSize: '4vh',
    color: '#1c1b1b',
  },

});

export default function MediaCard({prop, checked}) {
  const classes = useStyles();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  }

  return (
    
   <Collapse in={checked }   {...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div>
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
        <CardActions>
          <IconButton>
            <AttachMoneyIcon className={classes.CardFlipper} onClick={handleClick} />
            </IconButton>
        </CardActions>
    </Card>
          
        </div>
 
        <div>
<Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5"
           component="h1"
            className={classes.title}
            >
            {prop.purchaseTitle}
          </Typography>
          <Typography variant="body2"
           color="textSecondary"
            component="p"
             className={classes.desc}
             >
            {prop.purchaseDescription}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton>
            <AddShoppingCartIcon className={classes.shoppingCartIcon}/>
          </IconButton>
        </CardActions>
    </Card>


          <IconButton>
            <AttachMoneyIcon className={classes.CardFlipper} onClick={handleClick} />
            </IconButton>
           </div>
      </ReactCardFlip>
      </Collapse>
    )
}















         
          
      
    
  
