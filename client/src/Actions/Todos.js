import axios from 'axios';
import { createAction } from 'redux-actions';
import * as types from '../Constants/Todos';


export const startLoadItems = createAction(types.START_LOAD_ITEMS);
export const addItems = createAction(types.ADD_ITEMS, (data) => data);
export const loadItemsError = createAction(types.LOAD_ITEMS_ERROR);

export const startAddItem = createAction(types.START_ADD_ITEM);
export const addItem = createAction(types.ADD_ITEM);
export const addItemError = createAction(types.ADD_ITEM_ERROR);

export const startDeleteItem = createAction(types.START_DELETE_ITEM);
export const deleteItem = createAction(types.DELETE_ITEM);
export const deleteItemError = createAction(types.DELETE_ITEM_ERROR);

export const startUpdateItem = createAction(types.START_UPDATE_ITEM);
export const updateItem = createAction(types.UPDATE_ITEM);
export const updateItemError = createAction(types.UPDATE_ITEM_ERROR);

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
  dispatch(startAddItem());

  try {
    const { data: todo } = await axios.post('/api/todos', values);

    dispatch(addItem(todo));
  } catch (e) {
    dispatch(addItemError());
  }
};

export const destroyItem = (id) => async (dispatch) => {
  dispatch(startDeleteItem());

  try {
    const { data: { todo: { _id } } } = await axios.delete(`/api/todos/${id}`);

    dispatch(deleteItem(_id));
  } catch (e) {
    dispatch(deleteItemError());
  }
}

export const patchItem = (id, attrs) => async (dispatch) => {
  dispatch(startUpdateItem());

  try {
    const { data: todo } = await axios.patch(`/api/todos/${id}`, attrs);

    dispatch(updateItem(todo));
  } catch (e) {
    dispatch(updateItemError());
  }
}
