import React, { Component } from 'react';
import styles from './PlaygroundExercisePage.module.sass';
import { CircularProgress } from "@material-ui/core";
import Derivative from "../../exercises/Derivative";
import Integrate from "../../exercises/Integrate";
import BaseExercise from "../../exercises/BaseExercise";
import {ExerciseType} from "../../../../utils/exerciseType";

export default class PlaygroundExercisePage extends Component {
  constructor(props) {
    super(props);
    this.MathBoxRef = React.createRef();
    this.state = {
      exercise: {stepList: [], type: ExerciseType.DOMAIN, name: null, problemInput: null, currentExpression: {expression: '', variables: [] }},
    };
  }

  componentDidMount() {
    const { exerciseId } = this.props;
    this.props.onGetPlaygroundExercise({exerciseId});
  }

  render() {

    const { userId, isProfessor, exerciseId, exercise, isLoadingExercise, onReturnButtonCallback } = this.props;
    const allResolutions = []

    return this.renderExercise(isLoadingExercise, exercise, userId, isProfessor, allResolutions, onReturnButtonCallback, "Volver a Mis Ejercicios");
  }

  renderExercise(isLoadingExercise, exercise, userId, isProfessor, allResolutions, onReturnButtonCallback, onReturnButtonText) {
    if (isLoadingExercise && !exercise) {
      return (
        <div className={styles.loading}>
          <CircularProgress disableShrink/>
        </div>
      );
    }
    if (exercise.type === 'derivative') {
      return (
        <Derivative
          exercise={exercise}
          userId={userId}
          isProfessor={isProfessor}
          allResolutions={allResolutions}
          onReturnButtonCallback={onReturnButtonCallback}
          onReturnButtonText={onReturnButtonText}
        />
      );
    }
    if (exercise.type === 'integral') {
      return (
        <Integrate
          exercise={exercise}
          userId={userId}
          isProfessor={isProfessor}
          allResolutions={allResolutions}
          onReturnButtonCallback={onReturnButtonCallback}
          onReturnButtonText={onReturnButtonText}
        />
      );
    }
    if (!!exercise.type){
      return (
        <BaseExercise
          exercise={exercise}
          userId={userId}
          isProfessor={isProfessor}
          allResolutions={allResolutions}
          onReturnButtonCallback={onReturnButtonCallback}
          onReturnButtonText={onReturnButtonText}
        />
      );
    }
    return (
      <span>
        Ejercicio cargado
      </span>
    );
  }
}
