import * as types from './actionTypes';
import * as commonTypes from '../common/actionTypes';

const initialState = {
  data: {
    courses: {}
  },
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.GET_COURSE_USERS_ACTIVITY_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          courses: {
            ...state.data.courses,
            [action.courseId]: {
              ...state.data.courses[action.courseId],
              usersActivity: action.statistics
            }
          }
        }
      };
    }

    case types.GET_COURSE_EXECISE_ERRORS_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          courses: {
            ...state.data.courses,
            [action.courseId]: {
              ...state.data.courses[action.courseId],
              exerciseErrors: action.statistics
            }
          }
        }
      };
    }

    case types.GET_COURSE_EXECISE_STEP_COUNT_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          courses: {
            ...state.data.courses,
            [action.courseId]: {
              ...state.data.courses[action.courseId],
              exerciseStepCount: action.statistics
            }
          }
        }
      };
    }

    case types.GET_GUIDE_STUDENT_PROGRESS_SUCCESS: {
      try {
        const newState = {
          ...state,
          data: {
            ...state.data,
            guides: {
              ...state.data.guides || {},
              [action.guideId]: {
                    progress: action.statistics
              }
            }
          }
        };
        return newState
      } catch (e) {
        console.log('Error: ', e);
      }
    }

    case types.GET_USERS_QUALIFICATIONS_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          courses: {
            ...state.data.courses,
            [action.courseId]: {
              ...state.data.courses[action.courseId],
              usersQualifications: action.statistics
            }
          }
        }
      };
    }

    case commonTypes.LOGOUT_SUCCESS: {
      // cleaning the state
      return initialState;
    }

    default:
      return state;
  }
}
