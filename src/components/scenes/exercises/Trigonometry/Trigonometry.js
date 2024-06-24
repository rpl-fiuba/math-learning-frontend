import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import MathTextBox from '../../../common/math/MathTextBox';
import ExerciseByStepsInterface from '../ExerciseByStepsInterface';

import styles from './Trigonometry.module.sass';
import MathText from "../../../common/math/MathText";

export const getTrigonometryProvidedData = (problemInput) => {
  const data = JSON.parse(problemInput)
  const providedAngles = data.angles.filter(angle => !!angle.provided).length
  const providedSides = data.sides.filter(side => !!side.provided).length
  return ["Datos:", `Ángulos= ${providedAngles}`,`Lados= ${providedSides}`].map(item => <MathText content={item} className={styles.exercise}/>)
}