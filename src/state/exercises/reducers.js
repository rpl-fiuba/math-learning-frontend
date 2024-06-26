import _ from 'lodash';
import * as types from './actionTypes';
import * as commonTypes from '../common/actionTypes';
import * as idUtils from '../../utils/idUtils';

const initialState = {
  data: {
    list: {},
    detail: {},
    students: {
      list: {},
      detail: {}
    },
    creation: {
      isEvaluatingExercise: false,
      isCreatingExercise: false,
      solvedCreatingExercise: null,
      creatingExerciseError: null
    }
  },
};

const exerciseDetailToReset = {
  hints: []
};

function getExerciseList(isPlayground, currentState, courseId, guideId) {
  if (isPlayground) {
    return currentState.data.detail.playground || {};
  } else {
    const courseGuideId = idUtils.courseGuideId({courseId, guideId});
    return currentState.data.detail[courseGuideId] || {};
  }
}

function getCurrentExercise({isPlayground, currentState, courseId, guideId, exerciseId}) {
  if (isPlayground) {
    return currentState.data.detail.playground[exerciseId].exercise || {};
  } else {
    const courseGuideId = idUtils.courseGuideId({courseId, guideId});
    return currentState.data.detail[courseGuideId][exerciseId].exercise || {};
  }
}


function updateExerciseDetail({ state: currentState, courseId, guideId, exerciseId, exerciseProps = {}, isPlayground = false }) {
  let newExercise;
  const exercises = getExerciseList(isPlayground, currentState, courseId, guideId);

  if (!exercises[exerciseId]) {
    // nothing to update since it does not exist
    return exercises;
  }
  // updating exercise
  // intentional (to prevent re render the components)
  const currentExerciseDetail = exercises[exerciseId];
  if (!currentExerciseDetail.exercise) {
    newExercise = { ...exerciseProps.exercise };
  } else {
    newExercise = {
      ...currentExerciseDetail.exercise,
      ...exerciseProps.exercise
    };
  }

  // updating exercises detail object
  const newDetailExercises = {
    ...exercises,
    [exerciseId]: {
      ...currentExerciseDetail,
      ...exerciseProps,
      exercise: newExercise
    }
  };

  return newDetailExercises;
}

function updateExerciseList({ state: currentState, courseId, guideId, exerciseId, exerciseProps = {}, isPlayground = false }) {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });
  let currentCourseGuideList;

  if (isPlayground) {
    // TODO - implement playground list
    // currentCourseGuideList = currentState.data.list.playground
    return null
  } else {
    currentCourseGuideList = currentState.data.list[courseGuideId];
  }

  if (!currentCourseGuideList) {
    return null;
  }

  // updating the exercise list
  const newCourseGuideList = currentState.data.list[courseGuideId];
  if (exerciseProps.exercise) {
    const exerciseIndex = newCourseGuideList.findIndex((value) => value.exerciseId === exerciseId);

    // updating only if the exercise already exists in the list
    if (exerciseIndex !== -1) {
      newCourseGuideList[exerciseIndex] = {
        ...newCourseGuideList[exerciseIndex],
        ...exerciseProps.exercise
      };

      newCourseGuideList[exerciseIndex] = _.pickBy(newCourseGuideList[exerciseIndex]);
    }
  }

  return newCourseGuideList;
}

