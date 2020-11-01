import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import '../index.css';


const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    return(
        !isAuthenticated && (
            <a href='/'  className='button7' onClick={loginWithRedirect}>
                log in
            </a>
       )
    )
}
export default LoginButton