import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './pages/Main/Main';
import Detail from './pages/Detail/Detail';
import Nav from './components/Nav/Nav';
import Resume from './pages/Resume/Resume';
import ResumeForm from './pages/Resume/ResumeForm';
import SearchResult from './pages/SearchResult/SearchResult';
import Salary from './pages/Salary/Salary';
import Application from './pages/Application/Application';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/jobpostings" component={Detail} />
          <Route exact path="/jobpostings/:id" component={Detail} />
          <Route exact path="/resume" component={Resume} />
          <Route exact path="/resume-form" component={ResumeForm} />
          <Route exact path="/resume-form/:id" component={ResumeForm} />
          <Route exact path="/search" component={SearchResult} />
          <Route exact path="/tag-search" component={SearchResult} />
          <Route exact path="/salary" component={Salary} />
          <Route exact path="/mypage" component={Application} />
          <Route exact path="/mypage/:id" component={Application} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
