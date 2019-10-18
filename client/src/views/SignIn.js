import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Route, Redirect, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  'paper': {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  'avatar': {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  'form': {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  'submit': {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function authenticate(email, password) {
    const response = await axios.post('http://localhost:8000/login', {
      email,
      password
    });
    if (response.status === 200) {
      setIsLoggedIn(true);
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Route
        exact
        path='/'
        render={() => (isLoggedIn ? <Redirect to='/dashboard' /> : null)}
      />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} onClick={() => console.log(props)}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form
          onSubmit={e => {
            e.preventDefault();
            authenticate(email, password);
          }}
        >
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/' variant='body2'>
                {/* Forgot password? */}
              </Link>
            </Grid>
            <Grid item>
              <Link to='/register' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
