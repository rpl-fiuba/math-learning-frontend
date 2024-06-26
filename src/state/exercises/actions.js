import { push } from 'connected-react-router';
import * as types from './actionTypes';
import * as modalActions from '../modals/actions';
import * as commonSelectors from '../common/selectors';
import * as exerciseSelectors from './selectors';
import * as logger from '../../utils/logger';
import configs from '../../configs/variables';
import constants from '../../utils/constants';
import exercisesClient from '../../clients/exercisesClient';
import {
  FETCH_PLAYGROUND_EXERCISE_LIST_SUCCESS,
  FETCH_PLAYGROUND_EXERCISE_SUCCESS,
  GENERATE_PLAYGROUND_EXERCISE_SUCCESS
} from "./actionTypes";

export function getExercisesSuccess({
  courseId, guideId, userId, exercises
}) {
  const type = userId
    ? types.GET_USER_EXERCISES_SUCCESS
    : types.GET_EXERCISES_SUCCESS;

  return {
    type,
    courseId,
    guideId,
    userId,
    exercises
  };
}

export function getExercisesRequest({ courseId, guideId, userId }) {
  return {
    type: types.GET_EXERCISES_REQUEST,
    courseId,
    guideId,
    userId
  };
}

export function getUserExercisesRequest({ courseId, guideId, userId }) {
  return {
    type: types.GET_USER_EXERCISES_REQUEST,
    userId,
    courseId,
    guideId
  };
}

export function getUserExercisesSuccess({
  courseId, guideId, userId, exercises
}) {
  return {
    type: types.GET_USER_EXERCISES_SUCCESS,
    userId,
    courseId,
    guideId,
    exercises
  };
}

export function getallResolutionsSuccess({
  courseId, guideId, exerciseId, resolutions
}) {
  return {
    type: types.GET_ALL_RESOLUTIONS_SUCCESS,
    courseId,
    guideId,
    exerciseId,
    resolutions
  };
}

export function resolveExerciseRequest({ courseId, guideId, exerciseId, isPlayground }) {
  return {
    type: types.RESOLVE_EXERCISE_REQUEST,
    courseId,
    guideId,
    exerciseId,
    isPlayground
  };
}

export function updateExercise({ courseId, guideId, exerciseId, exercise }) {
  return {
    type: types.UPDATE_EXERCISE,
    courseId,
    guideId,
    exerciseId,
    exercise
  };
}

export function updatePipelineStatus({ courseId, guideId, exerciseId, pipelineStatus }) {
  return {
    type: types.UPDATE_PIPELINE_STATUS,
    courseId,
    guideId,
    exerciseId,
    pipelineStatus
  };
}

export function removeExerciseStep({
  courseId, guideId, exerciseId, isPlayground
}) {
  return {
    type: types.REMOVE_EXERCISE_STEP,
    courseId,
    guideId,
    exerciseId,
    isPlayground
  };
}

export function removeExerciseDetail({
  courseId, guideId, exerciseId
}) {
  return {
    type: types.REMOVE_EXERCISE_DETAIL,
    courseId,
    guideId,
    exerciseId
  };
}

export function exerciseStepValid({
  courseId, guideId, exerciseId, currentExpression, isPlayground
}) {
  return {
    type: types.EXERCISE_STEP_IS_VALID,
    courseId,
    guideId,
    exerciseId,
    currentExpression,
    isPlayground
  };
}

export function exerciseStepIsValid({ courseId, guideId, exerciseId, result, isPlayground }) {
  return {
    type: types.EXERCISE_STEP_IS_INVALID,
    courseId,
    guideId,
    exerciseId,
    result,
    isPlayground
  };
}

export function exerciseResolved({
  courseId, guideId, exerciseId, currentExpression, isPlayground = false
}) {
  return {
    type: types.EXERCISE_RESOLVED,
    courseId,
    guideId,
    exerciseId,
    currentExpression,
    isPlayground
  };
}

