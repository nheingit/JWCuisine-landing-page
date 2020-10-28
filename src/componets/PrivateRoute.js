import React from 'react';
import {Route} from "react-router-dom";
import {withAuthenticationRequired} from "@auth0/auth0-react";
import Profile from "./Profile";

const PrivateRoute= ({componet, ...args})=>(
    <Route
    component={withAuthenticationRequired(componet,{
        onRedirecting: ()=> <Profile/>,
    })}
    {...args}
    />
);
export default PrivateRoute;