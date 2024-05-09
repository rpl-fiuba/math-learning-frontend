export const getCourseUsersActivity = (state, { courseId }) => {
  const courseStatistics = state.statistics.data.courses[courseId];

  return courseStatistics && courseStatistics.usersActivity;
};

export const getCourseExerciseErrors = (state, { courseId }) => {
  const courseStatistics = state.statistics.data.courses[courseId];

  return courseStatistics && courseStatistics.exerciseErrors;
};

export const getCourseExerciseStepCount = (state, { courseId }) => {
  const courseStatistics = state.statistics.data.courses[courseId];

  return courseStatistics && courseStatistics.exerciseStepCount;
};

export const getGuideStudentProgress = (state, { courseId, guideId }) => {
  return state.statistics.data?.guides;
};

export const getUsersQualifications = (state, { courseId }) => {
  const courseStatistics = state.statistics.data.courses[courseId];

  return courseStatistics && courseStatistics.usersQualifications;
};
