import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Landing from './signup/Landing';
import SupportSignUp from './signup/SupportSignUp';
import GiverSignUp from './signup/GiverSignUp';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route path='/seeker'>
          <SupportSignUp />
        </Route>
        <Route path='/giver'>
          <GiverSignUp />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
