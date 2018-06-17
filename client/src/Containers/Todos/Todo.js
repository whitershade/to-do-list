import { connect } from 'react-redux';
import { destroyItem as destroyTodo } from '../../Actions/Todos';
import Component from '../../Components/Todos/Todo';


const mapDispatchToProps = dispatch => ({
  deleteTodo: (id) => () => dispatch(destroyTodo(id)),
});


export default connect(null, mapDispatchToProps)(Component);
