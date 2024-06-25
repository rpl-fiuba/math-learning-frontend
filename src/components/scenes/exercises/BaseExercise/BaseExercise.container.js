import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../../state/exercises/actions';
import * as selectors from '../../../../state/exercises/selectors';
import * as modalTypes from '../../../../state/modals/modalTypes';
import * as modalActions from '../../../../state/modals/actions';

import BaseExercise from './BaseExercise';
import {getScreensForExercise} from "../../../Modals/BaseStepsExerciseHelpModal/CommonModalScreens";
import * as modalSelectors from "../../../../state/modals/selectors";

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

const currentActions = (dispatch, { exercise, userId }) => {

  const openStartUpModal = () => {
    dispatch(modalActions.loadModal(modalTypes.STARTUP_EXERCISE_MODAL, {functions: exercise.problemInput.split("="), onCloseAction: () => {
        dispatch(modalActions.hideModal()) }}));
  }

  const actionsBlock =  {
    onValidateStep: (exerciseProps) => {
      dispatch(actions.resolveExercise({
        ...exercise,
        ...exerciseProps
      }));
    },
    onContentChange: (currentExpression) =>
      dispatch(actions.changeCurrentExpression({
        ...exercise,
        currentExpression
      })),
    onDeleteStep: () => {
      dispatch(modalActions.loadModal(modalTypes.CONFIRM_ACTION_MODAL, {
        title: '¿Desea borrar el paso anterior?',
        explanation: 'Una vez eliminado no podrás restaurarlo',
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
        title: '¿Desea entregar el ejercicio?',
        explanation: 'Una vez entregado no podrás agregar ni eliminar pasos',
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
      dispatch(modalActions.loadModal(modalTypes.CUSTOMIZABLE_STEPS_EXERCISE_HELP_MODAL, {screens: getScreensForExercise(exercise?.type)}));
    }
  }

  if(exercise?.type === "intersection") {
    actionsBlock.openStartUpModal = openStartUpModal;
  }

  return actionsBlock

};

export default withRouter(connect(
  currentState,
  currentActions,
)(BaseExercise));
