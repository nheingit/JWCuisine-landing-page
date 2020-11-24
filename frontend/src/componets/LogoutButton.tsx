import React, { Fragment } from 'react';
import { Query, Mutation } from "react-apollo";
import {useHistory} from "react-router-dom";
import {gql} from "apollo-boost";

import {MeQuery} from "../schemaTypes";
import '../index.css';
import {meQuery} from "./graphql/me";
import {LogoutUserMutation} from "../schemaTypes";

const logoutMutatation = gql`
    mutation LogoutUserMutation{
        logout
    }
`;

const LogoutButtonClicker = ()=>{
    const history = useHistory();
    return(
            <Mutation<LogoutUserMutation> mutation={logoutMutatation}>{(mutate)=>(
        <a href="#" className='button1'
        onClick={(event)=>{
            event.preventDefault();
            mutate();
            history.push("/")
            history.go(0);
        }}> LOGOUT </a>
        )}</Mutation>
   
)
}
const AccountManager = () =>{
    return (
    <div>
        <a href="/account"className='button7'>ACCOUNT</a>
    </div>
    )
}


const LogoutButton = () =>{
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
                    return null
                }
             //if logged in
            return (
            <Fragment>
                <LogoutButtonClicker/>
                <AccountManager/>
            </Fragment>
            )

             }}
            </Query>
       )
    
}
export default LogoutButton



