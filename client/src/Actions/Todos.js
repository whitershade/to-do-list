import axios from 'axios';
import { createAction } from 'redux-actions';
import * as types from '../Constants/Todos';


export const startLoadItems = createAction(types.START_LOAD_ITEMS);
export const addItems = createAction(types.ADD_ITEMS);
export const loadItemsError = createAction(types.LOAD_ITEMS_ERROR);

export const startPushItem = createAction(types.START_PUSH_ITEM);
export const addItem = createAction(types.ADD_ITEM);
export const pushItemError = createAction(types.PUSH_ITEM_ERROR);

export const loadItems = () => async (dispatch) => {
  dispatch(startLoadItems());

  try {
    const { data: todos } = await axios.get('/api/todos');

    dispatch(addItems(todos));
  } catch (e) {
    dispatch(loadItemsError());
  }
};

export const createItem = values => async (dispatch) => {
  dispatch(startPushItem());

  try {
    const { data: todo } = await axios.post('/api/todos', values);

    dispatch(addItem(todo));
  } catch (e) {
    dispatch(loadItemsError());
  }
};
