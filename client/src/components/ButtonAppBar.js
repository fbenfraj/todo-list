import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Route, Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Route
          exact
          path='/dashboard'
          render={() => (isLoggedOut ? <Redirect to='/' /> : null)}
        />
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            TO DO
          </Typography>
          <Button color='inherit' onClick={() => setIsLoggedOut(true)}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
