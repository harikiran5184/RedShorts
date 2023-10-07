import React, { createContext, useState } from 'react';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Upload from './Upload';
import Error from './Error';
import Test from './Test';
import Array from './Array';
import Settings from './Settings';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Backvideo from './Backvideo';
import Yourvideo from './Yourvideo';
export const TokenContext = createContext();

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
      <TokenContext.Provider value={[token, setToken]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/upload">
              <Upload />
            </Route>
            <Route exact path="/test">
              <Test />
            </Route>
            <Route exact path="/yourvideos">
              <Yourvideo />
            </Route>
            <Route exact path="/settings">
              <Settings />
            </Route>
            <Route exact path="/array">
              <Array />
            </Route>
            <Route exact path="/backvideo"><Backvideo /></Route>
            <Route component={Error}></Route>
          </Switch>
        </Router>
      </TokenContext.Provider>
    </div>
  );
}
