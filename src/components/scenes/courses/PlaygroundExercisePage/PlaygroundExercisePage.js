import React, { Component } from 'react';
import styles from './PlaygroundExercisePage.module.sass';
import { CircularProgress } from "@material-ui/core";
import Derivative from "../../exercises/Derivative";
import Integrate from "../../exercises/Integrate";
import Factorisable from "../../exercises/Factorisable";
import Domain from "../../exercises/Domain";
import Image from "../../exercises/Image";
import Inequality from "../../exercises/Inequality";
import Trigonometry from "../../exercises/Trigonometry";
import Exponential from "../../exercises/Exponential";
import exercisesClient from "../../../../clients/exercisesClient";

export default class PlaygroundExercisePage extends Component {
  constructor(props) {
    super(props);
    this.MathBoxRef = React.createRef();
    this.state = {
      exercise: {stepList: [], type: 'domain', name: null, problemInput: null, currentExpression: {expression: '', variables: [] }},
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
    if (exercise.type === 'factorisable') {
      return (
        <Factorisable
          exercise={exercise}
          userId={userId}
          isProfessor={isProfessor}
          allResolutions={allResolutions}
          onReturnButtonCallback={onReturnButtonCallback}
          onReturnButtonText={onReturnButtonText}
        />
      );
    }
    if (exercise.type === 'domain') {
      return (
        <Domain
          exercise={exercise}
          userId={userId}
          isProfessor={isProfessor}
          allResolutions={allResolutions}
          onReturnButtonCallback={onReturnButtonCallback}
          onReturnButtonText={onReturnButtonText}
        />
      );
    }
    if (exercise.type === 'image') {
      return (
        <Image
          exercise={exercise}
          userId={userId}
          isProfessor={isProfessor}
          allResolutions={allResolutions}
          onReturnButtonCallback={onReturnButtonCallback}
          onReturnButtonText={onReturnButtonText}
        />
      );
    }
    if (exercise.type === 'inequality') {
      return (
        <Inequality
          exercise={exercise}
          userId={userId}
          isProfessor={isProfessor}
          allResolutions={allResolutions}
          onReturnButtonCallback={onReturnButtonCallback}
          onReturnButtonText={onReturnButtonText}
        />
      );
    }
    if (exercise.type === 'trigonometry') {
      return (
        <Trigonometry
          exercise={exercise}
          userId={userId}
          isProfessor={isProfessor}
          allResolutions={allResolutions}
          onReturnButtonCallback={onReturnButtonCallback}
          onReturnButtonText={onReturnButtonText}
        />
      );
    }
    if (exercise.type === 'exponential') {
      return (
        <Exponential
          exercise={exercise}
          userId={userId}
          isProfessor={isProfessor}
          allResolutions={allResolutions}
          onReturnButtonCallback={onReturnButtonCallback}
          onReturnButtonText={onReturnButtonText}
        />
      );
    }
  }
}
