import * as React from 'react';
import StripeCheckout from "react-stripe-checkout";
import {Mutation} from "react-apollo";
import { gql } from 'apollo-boost';
import {userFragment} from "./graphql/userFragment";
import {CreateSubscriptionMutation, CreateSubscriptionMutationVariables} from "../schemaTypes";

const createSubscriptionMutation = gql`
    mutation CreateSubscriptionMutation($source: String!, $ccLast4: String!,
     $shippingAddress: ShippingAddressInput!){
        createSubscription(source: $source, ccLast4: $ccLast4,
         shippingAddress: $shippingAddress){
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
                variables: {source: token.id, ccLast4: token.card.last4,
                    shippingAddress: {
                        city: token.card.address_city!,
                        country: token.card.address_country!,
                        line1: token.card.address_line1!,
                        line2: token.card.address_line2,
                        postal_code: token.card.address_zip!,
                        state: token.card.address_state!,
                    }
                }
            });
            console.log(response);
        }}
        />
    )}</Mutation>
    )}

export default SubscribeUser;