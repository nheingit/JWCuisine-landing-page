import * as React from 'react';
import StripeCheckout from "react-stripe-checkout";
import {Mutation, Query} from "react-apollo";
import { gql } from 'apollo-boost';

import {Link} from 'react-router-dom'
import {MeQuery} from "../schemaTypes";
import {meQuery} from "./graphql/me"
import {userFragment} from "./graphql/userFragment";
import {CreateSubscriptionMutation, CreateSubscriptionMutationVariables} from "../schemaTypes";
import "../index.css"

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
const SubscribeUserButton = () =>{
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
                    Purchase Plan
            </a>
        </StripeCheckout>

    )}</Mutation>
    )}
const SubscribeUser =()=>{
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
                        <SubscribeUserButton/>
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

export default SubscribeUser;