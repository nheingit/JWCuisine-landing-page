import React from "react";
import {gql} from "apollo-boost";
import { Query } from "react-apollo";

import {MeQuery} from "../schemaTypes"
import { Link, Redirect } from "react-router-dom";
import SubscribeUser from "./SubscribeUser";

const meQuery = gql`
query MeQuery{
    me {
    email
    id
    type
        }
}
`;

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
        return<div>{data.me.type}</div>


    }}
    </Query>
    
    )}

    