function updateExerciseState({
  state: currentState, courseId, guideId, exerciseId, exerciseProps = {}, isPlayground = false
}) {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });

  // making the new detail and list objects
  const newDetailExercises = updateExerciseDetail({
    state: currentState, courseId, guideId, exerciseId, exerciseProps, isPlayground
  });
  const newCourseGuideList = updateExerciseList({
    state: currentState, courseId, guideId, exerciseId, exerciseProps, isPlayground
  });

  const { list } = currentState.data;
  const { detail } = currentState.data;

  if (newCourseGuideList) {
    list[courseGuideId] = [...newCourseGuideList]; // intentional (to re render the components)
  }
  if (newDetailExercises) {
    if (isPlayground) {
      detail.playground = newDetailExercises;
    } else {
      detail[courseGuideId] = newDetailExercises;
    }
  }

  return {
    ...currentState,
    data: {
      ...currentState.data,
      detail,
      list,
    }
  };
}

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.GET_EXERCISES_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          isLoadingExercises: true
        }
      };
    }

    case types.GET_EXERCISES_SUCCESS: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));

      return {
        ...state,
        data: {
          ...state.data,
          list: {
            ...state.data.list,
            [courseGuideId]: action.exercises
          }
        }
      };
    }

    case types.GET_USER_EXERCISES_SUCCESS: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));

      return {
        ...state,
        data: {
          ...state.data,
          students: {
            ...state.data.students,
            list: {
              ...state.data.students.list,
              [courseGuideId]: {
                ...state.data.students.list[courseGuideId],
                [action.userId]: action.exercises
              }
            }
          }
        }
      };
    }

    case types.UPDATE_STUDENT_EXERCISE_SUCCESS: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));

      // first updating the exercise detail
      const detailObj = state.data.students.detail[courseGuideId] || {};
      const userDetailExercises = detailObj[action.userId];
      const userDetailExercise = userDetailExercises[action.exerciseId];
      const newDetailExercise = {
        ...userDetailExercise,
        exercise: {
          ...userDetailExercise.exercise,
          ...action.exerciseProps
        },
        isLoading: false
      };
      const newDetailObject = {
        ...state.data.students.detail,
        [courseGuideId]: {
          ...state.data.students.detail[courseGuideId],
          [action.userId]: {
            ...state.data.students.detail[courseGuideId][action.userId],
            [action.exerciseId]: newDetailExercise
          }
        }
      };

      // second updating the exercise in the list (only if exists)
      const newListObj = state.data.students.list;

      const courseList = state.data.students.list[courseGuideId] || {};
      if (courseList[action.userId]) {
        const userListExercises = courseList[action.userId] || [];
        const newUserListExercises = userListExercises.map((exercise) => {
          if (exercise.exerciseId === action.exerciseId) {
            return { ...exercise, ...action.exerciseProps };
          }
          return exercise;
        });

        newListObj[courseGuideId] = {
          ...state.data.students.list[courseGuideId],
          [action.userId]: newUserListExercises
        };
      }

      return {
        ...state,
        data: {
          ...state.data,
          students: {
            ...state.data.students,
            list: newListObj,
            detail: newDetailObject
          }
        }
      };
    }

    case types.GET_ALL_RESOLUTIONS_SUCCESS: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const currentDetailExercises = state.data.detail[courseGuideId] || {};

      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            [courseGuideId]: {
              ...currentDetailExercises,
              [action.exerciseId]: {
                ...currentDetailExercises[action.exerciseId],
                resolutions: action.resolutions
              }
            }
          }
        }
      };
    }

    case types.CREATE_EXERCISE_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          creation: {
            ...state.data.creation,
            isCreatingExercise: true,
            creatingExerciseError: null
          }
        }
      };
    }

    case types.CREATE_EXERCISE_FAIL: {
      return {
        ...state,
        data: {
          ...state.data,
          creation: {
            ...state.data.creation,
            isCreatingExercise: false,
            creatingExerciseError: action.error
          }
        }
      };
    }

    case types.EVALUATE_EXERCISE_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          creation: {
            ...state.data.creation,
            solvedCreatingExercise: action.solvedExercise,
            isEvaluatingExercise: false,
            creatingExerciseError: null
          }
        }
      };
    }

    case types.EVALUATE_EXERCISE_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          creation: {
            ...state.data.creation,
            solvedCreatingExercise: null,
            isEvaluatingExercise: true,
            creatingExerciseError: null
          }
        }
      };
    }

    case types.EVALUATE_EXERCISE_FAIL: {
      return {
        ...state,
        data: {
          ...state.data,
          creation: {
            ...state.data.creation,
            solvedCreatingExercise: null,
            isEvaluatingExercise: false,
            creatingExerciseError: action.error
          }
        }
      };
    }

    case types.RESET_EXERCISE_ERROR: {
      return {
        ...state,
        data: {
          ...state.data,
          creation: {
            ...state.data.creation,
            creatingExerciseError: null
          }
        }
      };
    }

    case types.RESET_SOLVED_EXERCISE: {
      return {
        ...state,
        data: {
          ...state.data,
          creation: {
            ...state.data.creation,
            solvedCreatingExercise: null
          }
        }
      };
    }

    case types.CREATE_EXERCISE_SUCCESS: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const { exerciseId } = action.exercise;
      const currentListExercises = state.data.list[courseGuideId] || [];
      const currentDetailExercises = state.data.detail[courseGuideId] || {};

      return {
        ...state,
        data: {
          ...state.data,
          creation: {
            ...state.data.creation,
            isCreatingExercise: false,
            creatingExerciseError: null,
          },
          detail: {
            ...state.data.detail,
            [courseGuideId]: {
              ...currentDetailExercises,
              [exerciseId]: {
                exercise: action.exercise,
              }
            }
          },
          list: {
            ...state.data.list,
            [courseGuideId]: [
              ...currentListExercises,
              action.exercise
            ]
          },
        }
      };
    }

    case types.GET_EXERCISE_SUCCESS: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));

      const exercises = state.data.detail[courseGuideId] || {};
      const newExercisesState = {
        ...exercises,
        [action.exerciseId]: {
          exercise: action.exercise,
          isLoading: false,
          exerciseStatus: 'editing',
          currentExpression: { expression: '', variables: [] }
        }
      };

      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            [courseGuideId]: newExercisesState
          }
        }
      };
    }

    case types.FETCH_PLAYGROUND_EXERCISE_LIST_SUCCESS: {

      return {
        ...state,
        data: {
          ...state.data,
          list: {
            ...state.data.list,
            playground: action.exercises.map(e => ({ ...e, isPlayground: true }))
          }
        }
      };
    }

    case types.FETCH_PLAYGROUND_EXERCISE_SUCCESS: {
      const exercises = state.data.detail["playground"] || {};
      const newExercisesState = {
        ...exercises,
        [action.exercise.exerciseId]: {
          exercise: {...action.exercise, isPlayground: true},
          isLoading: false,
          currentExpression: { expression: '', variables: [] },
          isPlayground: true
        }
      };

      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            "playground": newExercisesState
          }
        }
      };
    }


    case types.GET_USER_EXERCISE_SUCCESS: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));

      const detailObj = state.data.students.detail[courseGuideId] || {};
      const userExercises = detailObj[action.userId];
      const userDetailObj = {
        ...detailObj,
        [action.userId]: {
          ...userExercises,
          [action.exerciseId]: {
            exercise: action.exercise,
            isLoading: false
          }
        }
      };

      return {
        ...state,
        data: {
          ...state.data,
          students: {
            ...state.data.students,
            detail: {
              ...state.data.students.detail,
              [courseGuideId]: {
                ...state.data.students.detail[courseGuideId],
                ...userDetailObj
              }
            }
          }
        }
      };
    }

    case types.RESOLVE_EXERCISE_REQUEST: {
      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: { exerciseStatus: 'processing' },
        isPlayground: action.isPlayground
      });
    }

    case types.EXERCISE_RESOLVED: {
      const currentExercise = getCurrentExercise({
        courseId: action.courseId,
        currentState: state,
        exerciseId: action.exerciseId,
        guideId: action.guideId,
        isPlayground: action.isPlayground
      })

      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          exerciseStatus: 'editing',
          currentExpression: { expression: '', variables: [] },
          exercise: {
            ...currentExercise,
            ...exerciseDetailToReset,
            stepList: [
              ...currentExercise.stepList,
              action.currentExpression
            ],
            state: 'resolved'
          },
        },
        isPlayground: action.isPlayground
      });
    }

    case types.EXERCISE_STEP_IS_VALID: {
      const currentExercise = getCurrentExercise({
        courseId: action.courseId,
        currentState: state,
        exerciseId: action.exerciseId,
        guideId: action.guideId,
        isPlayground: action.isPlayground
      })

      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          exerciseStatus: 'editing',
          exercise: {
            ...currentExercise,
            ...exerciseDetailToReset,
            stepList: [
              ...currentExercise.stepList,
              action.currentExpression
            ]
          },
        },
        isPlayground: action.isPlayground
      });
    }

    case types.EXERCISE_STEP_IS_INVALID: {
      const currentExercise = getCurrentExercise({
        courseId: action.courseId,
        currentState: state,
        exerciseId: action.exerciseId,
        guideId: action.guideId,
        isPlayground: action.isPlayground
      })

      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          exerciseStatus: 'invalid',
          exercise: {
            ...currentExercise,
            hints: action.result.hints || []
          },
        },
        isPlayground: action.isPlayground
      });
    }

    case types.EXPRESSION_CHANGE_SUCCESSFULLY: {
      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        isPlayground: action.isPlayground,
        exerciseProps: {
          exerciseStatus: 'editing',
          currentExpression: action.currentExpression
        }
      });
    }

    case types.UPDATE_EXERCISE: {
      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          exercise: action.exercise,
        }
      });
    }

    case types.UPDATE_PIPELINE_STATUS: {
      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          exercise: { pipelineStatus: action.pipelineStatus },
        }
      });
    }

    case types.REMOVE_EXERCISE_STEP: {
      const currentExercise = getCurrentExercise({
        courseId: action.courseId,
        currentState: state,
        exerciseId: action.exerciseId,
        guideId: action.guideId,
        isPlayground: action.isPlayground
      })
      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          exerciseStatus: 'editing',
          exercise: {
            ...currentExercise,
            ...exerciseDetailToReset,
            state: 'incompleted',
            stepList: currentExercise.stepList.slice(0, -1)
          }
        },
        isPlayground: action.isPlayground
      });
    }

    case types.DELETE_EXERCISE_REQUEST: {
      if(action.isPlayground){
        const newDetail = _.omit(state.data.detail.playground, action.exerciseId);
        const newList = state.data.list["playground"].filter((exercise) => exercise.exerciseId !== action.exerciseId);
        return {
          ...state,
          data: {
            ...state.data,
            detail: {
              ...state.data.detail,
              playground: newDetail
            },
            list: {
              ...state.data.list,
              playground: newList
            }
          }
        };
      } else {
        const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
        const newDetail = _.omit(state.data.detail[courseGuideId], action.exerciseId);
        const newList = state.data.list[courseGuideId].filter((exercise) => exercise.exerciseId !== action.exerciseId);
        return {
          ...state,
          data: {
            ...state.data,
            detail: {
              ...state.data.detail,
              [courseGuideId]: newDetail
            },
            list: {
              ...state.data.list,
              [courseGuideId]: newList
            }
          }
        };
      }
    }

    case types.REMOVE_EXERCISE_DETAIL: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const newDetail = _.omit(state.data.detail[courseGuideId], action.exerciseId);

      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            [courseGuideId]: newDetail
          }
        }
      };
    }

    case types.DELIVER_EXERCISE_REQUEST: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const currentExercise = state.data.detail[courseGuideId][action.exerciseId].exercise;

      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          exercise: {
            ...currentExercise,
            state: 'delivered'
          },
        }
      });
    }

    case commonTypes.LOGOUT_SUCCESS: {
      // cleaning the state
      return initialState;
    }

    default:
      return state;
  }
}
