import * as types from './actionsTypes';
import * as CoursesAPI from '../../api/courseApi';

export function loadCoursesSucess(courses) {
  return { type: types.LOAD_COURSES_SUCESS, courses };
}

export function loadAuthorsSucess(courses) {
  return { type: types.LOAD_COURSES_SUCESS, courses };
}

export function createCourseSucess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSucess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
  return async function(dispatch) {
    try {
      const courses = await CoursesAPI.getCourses();
      dispatch(loadCoursesSucess(courses));
    } catch (error) {
      throw error;
    }
  };
}

export function saveCourse(course) {
  return async function(dispatch) {
    try {
      const savedCourse = await CoursesAPI.saveCourse(course);

      savedCourse.id
        ? dispatch(updateCourseSucess(savedCourse))
        : dispatch(createCourseSucess(savedCourse));
    } catch (error) {
      throw error;
    }
  };
}
