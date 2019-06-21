import * as types from '../actions/actionsTypes';

export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];

    case types.LOAD_COURSES_SUCESS:
      return action.courses;

    case types.UPDATE_COURSE_SUCCESS:
      return state.map(course => {
        course.id === action.course.id ? action.course : course;
      });

    default:
      return state;
  }
}
