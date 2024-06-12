import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PlaygroundCreateExercisePage from './PlaygroundCreateExercisePage';
import queryString from "query-string";
import * as common from "../../../../state/common";
import * as userUtils from "../../../../utils/userUtils";
import {actions} from "../../../../state/exercises";
import {createPlaygroundExercise} from "../../../../state/exercises/actions";

const currentState = (state, { match, location }) => {
  const profile = common.selectors.profile(state);
  const isProfessor = userUtils.isProfessor(profile);
  const userId = profile.userId

  return {
    userId,
    isProfessor,
  };
};

const currentActions = (dispatch, { match, location }) => {
  return {
    onGeneratePlaygroundExercise: ({ exercise }) => {
      dispatch(actions.createPlaygroundExercise({exercise}));
    },
    onLoadExercise: () => {
      console.log("TBD onLoadExercise", "dispatch(actions.getExercise({courseId, guideId, exerciseId, userId}))")
    },
    onReturnToCourse: async () => {
      console.log("TBD onReturnToCourse")
    }
  };
};

export default withRouter(connect(
  currentState,
  currentActions,
)(PlaygroundCreateExercisePage));
