import * as React from 'react';
import { gql } from "apollo-boost";
import {userFragment} from "./graphql/userFragment";
import { Mutation } from 'react-apollo';
import {CancelSubscriptionMutation} from "../schemaTypes";
import "../index.css";

const cancelSubscriptionMutation = gql`
    mutation CancelSubscriptionMutation {
        cancelSubscription {
            ...UserInfo
        }
    }
    ${userFragment}

`;

const  CancelSubscription = ()=> {
  return(
  <Mutation<CancelSubscriptionMutation> mutation={cancelSubscriptionMutation} >{(mutate)=>(

    <a href='#' className="creditCardButton" 
    onClick={(event)=>{
        event.preventDefault();
        mutate();
    }}>Cancel Subscription</a>

      )}</Mutation>
  )
}
export default CancelSubscription