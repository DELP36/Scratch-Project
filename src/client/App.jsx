import React from 'react';
import MainContainer from './containers/MainContainer';
import { makeStyles } from '@material-ui/core/styles';
// Return the App, rendering the MainContainer within it

const useStyles = makeStyles({
  root: {
    height: '100%',
    background: '#616161',
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MainContainer />;
    </div>
  );
};

export default App;
