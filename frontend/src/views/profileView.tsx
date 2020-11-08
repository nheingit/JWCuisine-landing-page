import React from "react";
import {gql} from "apollo-boost";
import { Query } from "react-apollo";

import {MeQuery} from "../schemaTypes"
import { isNull } from "util";

const meQuery = gql`
query MeQuery{
    me {
    email
    id
        }
}
`;

export default function profileView(){
    return(
    <Query<MeQuery> query={meQuery}>
        {({data, loading})=>{
            if(loading){
                return null
            }
            if(!data){
                return <div>data is null</div>
            }

            if(!data.me){
                return <div>recieved no user</div>
            }
        return<div>{data.me.email}</div>


    }}
    </Query>
    
    )}

    