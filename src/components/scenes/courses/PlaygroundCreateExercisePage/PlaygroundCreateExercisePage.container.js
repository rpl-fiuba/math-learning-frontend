import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PlaygroundCreateExercisePage from './PlaygroundCreateExercisePage';
import * as common from "../../../../state/common";
import * as userUtils from "../../../../utils/userUtils";
import {actions} from "../../../../state/exercises";

const currentState = (state, { match, location }) => {
  const profile = common.selectors.profile(state);
  const context = common.selectors.context(state);
  const isProfessor = userUtils.isProfessor(profile);
  const userId = profile.userId


  return {
    userId,
    isProfessor,
    context
  };
};

const currentActions = (dispatch, { match, location }) => {
  return {
    onGeneratePlaygroundExercise: ({ exercise }) => {
      dispatch(actions.createPlaygroundExercise({exercise}));
    }
  };
};

export default withRouter(connect(
  currentState,
  currentActions,
)(PlaygroundCreateExercisePage));
