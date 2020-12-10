import React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

import {MeQuery} from "../schemaTypes"
import {meQuery} from "../componets/graphql/me";
import recipes from '../static/recipes';
import ChangeCreditCard from '../componets/graphql/mutations/ChangeCreditCard';
import CancelSubscription from "../componets/graphql/mutations/CancelSubscription";
import AddDishes from "../componets/graphql/mutations/AddDishes";
import FoodCardImagePurchase from '../componets/FoodCardImagePurchase';
import { useContext } from "react";
import { CartContext}  from '../hook/CartContext';

const useStyles = makeStyles((theme)=> ({
  backGround:{
    minHeight: '100vh',
    backgroundImage:`url(${process.env.PUBLIC_URL+ "./assets/bg.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize:"cover",
    position: "relative",
  },
  root: {
    minWidth: 275,
    marginTop: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '2vw'+400,
    color:'#fff'
  },
  pos: {
    marginBottom: 12,
    fontFamily: 'nunito',
    fontSize: '1.5vw'+400,
    color: '#ddd'
  },
}));

export default function Account(){

    const classes = useStyles();
    const subscriptionButtonStyle = {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        display: "grid"
    }

    const CardContentInGrid = (array: any) => (
        array.map((item: any) => (
            <Grid item xs={12} sm={6} lg={4}>
                <FoodCardImagePurchase prop={item}/>
            </Grid>
        )
    ))
  const [cart] = useContext(CartContext);



    return(
    <Query<MeQuery> fetchPolicy="network-only" query={meQuery}>
        {({data, loading})=>{
            if(loading){
                return <div className={classes.backGround}></div>
            }
            if(!data){
                return <div className={classes.backGround}>data is null</div>
            }

            if(!data.me){
                return( 
                   <Redirect to="/login"/>
                )
            }
            if(data.me.type==='free-trial'){
                return(<div className={classes.backGround} style={{justifyContent: 'flex-start', display: 'flex'}}>
                    <h3 style={{margin: 0}}>It looks like your subscription has run out!<br/>Please resubscribe <br/>
                    <a href='/' className='subscribeButton'>Go Home</a>
                    </h3></div>)
            }
        //if(data.me.type ==="paid")
        return (
        <div className={classes.backGround}>
            <h2 style={{margin: '0', fontFamily: 'nunito', color: 'rgba(0, 0, 0, 0.87)'}}>All changes made after Sunday at 7:00PM CST will not be in affect until the following week's deliveries</h2> <hr/>
            <h3 style={{margin: '0', fontFamily: 'nunito'}}>If your subscription is only for two recipes a week, only the top two in the menu will be submitted</h3>
            <Grid container spacing={3} justify='flex-start' alignItems='center' direction='row'>
                <Grid item xs={12} md={6} lg={4}>
                   <Card className={classes.root}>
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Profile Information
                       </Typography>
                       <Typography className={classes.pos} color="textSecondary">
                            The last 4 digits of the card on file: {data.me.ccLast4}
                      </Typography>
                    </CardContent>
                    <CardActions>
                        <ChangeCreditCard/>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                   <Card className={classes.root}>
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                          Dishes to be delivered this week
                       </Typography>
                            {cart.map(({name}: {name:String})=> <Typography className={classes.pos}> {name}</Typography>)}
                            <Grid container spacing={1} justify='flex-end'>
                             </Grid>
                    </CardContent>
                    <CardActions>
                      <AddDishes dishes={cart.map(({name}: {name:String})=> name)}/>
                    </CardActions>
                  </Card>
                </Grid>
            </Grid>
            <div style={subscriptionButtonStyle}>
                
                
            </div>
              <Grid container spacing={0} justify='center'>
                  {CardContentInGrid(recipes)}
            </Grid>
            <CancelSubscription/>
        </div>
        )


    }}
    </Query>
    
    )}

    