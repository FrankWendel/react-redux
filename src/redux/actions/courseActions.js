import * as types from './actionsTypes';

export function createCourses(course) {
  return { type: types.CREATE_COURSE, course };
}

export function deleteeCourses(course) {
  return { type: types.DELETE_COURSE, course };
}
