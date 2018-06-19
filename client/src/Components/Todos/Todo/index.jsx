import React, { Component } from 'react';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './styles.css';


class Todo extends Component {
  state = {
    text: '',
    isEditing: false,
  }

  componentDidMount() {
    this.setState({ text: this.props.text });
  }

  onToggleDoneUndone = () => {
    const { updateTodo, id, completed} = this.props;

    updateTodo(id, { completed: !completed })
  }

  onEditText = () => {
    this.setState({ isEditing: !this.state.isEditing });
  }

  onTextChange = (e) => {
    this.setState({ text: e.target.value });
  }

  onTextSave = () => {
    const {
      props: { id, updateTodo },
      state: { text },
      onEditText
    } = this;

    onEditText();
    updateTodo(id, { text });
  }

  render() {
    const {
      props: { id, completed,  deleteTodo },
      state: { isEditing, text },
      onToggleDoneUndone, onEditText, onTextSave, onTextChange
    } = this;

    return (
      <Card styleName={ `card ${completed ? 'completed' : 'uncompleted'}` }>
         <CardContent>
           <Typography color="textSecondary">
              So what to do?
           </Typography>

           { isEditing ? (
             <TextField
               label="Text"
               placeholder="Enter text"
               value={ text }
               onChange={ onTextChange }
             />
           ) : (
             <Typography variant="headline" component="h2">
               { text }
             </Typography>
           ) }

           { isEditing ? (
              <Button
               size="small"
               color="primary"
               onClick={ onTextSave }>
                 Save
               </Button>
           ) : (
             <Button
              size="small"
              color="primary"
              onClick={ onEditText }>
                Edit text
              </Button>
           ) }

         </CardContent>
         <CardActions>
           <Button
            size="small"
            color="primary"
            onClick={ onToggleDoneUndone }>
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
