import * as types from './actionsTypes';
import * as AuthorsAPI from '../../api/authorApi';

export function loadAuthorsSucess(authors) {
  return { type: types.LOAD_AUTHORS_SUCESS, authors };
}

export function loadAuthors() {
  return async function(dispatch) {
    try {
      const authors = await AuthorsAPI.getAuthors();
      dispatch(loadAuthorsSucess(authors));
    } catch (error) {
      throw error;
    }
  };
}
