import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';

import PlaygroundListExercisesPage from './PlaygroundListExercisesPage';
import configs from '../../../../configs/variables';
import * as exercises from '../../../../state/exercises';

const currentState = (state, {}) => {
  return {
    exercises: exercises.selectors.getPlaygroundExercises(state),
    isLoadingExercises: exercises.selectors.isLoadingPlaygroundExercises(state)
  };
};

const currentActions = (dispatch) => ({
  getExercises: (payload) => dispatch(exercises.actions.getPlaygroundExercises(payload)),
  onCreateExercise: async () => await dispatch(push(configs.paths.playgroundNew)),
});

export default withRouter(connect(
  currentState,
  currentActions,
)(PlaygroundListExercisesPage));
