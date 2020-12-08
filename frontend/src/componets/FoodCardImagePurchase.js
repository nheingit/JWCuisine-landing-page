import React, { useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {CardActions, IconButton} from '@material-ui/core';
import { CartContext}  from '../hook/CartContext';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles({
  root: {
    minHeight: '70vh',
    minWidth: '8vw',
    background: 'rgba(0,0,0,0.5)',
    margin: '2vw'
  },
  cardActions:{
    display: 'flex',
    margin: '2vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  media: {
    minWidth: '8vw',
    minHeight: '40vh',

  },
  title:{
      fontFamily: 'Nunito',
      fontWeight: 'bold',
      fontSize: '2vw'+400,
      color:'#fff',
  },
  desc:{
      fontFamily: 'nunito',
      fontSize: '1.5vw'+400,
      color: '#ddd',
  },
  addShoppingCartIcon:{
    color:'#00ff00',
    fontSize: '4vh'
  },
  removeShoppingCartIcon:{
    color:'#FF0000',
    fontSize: '4vh',
  },
  CardFlipper:{
    fontSize: '4vh',
    color: '#1c1b1b',
  },
  iconButton:{
    background: "rgba(0,0,0,0.5)",
    "&:hover":{
      background: "rgba(0,0,0,0.5)",
      backgroundColor: "rgba(0,0,0,0.5)"
    },
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: "50%",
    disableFocusRipple: "true",
  }

});

export default function MediaCard({prop}) {
  const [cart, setCart] = useContext(CartContext);
  const classes = useStyles();
  const [isFlipped, setIsFlipped] = useState(false);

  const addToCart = () => {
    if(cart.length <4){
      const recipe = {name: prop.title}
    setCart(items => [...items, recipe]);
          }
    }
    

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  }

  const removeFromCart = ()=>{
    const recipe = {name: prop.title}
    const itemsToKeep = cart.filter(items =>( items.name !== recipe.name))
    const itemsToRemove = cart.filter(items =>( items.name === recipe.name))
    itemsToRemove.pop();
    const newCart = itemsToKeep.concat(itemsToRemove);
    setCart(newCart);
    console.log(cart);
  }

  return (
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
        <CardActions className={classes.cardActions}>
          <Typography variant='h5'
          color='textSecondary'
          component='h1'
          className={classes.title}>
          {prop.timeToMake}
          <IconButton onClick={addToCart}>
            <AddCircleIcon/>
          </IconButton>
          <IconButton onClick={removeFromCart}>
            <RemoveCircleIcon/>
          </IconButton>
          </Typography>
        </CardActions>
    </Card>
    </div>
    )
}















         
          
      
    
  
