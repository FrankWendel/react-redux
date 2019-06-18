import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as courseActions from '../../redux/actions/courseActions';

// eslint-disable-next-line react/prefer-stateless-function
class CoursesPage extends React.Component {
  state = {
    course: {
      title: ''
    }
  };

  handleChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { course } = this.state;

    this.props.actions.createCourses(course);
    alert(course.title);
  };

  render() {
    const { course } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input type="text" onChange={this.handleChange} value={course.title} />

        <input type="submit" value="Save" />

        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
