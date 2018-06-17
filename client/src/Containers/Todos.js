import { connect } from 'react-redux';
import { loadItems as loadTodos } from '../Actions/Todos';
import Component from '../Components/Todos';


const mapStateToProps = ({ todos: { data, isLoading } }) =>
  ({ todos: data, isLoading });

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(loadTodos()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Component);
