import React from 'react';
import ReactDOM from 'react-dom';
import Routes from '../src/Routes';

import GlobalStyle from './styles/GlobalStyle.js';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Routes />
    <GlobalStyle />
  </ThemeProvider>,
  document.getElementById('root')
);
