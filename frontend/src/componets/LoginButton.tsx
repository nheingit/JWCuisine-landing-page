import React from 'react';
import { Query } from "react-apollo";

import {MeQuery} from "../schemaTypes";
import '../index.css';
import {meQuery} from "./graphql/me";


const LoginButton = () =>{
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
                        <div>
                            <a href='/login'  className='button7'>
                               LOG IN
                            </a> 
                            <a href='/register'  className='button2'>
                              REGISTER
                            </a>
                        </div>)
                }
         //Logout does nothing currently
            return null
             }}
            </Query>
       )
    
}
export default LoginButton;