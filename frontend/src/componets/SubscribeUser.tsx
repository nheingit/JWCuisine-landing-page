import * as React from 'react';
import StripeCheckout from "react-stripe-checkout";
import {Mutation} from "react-apollo";
import { gql } from 'apollo-boost';
import {createSubscriptionMutation, createSubscriptionMutationVariables} from "../schemaTypes";

const CreateSubscriptionMutation = gql`
    mutation CreateSubscriptionMutation($source: String!){
        createSubscription(source: $source){
            id
            email
            type
        }
    }
`;
const SubscribeUser = () =>{
    return(
    <Mutation<createSubscriptionMutation, createSubscriptionMutationVariables>
        mutation={CreateSubscriptionMutation}> 
        {mutate =>(
        <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_KEY!}
        token={async token =>{
            const response = await mutate({
                variables: {source: token.id}
            });
            console.log(response);
        }}
        />
    )}</Mutation>
    )}

export default SubscribeUser;