import * as React from 'react';
import StripeCheckout from "react-stripe-checkout";
import {Mutation} from "react-apollo";
import { gql } from 'apollo-boost';
import {userFragment} from "./graphql/userFragment";
import {ChangeCreditCardMutation, ChangeCreditCardMutationVariables} from "../schemaTypes";
import '../index.css';

const changeCreditCardMutation = gql`
    mutation ChangeCreditCardMutation($source: String!, $ccLast4: String!){
        changeCreditCard(source: $source, ccLast4: $ccLast4) {
            ...UserInfo
        }
    }
    ${userFragment}
`;
const ChangeCreditCard = () =>{
    return(
    <Mutation<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>
        mutation={changeCreditCardMutation}> 
        {mutate =>(
        <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_KEY!}
        billingAddress
        shippingAddress
        token={async token =>{
            const response = await mutate({
                variables: {source: token.id, ccLast4: token.card.last4}
            });
            console.log(response);
        }}
        >
            <a href='#' className="creditCardButton">Change Billing/Shipping Info </a>
        </StripeCheckout>
    )}</Mutation>
    )}

export default ChangeCreditCard;