export function getExerciseSuccess({
  courseId, guideId, exerciseId, userId, exercise
}) {
  const type = userId
    ? types.GET_USER_EXERCISE_SUCCESS
    : types.GET_EXERCISE_SUCCESS;

  return {
    type,
    courseId,
    guideId,
    exerciseId,
    userId,
    exercise
  };
}

export function changeCurrentExpression({
  courseId,
  guideId,
  exerciseId,
  currentExpression,
  isPlayground
}) {
  return {
    type: types.EXPRESSION_CHANGE_SUCCESSFULLY,
    courseId,
    guideId,
    exerciseId,
    currentExpression,
    isPlayground
  };
}

export function createExerciseRequest({ courseId, guideId }) {
  return {
    type: types.CREATE_EXERCISE_REQUEST,
    courseId,
    guideId
  };
}

export function createExerciseFail({ courseId, guideId, error }) {
  return {
    type: types.CREATE_EXERCISE_FAIL,
    courseId,
    guideId,
    error
  };
}

export function createExerciseSuccess({ courseId, guideId, exercise }) {
  return {
    type: types.CREATE_EXERCISE_SUCCESS,
    courseId,
    guideId,
    exercise
  };
}

export function generatePlaygroundExerciseSuccess({ exercise, exerciseId }) {
  return {
    type: types.GENERATE_PLAYGROUND_EXERCISE_SUCCESS,
    exercise,
    exerciseId
  };
}

export function fetchPlaygroundExerciseSuccess({ exercise }) {
  return {
    type: types.FETCH_PLAYGROUND_EXERCISE_SUCCESS,
    exercise,
  };
}

export function fetchPlaygroundExerciseListSuccess({ exercises }) {
  return {
    type: types.FETCH_PLAYGROUND_EXERCISE_LIST_SUCCESS,
    exercises,
  };
}


export function updateStudentExerciseSuccess({ courseId, guideId, exerciseId, userId, exerciseProps }) {
  return {
    type: types.UPDATE_STUDENT_EXERCISE_SUCCESS,
    courseId,
    guideId,
    exerciseId,
    userId,
    exerciseProps
  };
}

export function evaluateExerciseRequest({ courseId, guideId }) {
  return {
    type: types.EVALUATE_EXERCISE_REQUEST,
    courseId,
    guideId
  };
}

export function evaluateExerciseFail({ courseId, guideId, error }) {
  return {
    type: types.EVALUATE_EXERCISE_FAIL,
    courseId,
    guideId,
    error
  };
}

export function evaluateExerciseSuccess({ courseId, guideId, solvedExercise }) {
  return {
    type: types.EVALUATE_EXERCISE_SUCCESS,
    courseId,
    guideId,
    solvedExercise
  };
}

export function deleteExerciseRequest({ courseId, guideId, exerciseId, isPlayground = false }) {
  return {
    type: types.DELETE_EXERCISE_REQUEST,
    courseId,
    guideId,
    exerciseId,
    isPlayground
  };
}

export function deliverExerciseRequest({ courseId, guideId, exerciseId }) {
  return {
    type: types.DELIVER_EXERCISE_REQUEST,
    courseId,
    guideId,
    exerciseId,
  };
}

export function resetExerciseError() {
  return async (dispatch) => {
    dispatch({ type: types.RESET_EXERCISE_ERROR });
  };
}

export function resetSolvedExercise() {
  return async (dispatch) => {
    dispatch({ type: types.RESET_SOLVED_EXERCISE });
  };
}

export function createPlaygroundExercise({ exercise }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    try {
      const createdExercise = await exercisesClient.generatePlaygroundExercise({ context, exercise });
      dispatch(generatePlaygroundExerciseSuccess({
        exerciseId: createdExercise.exerciseId,
        exercise: createdExercise,
      }));

      await dispatch(push(configs.pathGenerators.playgroundExercise({exerciseId: createdExercise.exerciseId})));
    } catch (err) {
      if (err.status === 401) {
        throw err;
      }
      logger.onError('Error while trying to create playground exercise', err);
      //dispatch(createExerciseFail({ courseId, guideId, error: err.message }));
    }
  };
}

