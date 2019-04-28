import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Main from './pages/Main/main';
import Signin from './pages/Singin/signin';
import Signup from './pages/Signup/signup';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Signin} />
            <Route path='/main' component={Main} />
            <Route path='/signup' component={Signup} />
            <Redirect from='*' to='/' />
        </Switch>
    </BrowserRouter>
);

export default Routes;