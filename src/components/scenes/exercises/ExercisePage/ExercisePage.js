import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import Derivative from '../Derivative';
import Integrate from '../Integrate';
import Factorisable from '../Factorisable';
import Inequality from '../Inequality';
import styles from './ExercisePage.module.sass';
import DomainAndImage from '../DomainAndImage';

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
      isLoadingExercise, exercise, userId, isProfessor, allResolutions, onReturnToCourse
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
          onReturnToCourse={onReturnToCourse}
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
          onReturnToCourse={onReturnToCourse}
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
          onReturnToCourse={onReturnToCourse}
        />
      );
    }
    if (exercise.type === 'domain_and_image') {
      return (
        <DomainAndImage
          exercise={exercise}
          userId={userId}
          isProfessor={isProfessor}
          allResolutions={allResolutions}
          onReturnToCourse={onReturnToCourse}
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
          onReturnToCourse={onReturnToCourse}
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