export function getPlaygroundExercise({ exerciseId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    try {
      const exercise = await exercisesClient.getPlaygroundExercise({ context, exerciseId })
      dispatch(fetchPlaygroundExerciseSuccess({ exercise: {...exercise, exerciseId, stepList: exercise.stepList || []} }));
      //await dispatch(push(configs.pathGenerators.playgroundExercise({exerciseId: createdExercise.exerciseId})));
    } catch (err) {
      if (err.status === 401) {
        throw err;
      }
      logger.onError('Error while trying to get playground exercise', err);
      //dispatch(createExerciseFail({ courseId, guideId, error: err.message }));
    }
  };
}

export function createExercise({ guideId, courseId, exercise }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    dispatch(createExerciseRequest({ courseId, guideId }));

    try {
      const createdExercise = await exercisesClient.createExercise({
        context, guideId, courseId, exercise
      });

      dispatch(createExerciseSuccess({
        courseId,
        guideId,
        exerciseId: createdExercise.exerciseId,
        exercise: createdExercise,
      }));

      await dispatch(push(configs.pathGenerators.courseGuide(courseId, guideId)));
    } catch (err) {
      if (err.status === 401) {
        throw err;
      }
      logger.onError('Error while trying to create exercise', err);

      dispatch(createExerciseFail({ courseId, guideId, error: err.message }));
    }
  };
}

export function evaluateExercise({ guideId, courseId, exercise }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    dispatch(evaluateExerciseRequest({ courseId, guideId }));

    try {
      const solvedExercise = await exercisesClient.evaluateExercise({
        context, guideId, courseId, exercise
      });

      dispatch(evaluateExerciseSuccess({
        courseId, guideId, solvedExercise: solvedExercise.result,
      }));
    } catch (err) {
      if (err.status === 401) {
        throw err;
      }
      logger.onError('Error while trying to evaluate the exercise', err);

      dispatch(evaluateExerciseFail({ courseId, guideId, error: err.message }));
    }
  };
}

export function deliverExercise({ courseId, guideId, exerciseId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    dispatch(deliverExerciseRequest({ courseId, guideId, exerciseId }));
    dispatch(modalActions.hideModal());

    await exercisesClient.deliverExercise({
      context, guideId, courseId, exerciseId
    });
  };
}

export function deleteExerciseStep({
  guideId, courseId, exerciseId, isPlayground = false
}) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);
    const currentExercise = isPlayground ? exerciseSelectors.getPlaygroundExercise(state, { exerciseId }) : exerciseSelectors.getExercise(state, { courseId, guideId, exerciseId });

    dispatch(removeExerciseStep({ courseId, guideId, exerciseId, isPlayground }));
    dispatch(modalActions.hideModal());

    try {
      await exercisesClient.removeExerciseStep({ context, guideId, courseId, exerciseId, isPlayground });
    } catch (err) {
      if (err.status === 401) {
        throw err;
      }
      // back to the previous state
      dispatch(updateExercise({
        courseId, guideId, exerciseId, exercise: currentExercise
      }));
    }
  };
}

export function getExercises({ courseId, guideId, userId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    dispatch(getExercisesRequest({ courseId, guideId, userId }));

    const exercises = await exercisesClient.getExercises({
      context, courseId, guideId, userId
    });
    dispatch(getExercisesSuccess({
      courseId, guideId, userId, exercises
    }));
  };
}

export function getPlaygroundExercises({ courseId, guideId, userId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    const exercises = await exercisesClient.getPlaygroundExercises({
      context, userId
    });
    dispatch(fetchPlaygroundExerciseListSuccess({ userId, exercises}));
  };
}


export function getAllResolutions({ courseId, guideId, exerciseId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    const resolutions = await exercisesClient.getAllResolutions({
      context, courseId, guideId, exerciseId
    });
    dispatch(getallResolutionsSuccess({
      context, courseId, guideId, exerciseId, resolutions
    }));
  };
}

