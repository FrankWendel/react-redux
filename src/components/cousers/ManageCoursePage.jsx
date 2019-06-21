import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';

import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';

function ManageCoursesPage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(err => alert('Loading courses failed' + err));
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch(err => alert('Loading authors failed' + err));
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prev => ({
      ...prev,
      [name]: name === 'authorId' ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveCourse(course).then(() => {
      history.push('/course');
    });
  }
  return (
    <>
      <h2>Manage Courses</h2>
      <CourseForm
        course={course}
        authors={authors}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
      />
    </>
  );
}

ManageCoursesPage.propTypes = {
  course: PropTypes.object.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

function getCourseBySlug(courses, slug) {
  return courses.find(x => x.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
  return {
    course: course,
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursesPage);
