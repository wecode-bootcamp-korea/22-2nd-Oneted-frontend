import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Main from './pages/Main/Main';
import Detail from './pages/Detail/Detail';
import Nav from './components/Nav/Nav';

import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

class Routes extends Component {
  render() {
    return (
      <GlobalStyle>
        <ThemeProvider theme={theme}>
          <Router>
            <Nav />
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/detail" component={Detail} />
            </Switch>
          </Router>
        </ThemeProvider>
      </GlobalStyle>
    );
  }
}

export default Routes;