export function checkPipelineStatus({ guideId, courseId, exerciseId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    let timeToWait = 500;
    let amountOfRetries = 0;
    let pipelineStatus = constants.WAITING_PIPELINE_STATUS;
    while (pipelineStatus === constants.WAITING_PIPELINE_STATUS && amountOfRetries < 10) {
      // eslint-disable-next-line
      await new Promise((resolve) => setTimeout(resolve, timeToWait));

      // eslint-disable-next-line no-await-in-loop
      const status = await exercisesClient.checkPipelineStatus({ context, guideId, courseId, exerciseId });
      pipelineStatus = status.pipelineStatus;
      amountOfRetries += 1;
      timeToWait += timeToWait;
    }

    dispatch(updatePipelineStatus({ courseId, guideId, exerciseId, pipelineStatus }));
  };
}

export function getUserExercises({ courseId, guideId, userId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    dispatch(getUserExercisesRequest({ courseId, guideId, userId }));

    const exercises = await exercisesClient.getExercises({ // send userId as query
      context, courseId, guideId, userId
    });
    dispatch(getUserExercisesSuccess({
      courseId, guideId, userId, exercises
    }));
  };
}

export function getExercise({
  guideId, courseId, userId, exerciseId
}) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    const exercise = await exercisesClient.getExercise({
      context,
      guideId,
      courseId,
      exerciseId,
      userId
    });

    dispatch(getExerciseSuccess({
      courseId, guideId, exerciseId, userId, exercise
    }));
  };
}

export function resolveExercise({
  courseId,
  guideId,
  exerciseId,
  currentExpression,
  isPlayground = false
}) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    dispatch(resolveExerciseRequest({ courseId, guideId, exerciseId, isPlayground }));

    let result
    if (isPlayground) {
      result = await exercisesClient.resolvePlaygroundExercise({
        context,
        exerciseId,
        currentExpression
      });
    } else {
      result = await exercisesClient.resolveExercise({
        context,
        courseId,
        guideId,
        exerciseId,
        currentExpression
      });
    }

    if (result.exerciseStatus === 'valid') {
      dispatch(exerciseStepValid({
        courseId, guideId, exerciseId, currentExpression, isPlayground
      }));
    } else if (result.exerciseStatus === 'resolved') {
      dispatch(exerciseResolved({
        courseId, guideId, exerciseId, currentExpression, isPlayground
      }));
    } else {
      dispatch(exerciseStepIsValid({ courseId, guideId, exerciseId, result, isPlayground }));
    }
  };
}

export function deleteExercise({ courseId, guideId, exerciseId, isPlayground = false }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    dispatch(deleteExerciseRequest({ courseId, guideId, exerciseId, isPlayground }));
    dispatch(modalActions.hideModal());

    try {
      await exercisesClient.deleteExercise({
        context, courseId, guideId, exerciseId, isPlayground
      });
    } catch (err) {
      if (err.status === 401) {
        throw err;
      }
      logger.onError('Error while trying to delete exercise');
    }
  };
}

export function updateExerciseAsProfessor({
  courseId, guideId, exerciseId, exercise
}) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    dispatch(updateExercise({ courseId, guideId, exerciseId, exercise }));
    dispatch(modalActions.hideModal());

    try {
      await exercisesClient.updateExerciseAsProfessor({
        context, courseId, guideId, exerciseId, exercise
      });
    } catch (err) {
      if (err.status === 401) {
        throw err;
      }
      logger.onError('Error while trying to delete exercise');
    }
  };
}

export function updateStudentExercise({
  courseId, guideId, exerciseId, userId, calification
}) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);
    const exerciseProps = { calification };

    dispatch(updateStudentExerciseSuccess({ courseId, guideId, exerciseId, userId, exerciseProps }));

    await exercisesClient.updateUserExercise({
      context, courseId, guideId, exerciseId, userId, calification
    });
  };
}
