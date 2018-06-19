import React, { Component } from 'react';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './styles.css';


class Todo extends Component {
  render() {
    const { text, id, completed,  deleteTodo, updateTodo } = this.props;

    return (
      <Card styleName={ `card ${completed ? 'completed' : 'uncompleted'}` }>
         <CardContent>
           <Typography color="textSecondary">
              So what to do?
           </Typography>
           <Typography variant="headline" component="h2">
             { text }
           </Typography>
           <Typography component="p">
             It will be nice
           </Typography>
         </CardContent>
         <CardActions>
           <Button
            size="small"
            color="primary"
            onClick={ updateTodo(id, { completed: !completed }) }>
              Mark as { completed ? 'undone' : 'done' }
            </Button>
           <Button
            size="small"
            color="secondary"
            onClick={ deleteTodo(id) }>
              Delete
            </Button>
         </CardActions>
       </Card>
    );
  }
}


export default Todo;
