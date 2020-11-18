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
        />
    )}</Mutation>
    )}

export default SubscribeUser;