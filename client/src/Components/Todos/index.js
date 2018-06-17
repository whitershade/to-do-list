import React, { Component } from 'react';
import { map } from 'lodash';
import Todo from '../../Containers/Todos/Todo';
import AddNewForm from '../../Containers/Todos/New';
import './Todos.css';


class Todos extends Component {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <div styleName="App">
        <header styleName="App-header">
          <h1 styleName="App-title">
            Welcome to Todo App!
          </h1>
        </header>
        <AddNewForm />
        <div styleName="App-intro">
          {
            map(this.props.todos, ({ _id, text }) => {
              return <Todo key={ _id } id={ _id } text={ text } />
            })
          }
        </div>
      </div>
    );
  }
}


export default Todos;
