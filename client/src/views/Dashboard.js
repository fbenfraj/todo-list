import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonAppBar from '../components/ButtonAppBar';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [todo, setTodo] = useState('');
  const [todosList, setTodosList] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const response = await axios.get('http://localhost:8000/todos');
      if (response.status === 200) {
        setTodosList(Object.values(response.data));
      }
    }
    fetchTodos();
  }, [todosList]);

  const Todos = () => {
    return todosList.map((value, index) => (
      <ListItem key={index}>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={value.text} />
        <ListItemSecondaryAction>
          <IconButton edge='end' aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  };

  async function addTodo(e) {
    e.preventDefault();
    await axios.post('http://localhost:8000/todos', {
      user: 'me',
      text: todo
    });
    setTodo('');
  }

  return (
    <div>
      <ButtonAppBar />
      <Grid item xs={12} md={12}>
        <form onSubmit={e => addTodo(e)} style={{ display: 'flex', margin: 8 }}>
          <TextField
            id='standard-full-width'
            label='New TODO'
            placeholder='Add a new TODO here! :)'
            helperText='<3'
            margin='normal'
            InputLabelProps={{
              shrink: true
            }}
            value={todo}
            onChange={e => {
              setTodo(e.target.value);
            }}
            style={{ flexGrow: 1 }}
          />
          <Button
            type='submit'
            style={{ margin: 15 }}
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            ADD
          </Button>
        </form>
      </Grid>
      <Grid item xs={12} md={12}>
        <div className={classes.demo}>
          <List>
            <Todos />
          </List>
        </div>
      </Grid>
    </div>
  );
};

export default Dashboard;
