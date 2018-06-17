import { connect } from 'react-redux';
import { createItem as createTodo } from '../../Actions/Todos';
import Component from '../../Components/Todos/New';


const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(createTodo(values)),
});


export default connect(null, mapDispatchToProps)(Component);
