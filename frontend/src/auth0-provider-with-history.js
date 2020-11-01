import React from 'react';
import {useHistory } from 'react-router-dom';
import {Auth0Provider} from '@auth0/auth0-react';
import { ContactSupportTwoTone } from '@material-ui/icons';

const Auth0ProviderWithHistory = ({ children }) => {
    const history = useHistory();
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const audience = process.env.REACT_APP_AUDIENCE;

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };
    return(
        <Auth0Provider
        domain ={domain}
        clientId = {clientID}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        audience={audience}
        >
            {children}
        </Auth0Provider>

    );
};
export default Auth0ProviderWithHistory;
