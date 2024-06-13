import React, { Component } from 'react';
import styles from './PlaygroundListExercisesPage.module.sass';
import ExerciseTypeSelector from "../../../common/components/Selectors/ExerciseTypeSelector";
import ExerciseProblemInput from "../../../common/components/Inputs/ExerciseProblemInput";
import {
  CircularProgress, Typography, Button, Select, MenuItem, Divider
} from '@material-ui/core';

import Grid from "@material-ui/core/Grid";
import BootstrapDropdownInput from '../../../../bootstrap/dropdownInput';
import EmptyStatePage from '../../../common/containers/EmptyStatePage';
import Exercise from '../CoursePage/components/Exercise';

export default class PlaygroundListExercisesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStudentId: props.userId || ''
    };
  }

  componentDidMount() {
    const {
      isLoadingExercises, getExercises, courseId, guideId, userId
    } = this.props;

    if (isLoadingExercises) {
      getExercises({ courseId, guideId, userId });
    }
  }

  componentDidUpdate() {
    const {
      isLoadingExercises, getExercises, courseId, guideId, userId
    } = this.props;

    if (isLoadingExercises) {
      getExercises({ courseId, guideId, userId });
    }
  }

  onChangeStudent = (event) => {
    const { onFilterUser, courseId, guideId } = this.props;
    const currentStudentId = event.target.value;

    this.setState({ currentStudentId });
    onFilterUser({ courseId, guideId, userId: currentStudentId });
  }

  renderEmptyState = () => {
    if (this.props.exercises.length) {
      return null;
    } else {
      const title = 'Todavia no has generado ningun ejercicio en modo libre';
      const subtitle = 'Clickea en "Crear Nuevo Ejercicio" para generar uno';
      return (
        <EmptyStatePage
          title={title}
          subtitle={subtitle}
        />
      );
    }
  }

  render() {
    const { currentStudentId } = this.state;
    const { exercises, onCreateExercise, isLoadingExercises } = this.props;

    if (isLoadingExercises) {
      return (
        <div className={styles.loading}>
          <CircularProgress disableShrink />
        </div>
      );
    }

    return (
      <div className={styles.exerciseInfo}>
        <div className={styles.exercisesHeader}>
          <Typography align="center" variant="h5">
            Modo Libre
          </Typography>
          <div className={styles.addButton}>
            <Button
              onClick={() => onCreateExercise()}
              id="create-new-course"
              variant="contained"
              color="primary"
            >
              Crear Nuevo Ejercicio
            </Button>
          </div>
        </div>
        <div className={styles.divider}>
          <Divider variant="middle"/>
        </div>
        <div className={styles.exercisesHeader}>
          <Typography align="center" variant="subtitle1">
            Los ejercicios que creaste en este área no forman parte de ningún curso ni son compartidos con otros usuarios de
            la plataforma
          </Typography>
        </div>
        <div className={styles.exercisesHeader}>
          <Typography align="center" variant="subtitle1" className={styles.guideTitle}>
            Clickea un ejercicio para retomar su resolución
          </Typography>
        </div>


        <div className={styles.exerciseList}>
          {exercises.map((exercise) => (
            <Exercise
              key={exercise.exerciseId}
              exercise={exercise}
              isPlayground={true}
            />
          ))}
          {this.renderEmptyState()}
        </div>
      </div>
    );
  }
}