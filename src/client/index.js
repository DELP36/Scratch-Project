import React, { useState } from 'react';
import { render } from 'react-dom';
import App from './App';
import { CssBaseline } from '@material-ui/core';
import store from './store';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

// Wrap the app in a provider tag (redux)
render(
  <Provider store={store}>
    {/* works the same as a CSS-reset */}
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById('root')
);
