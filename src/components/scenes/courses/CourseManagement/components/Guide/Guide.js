import React, { Component } from 'react';
import { CircularProgress, Container, Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ExerciseManagement from '../Exercise';
import styles from '../Exercise/Exercise.module.sass'; // TODO: Usually one sass for one component

export default class Guide extends Component {
  componentDidMount() {
    this.updateExercises();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      this.updateExercises();
    }
  }

  updateExercises() {
    const { getExercises, courseId, guide } = this.props;
    if (guide) getExercises({ courseId, guideId: guide.guideId });
  }

  render() {
    const {
      courseId, guide, exercises, showAddExerciseModal, isLoadingExercises, isProfessor
    } = this.props;
    if (!guide) {
      // TODO
      return 'Por favor selecciona una guia';
    }
    const { guideId } = guide;

    if (isLoadingExercises) {
      return (
        <div className={styles.loading}>
          <CircularProgress disableShrink />
        </div>
      );
    }

    return (
      <Container className={styles.exerciseManagement}>

        <Typography align="center" variant="h6" className={styles.guideTitle}>
          {guide.name}
        </Typography>

        <div className={styles.exerciseList}>
          {exercises.map((exercise) => (
            <ExerciseManagement
              key={exercise.exerciseId}
              exercise={exercise}
              isProfessor={isProfessor}
            />
          ))}
        </div>

        { isProfessor
          && (
          <div className={styles.fabContainer}>
            <Fab color="primary" aria-label="add" className={styles.fab}>
              <AddIcon onClick={() => showAddExerciseModal({ courseId, guideId })} />
            </Fab>
          </div>
          )}

      </Container>
    );
  }
}