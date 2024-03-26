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

class Trigonometry extends ExerciseByStepsInterface {
  constructor(props) {
    super(props);

    this.MathBoxRef = React.createRef();
  }


  handleValidateStep = () => {
    const { currentExpression, onValidateStep } = this.props;

    if (currentExpression) {
      onValidateStep({ currentExpression });
    }
  }

  handleContentChange = (value) => {
    const { onContentChange } = this.props;

    onContentChange({ expression: value, variables: [] });
  }

  handleClickSymbol = (symbol) => {
    if (!this.MathBoxRef.current) {
      return;
    }

    this.MathBoxRef.current.insertSymbol(symbol);
  }

  getCurrentStep = () => {
    const { latexModeOn } = this.state;
    const { currentExpression, isProcessing } = this.props;

    return (
      <div className={styles.step}>
        {this.getHint()}

        <div className={styles.stepContent}>
          <span className={styles.item}> = </span>
          <MathTextBox
            ref={this.MathBoxRef}
            latexMode={latexModeOn}
            content={currentExpression.expression}
            className={styles.mathBox}
            onContentChange={this.handleContentChange}
            onEnter={this.handleValidateStep}
          />
          {this.getCurrentStepState()}
          <Button
            id="validate-step"
            className={styles.validateButton}
            onClick={this.handleValidateStep}
            disabled={!currentExpression.expression || isProcessing}
            variant="contained"
            color="primary"
          >
            Validar
          </Button>
        </div>
      </div>
    );
  }
}

Trigonometry.propTypes = {
  isProcessing: PropTypes.bool,
  currentExpression: PropTypes.object,
  onValidateStep: PropTypes.func,
  onContentChange: PropTypes.func
};

export default Trigonometry;
