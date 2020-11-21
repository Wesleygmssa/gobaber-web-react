import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route'

import SignIn from '../pages/Singin';
import SignUp from '../pages/SingUp';

import Dashboard from '../pages/Dashboard';

//import em App.tsx
const Routes: React.FC = () => {
    return (
        <Switch>
            < Route exact path="/" component={SignIn} />
            < Route path="/SignUp" component={SignUp} />

            < Route path="/Dashboard" component={Dashboard} isPrivate />
        </Switch>
    );
}

export default Routes;