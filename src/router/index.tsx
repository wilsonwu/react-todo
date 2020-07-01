import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Home from '../Home'
import SignIn from '../SignIn';
import SignUp from '../SignUp';

const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  </HashRouter>
);


export default BasicRoute;