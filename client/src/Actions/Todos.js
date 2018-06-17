import axios from 'axios';
import { createAction } from 'redux-actions';
import * as types from '../Constants/Todos';


export const startLoadItems = createAction(types.START_LOAD_ITEMS);
export const addItems = createAction(types.ADD_ITEMS);
export const loadItemsError = createAction(types.LOAD_ITEMS_ERROR);

export const loadItems = () => async (dispatch) => {
  dispatch(startLoadItems());

  try {
    const { data: todos } = await axios.get('/api/todos');

    dispatch(addItems(todos));
  } catch (e) {
    dispatch(loadItemsError());
  }
};
