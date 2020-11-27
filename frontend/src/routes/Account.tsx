import React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';

import {MeQuery} from "../schemaTypes"
import SubscribeUser from "../componets/graphql/mutations/SubscribeUser";
import {meQuery} from "../componets/graphql/me";
import ChangeCreditCard from '../componets/graphql/mutations/ChangeCreditCard';
import CancelSubscription from "../componets/graphql/mutations/CancelSubscription";


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
                return(<div className={classes.backGround}>
                    <p>It looks like your subscription has run out!<br/>Please resubscribe
                        <SubscribeUser/>
                    </p></div>)
                    
            }
        //if(data.me.type ==="paid")
        return (
        <div className={classes.backGround}>
            <div>the last 4 digits of your card are: {data.me.ccLast4}</div>
            <div style={subscriptionButtonStyle}>
                <ChangeCreditCard/>
                <CancelSubscription/>
            </div>
        </div>
        )


    }}
    </Query>
    
    )}

    