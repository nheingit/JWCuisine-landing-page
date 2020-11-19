import React from "react";
import {useHistory} from "react-router-dom";
import {gql} from "apollo-boost";
import { Mutation } from "react-apollo";
import {LogoutUserMutation} from "../schemaTypes";
import '../index.css';

const logoutMutatation = gql`
    mutation LogoutUserMutation{
        logout
    }
`;

const LogoutButton = ()=>{
    const history = useHistory();
    return(
    <Mutation<LogoutUserMutation> mutation={logoutMutatation}>{(mutate)=>(
        <a href="#" className='button1'
        onClick={(event)=>{
            event.preventDefault();
            mutate();
            history.push("/")
            history.go(0);
        }}> Logout </a>



    )}</Mutation>
    )
}
export default LogoutButton;