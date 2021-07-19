import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class Routes extends Component {
  render() {
    return (
      <>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/detail" component={Detail} />
          </Switch>
            <div></div>
        </Router>
      </>
    )
  }
}

export default Routes
