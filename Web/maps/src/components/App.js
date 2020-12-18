import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Locations from 'components/Locations/Locations';
import LocationDetails from 'components/Locations/LocationDetails';
import CreateLocation from './Locations/CreateLocation';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Locations}></Route>
            <Route exact path="/create" component={CreateLocation}></Route>
            <Route exact path="/:id" component={LocationDetails}></Route>
            <Route exact path="/update/:id" component={CreateLocation}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
