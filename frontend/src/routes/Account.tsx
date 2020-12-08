import React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';

import {MeQuery} from "../schemaTypes"
import { Grid } from '@material-ui/core';
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
  const [cart, setCart] = useContext(CartContext);



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
            <div>the last 4 digits of your card are: {data.me.ccLast4}</div>
            <div style={subscriptionButtonStyle}>
                <ChangeCreditCard/>
                <CancelSubscription/>
                <AddDishes dishes={cart.map(({name}: {name:String})=> name)}/>

                {console.log('cart contains: ', cart)}
                {cart.map(({name}: {name:String})=> name)}
            </div>
              <Grid container spacing={0} justify='center'>
                  {CardContentInGrid(recipes)}
            </Grid>
        </div>
        )


    }}
    </Query>
    
    )}

    