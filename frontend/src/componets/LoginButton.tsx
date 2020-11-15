import React from 'react';
import {gql} from "apollo-boost";
import { Query } from "react-apollo";

import {MeQuery} from "../schemaTypes";
import '../index.css';
import {meQuery} from "./graphql/me";


export default function LoginButton(){
    return(
        <Query<MeQuery> fetchPolicy="network-only" query={meQuery}>
            {({data, loading})=>{
                if(loading){
                    return <div>fetching data</div>
                }
                if(!data){
                   return <div>data is null</div>
                }
                if(!data.me){
                    return(
                        <a href='/login'  className='button7'>
                            log in
                        </a>)
                }
         //Logout does nothing currently
            return null
             }}
            </Query>
       )
    
}