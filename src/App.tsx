import React from 'react';
import {Route, Switch} from 'react-router-dom';

import MainPage from 'pages/Main';
import Dashboard from 'pages/Dashboard';
import FoodPage from 'pages/Food';
import HealthPage from 'pages/Health';
import ProfilePage from 'pages/Profile';

import './App.scss';

function App() {
  return (
    <>
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/food' exact component={FoodPage} />
        <Route path='/health' exact component={HealthPage} />
        <Route path='/profile' exact component={ProfilePage} />
      </Switch>
    </>
  );
}

export default App;
