import * as React from 'react';
import StripeCheckout from "react-stripe-checkout";
import {Mutation, Query} from "react-apollo";
import { gql } from 'apollo-boost';

import {MeQuery} from "../../../schemaTypes";
import {meQuery} from "../me"
import {userFragment} from "../userFragment";
import {CreateSubscriptionFourMutation, CreateSubscriptionFourMutationVariables} from "../../../schemaTypes";

const createSubscriptionFourMutation = gql`
    mutation CreateSubscriptionFourMutation($source: String!, $ccLast4: String!,
     $shippingAddress: ShippingAddressInput!){
        createSubscriptionFour(source: $source, ccLast4: $ccLast4,
         shippingAddress: $shippingAddress){
            ...UserInfo
        }
    }
    ${userFragment}
`;
const SubscribeUserFourButton = () =>{
    return(
    <Mutation<CreateSubscriptionFourMutation, CreateSubscriptionFourMutationVariables>
        mutation={createSubscriptionFourMutation}> 
        {mutate =>(
        <StripeCheckout
        billingAddress
        shippingAddress
        stripeKey={process.env.REACT_APP_STRIPE_KEY!}
        //@ts-ignore
        token={async (token, address) =>{
            try{
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
               console.log("response: ", response);
            } catch(error){
                console.log(error)
            }
        }}
        >
            <a href='#' className='subscribeButton' onClick={
                (event)=>event.preventDefault()}>
                    Purchase Plan for Four
            </a>
        </StripeCheckout>

    )}</Mutation>
    )}
const SubscribeUserFour =()=>{
    return(
    <Query<MeQuery> fetchPolicy="network-only" query={meQuery}>
        {({data, loading})=>{
            if(loading){
                return null
            }
            if(!data){
                return <div>data is null</div>
            }

            if(!data.me){
                return (
                <a href='/login' className='subscribeButton'>
                    Purchase Plan
                </a>)
            }
            if(data.me.type==='free-trial'){
                return(
                        <SubscribeUserFourButton/>
                    )
                    
            }
        //if(data.me.type ==="paid")
        return (
         <a href='/account' className='subscribeButton'>
             Manage Plan
         </a>
        )
    }}
    </Query>
    
    )}

export default SubscribeUserFour;