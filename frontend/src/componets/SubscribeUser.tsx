import * as React from 'react';
import StripeCheckout from "react-stripe-checkout";
import {Mutation} from "react-apollo";
import { gql } from 'apollo-boost';
import {userFragment} from "./graphql/userFragment";
import {CreateSubscriptionMutation, CreateSubscriptionMutationVariables} from "../schemaTypes";

const createSubscriptionMutation = gql`
    mutation CreateSubscriptionMutation($source: String!, $ccLast4: String!){
        createSubscription(source: $source, ccLast4: $ccLast4){
            ...UserInfo
        }
    }
    ${userFragment}
`;
const SubscribeUser = () =>{
    return(
    <Mutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>
        mutation={createSubscriptionMutation}> 
        {mutate =>(
        <StripeCheckout
        billingAddress
        shippingAddress
        stripeKey={process.env.REACT_APP_STRIPE_KEY!}
        token={async token =>{
            const response = await mutate({
                variables: {source: token.id, ccLast4: token.card.last4}
            });
            console.log(response);
        }}
        />
    )}</Mutation>
    )}

export default SubscribeUser;