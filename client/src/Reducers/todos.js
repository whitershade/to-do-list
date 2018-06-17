import * as types from '../Constants/Todos';

const initialState = {
  data: {},
  isLoading: false,
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

    default:
      return state;
  }
}
