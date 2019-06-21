import * as types from '../actions/actionsTypes';

export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCESS:
      return action.authors;

    default:
      return state;
  }
}
