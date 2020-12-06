import * as React from 'react';
import {useState, Fragment} from 'react';
import {Mutation} from "react-apollo";
import { gql } from 'apollo-boost';
import {userFragment} from "../userFragment";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {AddDishToSubscriptionMutation, AddDishToSubscriptionMutationVariables} from '../../../schemaTypes'
import '../../../index.css'
import { StringDecoder } from 'string_decoder';

const addDishToSubscriptionMutation = gql`
    mutation AddDishToSubscriptionMutation($foodDishData: FoodDishInput!){
        addDishToSubscription(foodDishData: $foodDishData) {
            ...UserInfo
        }
    }
    ${userFragment}
`;

function Alert(props: AlertProps){
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

const AddDishes = ({dishes}: {dishes: Array<string>}) => {
    const [firstDish, secondDish, thirdDish, fourthDish] = dishes
    const [open, setOpen] = useState(false);
    
    const openSnackBar = () => {setOpen(true);};
    const closeSnackBar = (event?: React.SyntheticEvent, reason?: string) =>{
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false);
    };

    return(
    <Mutation<AddDishToSubscriptionMutation, AddDishToSubscriptionMutationVariables>
        mutation={addDishToSubscriptionMutation}>
            {mutate =>(
                <Fragment>
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
                    openSnackBar();
                }
                }>
                    Test Dish adding stuff
                </a>
                <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackBar}>
                    <Alert onClose={closeSnackBar} severity='success'>
                        Your Dishes have been added!
                    </Alert>
                </Snackbar>
                </Fragment>
            )}</Mutation>
    )
}
export default AddDishes;