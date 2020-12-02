import React, {Fragment } from 'react';

import Header from '../componets/Header';
import SubscriptionPlans from '../componets/SubscriptionPlans';
import RecipeValues from '../componets/RecipeValues';
import AboutJoseph from '../componets/AboutJoseph';
import RecipeContent from '../componets/RecipeContent';

const Home = ()=>(
    <Fragment>
    <Header />
    <RecipeValues/>
    <SubscriptionPlans/>
    <AboutJoseph/>
    </Fragment>
)
export default Home;