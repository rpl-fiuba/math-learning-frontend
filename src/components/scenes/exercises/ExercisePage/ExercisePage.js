import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import Derivative from '../Derivative';
import Integrate from '../Integrate';
import styles from './ExercisePage.module.sass';
import BaseExercise from "../BaseExercise";

export default class ExercisePage extends Component {
  componentDidMount() {
    const { isLoadingExercise, onLoadExercise } = this.props;

    if (isLoadingExercise) {
      onLoadExercise();
    }
  }

  componentDidUpdate() {
    const { isLoadingExercise, onLoadExercise, onGetAllResolutions, exercise, allResolutions } = this.props;

    if (isLoadingExercise) {
      onLoadExercise();
    }
    if (exercise && exercise.state === 'delivered' && !allResolutions) {
      onGetAllResolutions();
    }
  }

  render = () => {
    const {
      isLoadingExercise, exercise, userId, isProfessor, allResolutions, onReturnButtonCallback
    } = this.props;

    if (isLoadingExercise) {
      return (
        <div className={styles.loading}>
          <CircularProgress disableShrink />
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
