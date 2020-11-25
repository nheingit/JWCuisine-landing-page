import React, {Fragment } from 'react';

import Header from '../componets/Header';
import SubscriptionPlans from '../componets/SubscriptionPlans';
import RecipeValues from '../componets/RecipeValues';

const Home = ()=>(
    <Fragment>
    <Header />
    <RecipeValues/>
<SubscriptionPlans/>
</Fragment>
)
export default Home;