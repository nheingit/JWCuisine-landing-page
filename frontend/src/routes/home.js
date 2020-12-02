import React, {Fragment } from 'react';

import Header from '../componets/Header';
import SubscriptionPlans from '../componets/SubscriptionPlans';
import RecipeValues from '../componets/RecipeValues';
import AboutJoseph from '../componets/AboutJoseph';

const Home = ()=>(
    <Fragment>
    <Header />
    <RecipeValues/>
    <AboutJoseph/>
    <SubscriptionPlans/>
    </Fragment>
)
export default Home;