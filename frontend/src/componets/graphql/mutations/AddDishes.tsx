import * as React from 'react';
import {Mutation} from "react-apollo";
import { gql } from 'apollo-boost';
import {userFragment} from "../userFragment";
import {AddDishToSubscriptionMutation, AddDishToSubscriptionMutationVariables} from '../../../schemaTypes'
import '../../../index.css'

const addDishToSubscriptionMutation = gql`
    mutation AddDishToSubscriptionMutation($foodDishData: FoodDishInput!){
        addDishToSubscription(foodDishData: $foodDishData) {
            ...UserInfo
        }
    }
    ${userFragment}
`;

const AddDishes = () => {
    const firstDish = "test dish 1";
    const secondDish = "test dish 2";
    const thirdDish = "test dish 3";
    const fourthDish = "test dish 4";
    return(
    <Mutation<AddDishToSubscriptionMutation, AddDishToSubscriptionMutationVariables>
        mutation={addDishToSubscriptionMutation}>
            {mutate =>(
                <a href='#' className='subscribeButton' onClick={(event)=>{
                    event.preventDefault();
                    mutate({
                        variables:{
                            foodDishData: {
                                dishOne: firstDish,
                                dishTwo: secondDish,
                                dishThree: thirdDish,
                                dishFour: fourthDish,
                            }
                        }
                    })
                }
                }>
                    Test Dish adding stuff
                </a>
            )}</Mutation>
    )
}
export default AddDishes;