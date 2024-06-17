import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import Derivative from '../Derivative';
import Integrate from '../Integrate';
import Factorisable from '../Factorisable';
import Inequality from '../Inequality';
import styles from './ExercisePage.module.sass';
import Domain from '../Domain';
import Image from '../Image';
import Trigonometry from "../Trigonometry";
import Exponential from "../Exponential";

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
    if (exercise.type === 'factorisable') {
      return (
        <Factorisable
          exercise={exercise}
          userId={userId}
          isProfessor={isProfessor}
          allResolutions={allResolutions}
          onReturnButtonCallback={onReturnButtonCallback}
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
