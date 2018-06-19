import { omit } from 'lodash';
import * as types from '../Constants/Todos';

const initialState = {
  data: {},
  isLoading: false,
  isPushing: false,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case types.START_LOAD_ITEMS:
      return { ...state, isLoading: true };

    case types.ADD_ITEMS:
      return {
        ...state,
        data: payload.todos,
        isLoading: false,
      };

    case types.LOAD_ITEMS_ERROR:
      return { ...state, isLoading: false };

    case types.START_PUSH_ITEM:
    case types.START_DELETE_ITEM:
    case types.START_UPDATE_ITEM:
      return { ...state, isPushing: true };

    case types.ADD_ITEM:
      return {
        ...state,
        data: {
          ...state.data,
          [payload.todo._id]: payload.todo,
        },
        isPushing: false,
      };

    case types.PUSH_ITEM_ERROR:
    case types.DELETE_ITEM_ERROR:
    case types.UPDATE_ITEM_ERROR:
      return { ...state, isPushing: false };

    case types.DELETE_ITEM:
      return {
        ...state,
        data: omit(state.data, payload),
        isPushing: false,
      };

    case types.UPDATE_ITEM:
      return {
        ...state,
        data: {
          ...state.data,
          [payload._id]: { ...state.data[payload._id], ...payload },
        },
        isPushing: false,
      };

    default:
      return state;
  }
}
