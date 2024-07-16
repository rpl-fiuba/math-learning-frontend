import React, { Component } from 'react';
import { Button, CircularProgress, MenuItem, Select, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpIcon from '@material-ui/icons/Help';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import HelpToolTip from '../HelpTooltip';
import BootstrapDropdownInput from '../../../../bootstrap/dropdownInput';
import WrongIcon from '../../../common/components/Icons/WrongIcon';
import MathText from '../../../common/math/MathText';
import VariableTextBox from '../../../common/math/VariableTextBox';
import CheckIcon from '../../../common/components/Icons/CheckIcon';
import LeftPanel from '../../../common/containers/LeftPanel/LeftPanel';
import LeftPanelLink from '../../../common/containers/LeftPanel/LeftPanelLink';

import styles from './ExerciseByStepsInterface.module.sass';
import MathTable from '../MathTable';
import {ChallengeTriangle} from "../Trigonometry/Triangle";
import {cleanProblemInput} from "../../../../utils/latexUtils";
import {Close} from "@material-ui/icons";
import {typeMap} from "../../courses/CoursePage/components/Exercise/TypeMap";
import PlotFunction from "../../../common/components/Graphs/PlotFunction";
import exercise from "../../courses/CoursePage/components/Exercise";
import {ExerciseType} from "../../../../utils/exerciseType";

class ExerciseByStepsInterface extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latexModeOn: false, // eslint-disable-line react/no-unused-state
      currentQualification: 10,
      showHelpAlert: true,
      showExerciseInput: this.props.exercise.type !== 'trigonometry'
    };
  }

  getCurrentStep = () => {
    // to be implemented
  }

  handleClickSymbol = () => {
    // to be implemented
  }

  onChangeQualification = (event) => {
    const currentQualification = event.target.value;

    this.setState({ currentQualification });
  }

  handleOnChangeMode = (mode) => {
    const { latexModeOn } = mode;

    this.setState({ latexModeOn }); // eslint-disable-line react/no-unused-state
  }

  handleOnChangeShowInput = (showInput) => {
    const { showExerciseInput } = showInput;
    this.setState({ showExerciseInput }); // eslint-disable-line react/no-unused-state
  }


  handleQualificate = () => {
    const { currentQualification } = this.state;
    const { onEditStudentExercise } = this.props;

    onEditStudentExercise({
      exerciseProps: { calification: currentQualification }
    });
  }

  componentDidMount() {
    if((this.props.exercise.stepList || []).length === 0 && this.props.openStartUpModal){
      this.props.openStartUpModal()
    }
  }

  handleDeliverExercise = () => {
    const { onDeliverExercise } = this.props;

    onDeliverExercise();
  }

  handleDeleteStep = () => {
    const { exercise, onDeleteStep } = this.props;

    onDeleteStep(exercise);
  }

  getStepList = (exercise, isDelivered) => {
    const { stepList } = exercise;

    return (
      (stepList).map((step, index) => {
        const isLastStep = index === stepList.length - 1 && !isDelivered;

        return (
          <div key={`right-step-${index}`} className={styles.rightStep}>
            <span className={styles.item}> = </span>
            <div className={styles.stepContent}>
              <MathText
                id={`step-${index}`}
                content={cleanProblemInput(step.expression)}
                className={styles.mathText}
              />
              {(step.variables).map((variable, varIndx) => (
                <VariableTextBox
                  key={`variable-math-box-${index}-${varIndx}`}
                  variable={variable}
                  readOnly
                />
              ))}
            </div>
            <div className={classNames(styles.stepActions, !isLastStep && styles.stepWithoutDelete)}>
              <CheckIcon size="20px" className={styles.item} />
              {isLastStep ? (
                <DeleteIcon
                  id="delete-step"
                  className={classNames(styles.item, styles.deleteStep)}
                  onClick={this.handleDeleteStep}
                />
              ) : null}
            </div>
          </div>
        );
      })
    );
  }

  getCurrentStepState = () => {
    const { isProcessing, isInvalid } = this.props;

    if (isProcessing) {
      return <CircularProgress size="25px" className={styles.item} disableShrink />;
    }
    if (isInvalid) {
      return <WrongIcon size="25px" className={styles.item} />;
    }

    return null;
  }

  getHint = () => {
    const { exercise: { initialHint, hints = [], stepList } } = this.props;

    if (hints.length) {
      let hintToShow = 'Prueba utilizando: ';
      hints.forEach((h) => {
        hintToShow = `${hintToShow}\n - ${h.title}`;
      });
      return <HelpToolTip className={styles.help} help={hintToShow} />;
    }

    if (!stepList.length && initialHint) {
      return <HelpToolTip className={styles.help} help={initialHint} />;
    }

    return null;
  }

  render() {
    const {
      exercise,
      userId,
      isResolved,
      isDelivered,
      isProfessor,
      onReturnButtonText,
      onReturnButtonCallback,
      allResolutions,
      onOpenHelpModal,
    } = this.props;
    const {currentQualification, showHelpAlert} = this.state;

    const shouldStopEditing = isResolved || isDelivered;
    const canQualificate = isProfessor && isDelivered && !exercise.calification && userId;
    const alertText = `Clickeá el ícono de ayuda para conocer cómo ingresar correctamente las respuestas a los ejercicios del tipo \"${typeMap[exercise.type]?.text || "actual"}\", o hace click en la cruz de la derecha para cerrar este mensaje`

    return (
      <div className={styles.exercise}>
        <LeftPanel>
          <LeftPanelLink text={onReturnButtonText || "Volver al curso"} includeBack onClick={onReturnButtonCallback} />

          {!shouldStopEditing && (
            <MathTable
              onClickSymbol={this.handleClickSymbol}
              onChangeMode={this.handleOnChangeMode}
            />
          )}
        </LeftPanel>

        <div className={styles.exercisePerimeter}>
          {onOpenHelpModal && showHelpAlert &&  (
              <div className={styles.helpBar}>
                <div className={styles.helpLeftContainer}>
                  <div onClick={onOpenHelpModal}>
                    <HelpIcon className={styles.helpModalIcon}/>
                  </div>
                  <span className={styles.helpTitle}> {alertText} </span>
                </div>
                <div onClick={() => this.setState({showHelpAlert: false})}>
                  <Close className={styles.helpCloseAlertIcon}/>
                </div>
              </div>
          )}
          <div className={styles.container}>
            <Typography variant="h5" className={styles.exerciseName}>
              {exercise.name}
            </Typography>
            <Typography variant="body2" className={styles.exerciseDescription}>
              {exercise.description}
            </Typography>
            {exercise.type === "trigonometry" && <ChallengeTriangle
                problemInput={JSON.parse(exercise.problemInput)}
                showAllData={!!isDelivered}
                showInput={() => {
                  this.setState({ showExerciseInput: true })
                }}
            />}
            {this.shouldShowFunctionPlot(exercise, this.state) && <div> <PlotFunction functionsToDraw={exercise.problemInput.split("=")} /> <Typography variant="subtitle2" className={styles.exerciseDescription}>
              En este grafico están representadas las funciones del enunciado, podés usarlo para guiarte en la resolucion del ejercicio
            </Typography> </div>}
            {exercise.type !== "trigonometry" && <MathText
                id="problem-input"
                className={styles.problemInput}
                content={cleanProblemInput(exercise.problemInput)}
            />}
            {this.state.showExerciseInput && <div className={styles.content}>
              {/* if the exercise has been resolved, all the resolutions are shown */}
              {isDelivered && allResolutions && allResolutions.length > 1 ? (
                  <Carousel arrows>
                    {allResolutions.map((or, index) => (
                        <div key={`resolution-${index}`}>
                          {this.getStepList(or, true)}
                        </div>
                    ))}
                  </Carousel>
              ) : (
                  this.getStepList(exercise, isDelivered)
              )}

              {!shouldStopEditing && this.getCurrentStep()}
            </div>}
          </div>

          {shouldStopEditing
            ? (
              <div className={styles.solvedExerciseTopContainer}>
                <div className={styles.solvedExerciseContainer}>
                  <Typography
                    id="exercise-resolved"
                    className={styles.solvedExerciseText}
                    variant="h5"
                  >
                    {isDelivered ? 'Ejercicio entregado:' : 'Ejercicio resuelto:'}
                  </Typography>
                  <MathText
                    id="problem-resolved"
                    className={styles.solvedExerciseResult}
                    content={exercise.stepList[exercise.stepList.length - 1].expression}
                  />
                </div>
                {!isDelivered && !exercise?.isPlayground ? (
                  <Button id="deliver-exercise" onClick={this.handleDeliverExercise} className={styles.deliverExerciseButton} variant="outlined">
                    Entregar ejercicio
                  </Button>
                ) : null }
              </div>
            )
            : null}
          {canQualificate && (
            <div className={styles.qualification}>
              <Typography
                id="exercise-qualification"
                className={styles.qualifText}
                variant="h5"
              >
                Calificación:
              </Typography>
              <Select
                id="qualification-posibilities"
                className={styles.qualifSelector}
                value={currentQualification}
                onChange={this.onChangeQualification}
                input={<BootstrapDropdownInput />}
              >
                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((q) => (
                  <MenuItem key={q} value={q}>{q}</MenuItem>
                ))}
              </Select>
              <Button
                id="qualificate-exercise"
                className={styles.qualifButton}
                onClick={this.handleQualificate}
                variant="contained"
                color="primary"
              >
                Calificar entrega
              </Button>
            </div>
          )}
          {exercise.calification && (
            <div className={styles.qualification}>
              <Typography
                id="exercise-qualification"
                className={styles.qualifText}
                variant="h5"
              >
                Calificación: {exercise.calification}
              </Typography>
            </div>
          )}
        </div>
      </div>
    );
  }

  shouldShowFunctionPlot(exercise) {
    return !this.props.startupModalOpen && exercise.type === ExerciseType.INTERSECTION;
  }
}

ExerciseByStepsInterface.propTypes = {
  isResolved: PropTypes.bool,
  isProcessing: PropTypes.bool,
  isInvalid: PropTypes.bool,
  isDelivered: PropTypes.bool
};

export default ExerciseByStepsInterface;
