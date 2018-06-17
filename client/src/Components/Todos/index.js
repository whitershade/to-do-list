import React, { Component } from 'react';
import { map } from 'lodash';
import './Todos.css';


class App extends Component {
  componentDidMount() {
    this.props.loadData();
  }

  render() { 
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Welcome to Todo App!
          </h1>
        </header>
        <ul className="App-intro">
          {
            map(this.props.todos, ({ text }) => {
              return <li>{ text }</li>
            })
          }
        </ul>
      </div>
    );
  }
}


export default App;
