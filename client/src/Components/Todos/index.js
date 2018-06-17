import React, { Component } from 'react';
import { map } from 'lodash';
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
        <ul styleName="App-intro">
          {
            map(this.props.todos, ({ _id, text }) => {
              return <li key={ _id }>{ text }</li>
            })
          }
        </ul>
      </div>
    );
  }
}


export default Todos;
