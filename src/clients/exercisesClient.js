import _ from 'lodash';
import fetch from 'node-fetch';
import requestUtils from './requestUtils';
import confs from '../configs/variables';
import guide from "../components/scenes/courses/CoursePage/components/Guide";

const { url } = confs.services.exercises;

const createExercise = async ({
  context,
  courseId,
  guideId,
  exercise
}) => {
  const profileUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises`;

  const response = await fetch(profileUrl, {
    method: 'post',
    body: JSON.stringify(exercise),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const generatePlaygroundExercise = async ({
                             context,
                             exercise
                           }) => {
  const exerciseUrl = `${url}/playground/exercises`
  const response = await fetch(exerciseUrl, {
    method: 'post',
    body: JSON.stringify(exercise),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });
  return requestUtils.processResponse(response);
};


const getExercise = async ({
  context,
  courseId,
  guideId,
  userId,
  exerciseId
}) => {
  const exerciseUrl = userId
    ? `${url}/courses/${courseId}/guides/${guideId}/user/${userId}/exercises/${exerciseId}`
    : `${url}/courses/${courseId}/guides/${guideId}/user/exercises/${exerciseId}`;

  const response = await fetch(exerciseUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const deliverExercise = async ({
  context,
  courseId,
  guideId,
  exerciseId
}) => {
  const profileUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}/deliver`;

  const response = await fetch(profileUrl, {
    method: 'put',
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const resolveExercise = async ({
  context,
  courseId,
  guideId,
  exerciseId,
  currentExpression
}) => {
  const profileUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}/resolve`;

  const response = await fetch(profileUrl, {
    method: 'post',
    body: JSON.stringify({
      currentExpression
    }),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const resolvePlaygroundExercise = async ({
                                 context,
                                 exerciseId,
                                 currentExpression
                               }) => {
  const exerciseUrl = `${url}/playground/exercises/${exerciseId}/resolve`;

  const response = await fetch(exerciseUrl, {
    method: 'post',
    body: JSON.stringify({
      currentExpression
    }),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const evaluateExercise = async ({
  context,
  courseId,
  guideId,
  exercise
}) => {
  const profileUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises/evaluate`;

  const response = await fetch(profileUrl, {
    method: 'post',
    body: JSON.stringify(exercise),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const removeExerciseStep = async ({
  context,
  courseId,
  guideId,
  exerciseId,
  isPlayground
}) => {
  const removeStepUrl = isPlayground ? `${url}/playground/exercises/${exerciseId}/step` : `${url}/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}/step`;
  const response = await fetch(removeStepUrl, {
    method: 'delete',
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });
  return requestUtils.processResponse(response);
};

const addUserToCourse = async ({
  context,
  courseId,
  userId
}) => {
  const profileUrl = `${url}/courses/${courseId}/users`;

  const response = await fetch(profileUrl, {
    method: 'post',
    body: JSON.stringify({ userId }),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const updateUserExercise = async ({
  context,
  courseId,
  guideId,
  userId,
  exerciseId,
  calification
}) => {
  const exercisesUrl = userId
    ? `${url}/courses/${courseId}/guides/${guideId}/user/${userId}/exercises/${exerciseId}`
    : `${url}/courses/${courseId}/guides/${guideId}/user/exercises/${exerciseId}`;

  const response = await fetch(exercisesUrl, {
    method: 'put',
    body: JSON.stringify(_.omitBy({ calification }, _.isNil)),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const updateExerciseAsProfessor = async ({
  context,
  courseId,
  guideId,
  exerciseId,
  exercise
}) => {
  const requestUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}`;
  const response = await fetch(requestUrl, {
    method: 'put',
    body: JSON.stringify(_.omitBy({ ...exercise }, _.isNil)),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const getPlaygroundExercise = async ({ context, exerciseId }) => {
  const exerciseUrl = `${url}/playground/exercises/${exerciseId}`;
  const response = await fetch(exerciseUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });
  return requestUtils.processResponse(response);
};

const getExercises = async ({
  context,
  courseId,
  guideId,
  userId
}) => {
  const exercisesUrl = userId
    ? `${url}/courses/${courseId}/guides/${guideId}/user/${userId}/exercises`
    : `${url}/courses/${courseId}/guides/${guideId}/user/exercises`;

  const response = await fetch(exercisesUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const getPlaygroundExercises = async ({
                              context,
                              userId
                            }) => {
  const exercisesUrl = `${url}/playground/exercises`
  const response = await fetch(exercisesUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};


const deleteExercise = async ({
  context, courseId, guideId, exerciseId, isPlayground = false
}) => {
  const exerciseUrl = isPlayground ? `${url}/playground/exercises/${exerciseId}` : `${url}/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}`;
  const response = await fetch(exerciseUrl, {
    method: 'delete',
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const getExerciseErrors = async ({ context, courseId }) => {
  const exerciseUrl = `${url}/courses/${courseId}/errors/statistics`;
  const response = await fetch(exerciseUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const getStudentProgress = async ({ context, courseId, guideId }) => {
  const courseIdEncoded = encodeURIComponent(courseId);
  const guideIdEncoded = encodeURIComponent(guideId);
  const failedUrl = `${url}/courses/${courseIdEncoded}/guides/${guideIdEncoded}/statistics/failed`;
  const initiatedUrl = `${url}/courses/${courseIdEncoded}/guides/${guideIdEncoded}/statistics/initiated`;
  const resolvedUrl = `${url}/courses/${courseIdEncoded}/guides/${guideIdEncoded}/statistics/resolved`;
  const resolvedResponse = await fetch(resolvedUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });
  const initiatedResponse = await fetch(initiatedUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });
  const failedResponse = await fetch(failedUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });
  const resolvedData = await requestUtils.processResponse(resolvedResponse)
  const initiatedData = await requestUtils.processResponse(initiatedResponse)
  const failedData = await requestUtils.processResponse(failedResponse)

  return {resolved: resolvedData, initiated: initiatedData, failed: failedData}
};


const getExerciseStepCount = async ({ context, courseId }) => {
  const exerciseUrl = `${url}/courses/${courseId}/steps/statistics`;
  const response = await fetch(exerciseUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const getUsersQualifications = async ({ context, courseId }) => {
  const exerciseUrl = `${url}/courses/${courseId}/qualifications/statistics`;
  const response = await fetch(exerciseUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const checkPipelineStatus = async ({ context, courseId, guideId, exerciseId }) => {
  const exerciseUrl = `${url}/courses/${courseId}/guides/${guideId}/exercises/${exerciseId}/status`;
  const response = await fetch(exerciseUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const getAllResolutions = async ({ context, courseId, guideId, exerciseId }) => {
  const exerciseUrl = `${url}/courses/${courseId}/guides/${guideId}/user/exercises/${exerciseId}/resolutions`;

  const response = await fetch(exerciseUrl, {
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

const copyCourse = async ({ context, course, sourceCourseId }) => {
  const exerciseUrl = `${url}/courses/${sourceCourseId}/copy`;

  const response = await fetch(exerciseUrl, {
    method: 'post',
    body: JSON.stringify({
      targetCourseId: course.courseId
    }),
    headers: {
      authorization: context.accessToken,
      'Content-Type': 'application/json'
    }
  });

  return requestUtils.processResponse(response);
};

export default {
  addUserToCourse,
  checkPipelineStatus,
  createExercise,
  deliverExercise,
  copyCourse,
  evaluateExercise,
  getExercise,
  getExercises,
  getExerciseErrors,
  getExerciseStepCount,
  getAllResolutions,
  getUsersQualifications,
  updateUserExercise,
  removeExerciseStep,
  resolveExercise,
  deleteExercise,
  updateExerciseAsProfessor,
  getStudentProgress,
  generatePlaygroundExercise,
  getPlaygroundExercise,
  resolvePlaygroundExercise,
  getPlaygroundExercises
};
