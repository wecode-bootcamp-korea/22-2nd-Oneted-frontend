import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './pages/Main/Main';
import Detail from './pages/Detail/Detail';
import Nav from './components/Nav/Nav';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/detail" component={Detail} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
