import React from 'react';
import Home from './components/Home';
import Header from './components/Header';
import Chat from './components/Chat';
import { Route, Switch, Redirect } from 'react-router-dom';

const App = () => {
  console.log(window);
  return (
    <>
      <div className="desktop-notice">
        <p>Please use mobile to visit website</p>
      </div>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/:roomID/:name" exact>
            <Chat />
          </Route>
          <Redirect from="/" to="/" />
        </Switch>
      </div>
    </>
  );
};

export default App;
