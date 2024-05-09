import { connect } from 'react-redux';
import * as statisticActions from '../../../../../../../state/statistics/actions';
import * as statisticSelectors from '../../../../../../../state/statistics/selectors';
import * as courses from '../../../../../../../state/courses';
import StudentProgressPage from './StudentProgressPage';

const currentState = (state, { course }) => {
  const statistics = !!(state?.statistics?.data?.guides) ? state?.statistics?.data?.guides : statisticSelectors.getGuideStudentProgress(state, { courseId: course.courseId, guideId: course.guides[0].guideId });
  const users = courses.selectors.getUsers(state, course.courseId);
  const students = users.filter((user) => user.role === 'student');

  return {
    statistics,
    students
  };
};

const currentActions = (dispatch) => ({
  getGuideStudentProgress: (courseId, guideId) => dispatch(statisticActions.getStudentProgress({ courseId, guideId })),
});

export default connect(
  currentState,
  currentActions
)(StudentProgressPage);
