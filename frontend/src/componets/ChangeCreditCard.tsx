import * as React from 'react';
import StripeCheckout from "react-stripe-checkout";
import {Mutation} from "react-apollo";
import { gql } from 'apollo-boost';
import {ChangeCreditCardMutation, ChangeCreditCardMutationVariables} from "../schemaTypes";
import '../index.css';

const changeCreditCardMutation = gql`
    mutation ChangeCreditCardMutation($source: String!){
        changeCreditCard(source: $source) {
            id
            email
            type
        }
    }
`;
const ChangeCreditCard = () =>{
    return(
    <Mutation<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>
        mutation={changeCreditCardMutation}> 
        {mutate =>(
        <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_KEY!}
        token={async token =>{
            const response = await mutate({
                variables: {source: token.id}
            });
            console.log(response);
        }}
        >
            <a href='#' className="creditCardButton">change payment method</a>
        </StripeCheckout>
    )}</Mutation>
    )}

export default ChangeCreditCard;