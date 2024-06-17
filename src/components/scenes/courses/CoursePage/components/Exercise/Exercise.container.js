import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Exercise from './Exercise';
import configs from '../../../../../../configs/variables';
import * as actions from '../../../../../../state/exercises/actions';
import * as modalTypes from '../../../../../../state/modals/modalTypes';
import * as modalActions from '../../../../../../state/modals/actions';

const currentActions = (dispatch, { exercise, userId, isPlayground = false }) => ({
  onDeleteExercise: () => {
    dispatch(modalActions.loadModal(modalTypes.CONFIRM_ACTION_MODAL, {
      title: '¿ Realmente desea eliminar el ejercicio ?',
      explanation: 'Al hacerlo, no podrás recuperarlo',
      acceptButton: 'Eliminar ejercicio',
      actionProps: {
        guideId: exercise.guideId,
        courseId: exercise.courseId,
        exerciseId: exercise.exerciseId,
        isPlayground: exercise.isPlayground
      },
      actionFunction: actions.deleteExercise
    }));
  },
  onEditExercise: (payload) => {
    dispatch(modalActions.loadModal(modalTypes.EDIT_EXERCISE_MODAL, payload));
  },
  onCheckExerciseStatus: () => {
    dispatch(actions.checkPipelineStatus(exercise));
  },
  onClickExercise: async () => {
    if (isPlayground) {
      await dispatch(push(configs.pathGenerators.playgroundExercise({exerciseId: exercise.exerciseId})));
    } else if (userId) {
      await dispatch(push(configs.pathGenerators.userExercise({ ...exercise, userId })));
    } else {
      await dispatch(push(configs.pathGenerators.exercise(exercise)));
    }
  },
});

export default connect(
  null,
  currentActions,
)(Exercise);
