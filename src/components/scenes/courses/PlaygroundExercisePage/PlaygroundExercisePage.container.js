import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PlaygroundExercisePage from './PlaygroundExercisePage';
import * as common from "../../../../state/common";
import * as userUtils from "../../../../utils/userUtils";
import {actions} from "../../../../state/exercises";
import * as exercises from "../../../../state/exercises";
import {push} from "connected-react-router";
import configs from "../../../../configs/variables";

const currentState = (state, { match, location }) => {
  const { exerciseId } = match.params;

  const profile = common.selectors.profile(state);
  const isProfessor = userUtils.isProfessor(profile);
  const userId = profile.userId

  return {
    userId,
    isProfessor,
    exerciseId,
    isLoadingExercise: exercises.selectors.isLoadingPlaygroundExercise(state, { exerciseId }),
    exercise: exercises.selectors.getPlaygroundExercise(state, { exerciseId }),
  };
};

const currentActions = (dispatch, { match, location }) => {
  return {
    onGetPlaygroundExercise: ({ exerciseId }) => {
      dispatch(actions.getPlaygroundExercise({ exerciseId }));
    },
    onReturnButtonCallback: async () => {
      await dispatch(push(configs.paths.playgroundList));
    }
  };
};

export default withRouter(connect(
  currentState,
  currentActions,
)(PlaygroundExercisePage));
