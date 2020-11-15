import React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";

import {MeQuery} from "../schemaTypes"
import SubscribeUser from "./SubscribeUser";
import {meQuery} from "./graphql/me";
import ChangeCreditCard from './ChangeCreditCard';

export default function Account(){
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
            <ChangeCreditCard/>
        </div>
        )


    }}
    </Query>
    
    )}

    