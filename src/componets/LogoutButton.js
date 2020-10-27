import React from 'react';
import {useAuth0} from '@auth0/auth0-react';


const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return(
        isAuthenticated && (
        <a href='something'  className='button1' onClick={logout}>
            log out
        </a>
       )
    )
}
export default LogoutButton