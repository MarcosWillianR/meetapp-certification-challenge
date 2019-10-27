import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import MeetupEdit from '../pages/MeetupEdit';
import MeetupCreate from '../pages/MeetupCreate';
import Meetup from '../pages/Meetup';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/meetup/selected/:id" exact component={Meetup} isPrivate />
      <Route path="/meetup/edit/:id" exact component={MeetupEdit} isPrivate />
      <Route exact path="/meetup/create" component={MeetupCreate} isPrivate />
    </Switch>
  );
}
