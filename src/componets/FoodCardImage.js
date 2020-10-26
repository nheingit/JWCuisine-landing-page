import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {CardActions, Collapse, IconButton} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ReactCardFlip from 'react-card-flip';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { CartContext } from './CartContext';
const useStyles = makeStyles({
  root: {
    minHeight: '25vh',
    minWidth: '8vw',
    background: 'rgba(0,0,0,0.5)',
    margin: '2vw'
  },
  media: {
    minWidth: '8vw',
    minHeight: '25vh',

  },
  title:{
      fontFamily: 'Nunito',
      fontWeight: 'bold',
      fontSize: '2vw',
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

});

export default function MediaCard({prop, checked}) {
  const [cart, setCart] = useContext(CartContext);
  const classes = useStyles();
  const [isFlipped, setIsFlipped] = useState(false);
  const addToCart = () => {
    const recipe = {name: prop.title, price: prop.price, id: prop.id}
    setCart(items => [...items, recipe]);
  }
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  }
  const removeFromCart = ()=>{
    const recipe = {id: prop.id}
    const itemsToKeep = cart.filter(items =>( items.id !== recipe.id))
    const itemsToRemove = cart.filter(items =>( items.id === recipe.id))
    itemsToRemove.pop();
    const newCart = itemsToKeep.concat(itemsToRemove);
    setCart(newCart);
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
          <IconButton onClick={handleClick}>
            <AttachMoneyIcon className={classes.CardFlipper} />
            </IconButton>
        </CardActions>
    </Card>
          
        </div>
 
        <div>
<Card className={classes.root}>
        <CardContent className={classes.media}>
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
        <IconButton onClick={removeFromCart}>
            <RemoveShoppingCartIcon className={classes.removeShoppingCartIcon} />
         </IconButton>
        </CardActions>
        <CardActions>
          <IconButton onClick={addToCart}>
            <AddShoppingCartIcon className={classes.addShoppingCartIcon} />
          </IconButton>
        </CardActions>
        <CardActions>
          <IconButton onClick={handleClick}>
            <AttachMoneyIcon className={classes.CardFlipper} />
          </IconButton>
        </CardActions>
    </Card>
           </div>
      </ReactCardFlip>
      </Collapse>
    )
}















         
          
      
    
  
