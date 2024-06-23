import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../../state/exercises/actions';
import * as selectors from '../../../../state/exercises/selectors';
import * as modalSelectors from '../../../../state/modals/selectors';
import * as modalTypes from '../../../../state/modals/modalTypes';
import * as modalActions from '../../../../state/modals/actions';

import Intersection from './Intersection';
import {
  DOMAIN_EXPLANATION,
  FRACTION_WRITING, INTERVAL_REAL_EXCEPTION, INTERVAL_WITH_COMMA,
  MULTIPLY_SYMBOL_REQUIRED
} from "../../../Modals/BaseStepsExerciseHelpModal/CommonModalScreens";


const modalScreens = [DOMAIN_EXPLANATION, INTERVAL_WITH_COMMA, INTERVAL_REAL_EXCEPTION, FRACTION_WRITING, MULTIPLY_SYMBOL_REQUIRED]
const startupModalScreens = []

const currentState = (state, { exercise }) => {
  const currentExpression = selectors.currentExpression(state, { ...exercise });
  const exerciseStatus = selectors.exerciseStatus(state, { ...exercise });
  const isProcessing = exerciseStatus === 'processing';
  const isInvalid = exerciseStatus === 'invalid';
  const isResolved = exercise.state === 'resolved';
  const isDelivered = exercise.state === 'delivered';
  const startupModalOpen = modalSelectors.modalType(state) && modalSelectors.modalType(state) === modalTypes.STARTUP_EXERCISE_MODAL;
  return {
    currentExpression,
    isDelivered,
    isInvalid,
    isProcessing,
    isResolved,
    startupModalOpen
  };
};

const currentActions = (dispatch, { exercise, userId }) => ({
  onValidateStep: (exerciseProps) => {
    dispatch(actions.resolveExercise({
      ...exercise,
      ...exerciseProps
    }));
  },
  onContentChange: (currentExpression) => {
    dispatch(actions.changeCurrentExpression({
      ...exercise,
      currentExpression
    }));
  },
  onDeleteStep: () => {
    dispatch(modalActions.loadModal(modalTypes.CONFIRM_ACTION_MODAL, {
      title: '¿ Desea borrar el paso anterior ?',
      explanation: 'Al borrar el paso anterior, no podrás recuperarlo',
      acceptButton: 'Borrar paso',
      actionProps: {
        guideId: exercise.guideId,
        courseId: exercise.courseId,
        exerciseId: exercise.exerciseId,
        isPlayground: exercise.isPlayground,
      },
      actionFunction: actions.deleteExerciseStep
    }));
  },
  onDeliverExercise: () => {
    dispatch(modalActions.loadModal(modalTypes.CONFIRM_ACTION_MODAL, {
      title: '¿ Desea entregar el ejercicio ?',
      explanation: 'Al entregarlo no podrás volver a editarlo',
      acceptButton: 'Entregar ejercicio',
      actionType: 'ask',
      actionProps: exercise,
      actionFunction: actions.deliverExercise
    }));
  },
  onEditStudentExercise: ({ exerciseProps }) => {
    dispatch(actions.updateStudentExercise({
      courseId: exercise.courseId,
      guideId: exercise.guideId,
      exerciseId: exercise.exerciseId,
      userId,
      ...exerciseProps
    }));
  },
  onOpenHelpModal: () => {
    dispatch(modalActions.loadModal(modalTypes.CUSTOMIZABLE_STEPS_EXERCISE_HELP_MODAL, {screens: modalScreens}));
  },
  openStartUpModal: () => {
    dispatch(modalActions.loadModal(modalTypes.STARTUP_EXERCISE_MODAL, {functions: exercise.problemInput.split("="), onCloseAction: () => {
      dispatch(modalActions.hideModal()) }}));
  }
});

export default withRouter(connect(
  currentState,
  currentActions,
)(Intersection));
