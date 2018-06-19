import { connect } from 'react-redux';
import {
  destroyItem as destroyTodo,
  patchItem as updateTodo
} from '../../Actions/Todos';
import Component from '../../Components/Todos/Todo';


const mapDispatchToProps = dispatch => ({
  deleteTodo: (id) => () => dispatch(destroyTodo(id)),
  updateTodo: (id, attrs) => dispatch(updateTodo(id, attrs))
});


export default connect(null, mapDispatchToProps)(Component);
