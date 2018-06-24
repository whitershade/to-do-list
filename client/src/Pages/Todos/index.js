import React, { Component } from 'react';
import Todos from '../../Containers/Todos';
import AddNewForm from '../../Containers/Todos/New';
import './styles.css';


class TodosPage extends Component {
  render() {
    return (
      <div styleName="app">
        <header styleName="header">
          <h1 styleName="title">
            Welcome to Todo App!
          </h1>
        </header>
        <AddNewForm />
        <Todos />
      </div>
    );
  }
}


export default TodosPage;
