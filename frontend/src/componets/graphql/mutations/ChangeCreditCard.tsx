import * as React from 'react';
import StripeCheckout from "react-stripe-checkout";
import {Mutation} from "react-apollo";
import { gql } from 'apollo-boost';
import {userFragment} from "../userFragment";
import {ChangeCreditCardMutation, ChangeCreditCardMutationVariables} from "../../../schemaTypes";

const changeCreditCardMutation = gql`
    mutation ChangeCreditCardMutation($source: String!, $ccLast4: String!, $shippingAddress: ShippingAddressInput!){
        changeCreditCard(source: $source, ccLast4: $ccLast4, shippingAddress: $shippingAddress) {
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
        //@ts-ignore
        token={async (token, address) =>{
            const response = await mutate({
                variables: {source: token.id, ccLast4: token.card.last4,
                shippingAddress: {
                        city: JSON.stringify(address.shipping_address_city),
                        country: JSON.stringify(address.shipping_address_county),
                        line1: JSON.stringify(address.shipping_address_line1),
                        line2: JSON.stringify(address.shipping_address_line2),
                        postal_code: JSON.stringify(address.shipping_address_zip),
                        state: JSON.stringify(address.shipping_address_state),
                    }
                }
            });
            console.log(response);
        }}
        >
            <a href='#' className="creditCardButton">Change Billing/Shipping Info </a>
        </StripeCheckout>
    )}</Mutation>
    )}

export default ChangeCreditCard;