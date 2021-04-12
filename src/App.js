import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeView from './views/Home';
import Navbar from './components/Navbar';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={HomeView} />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
