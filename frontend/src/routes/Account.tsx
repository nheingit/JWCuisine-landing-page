import React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";

import {MeQuery} from "../schemaTypes"
import SubscribeUser from "../componets/graphql/mutations/SubscribeUser";
import {meQuery} from "../componets/graphql/me";
import ChangeCreditCard from '../componets/graphql/mutations/ChangeCreditCard';
import CancelSubscription from "../componets/graphql/mutations/CancelSubscription";

export default function Account(){

    const subscriptionButtonStyle = {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        display: "grid"
    }

    return(
    <Query<MeQuery> fetchPolicy="network-only" query={meQuery}>
        {({data, loading})=>{
            if(loading){
                return null
            }
            if(!data){
                return <div>data is null</div>
            }

            if(!data.me){
                return <div>
                            <Redirect to="/login"/>
                    </div>
            }
            if(data.me.type==='free-trial'){
                return(
                    <p>It looks like your subscription has run out!<br/>Please resubscribe
                        <SubscribeUser/>
                    </p>)
                    
            }
        //if(data.me.type ==="paid")
        return (
        <div>
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

    