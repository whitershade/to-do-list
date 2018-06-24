import React, { Component } from 'react';
import { map } from 'lodash';
import Loading from '../../Components/Loading';
import Todo from '../../Containers/Todos/Todo';
import './styles.css';


class Todos extends Component {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    const { isLoading } = this.props;

    if(isLoading) return <Loading />

    return (
      <div styleName='todos'>
        { map(this.props.todos, ({ _id, text, completed }) =>
            <Todo
              key={ _id }
              id={ _id }
              text={ text }
              completed={ completed }
            />
          ) }
      </div>
    );
  }
}


export default Todos;
