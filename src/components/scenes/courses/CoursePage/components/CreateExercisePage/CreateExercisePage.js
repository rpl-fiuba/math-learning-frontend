import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import BootstrapTooltip from '../../../../../../bootstrap/Tooltip';
import BootstrapDropdownInput from '../../../../../../bootstrap/dropdownInput';
import MathText from '../../../../../common/math/MathText';
import MathTextBox from '../../../../../common/math/MathTextBox';
import styles from './CreateExercisePage.module.sass';
import TrigonometryCreation from "../../../../exercises/Trigonometry/TrigonometryCreation";
import MathTable from "../../../../exercises/MathTable";
import ExerciseTypeSelector from "../../../../../common/components/Selectors/ExerciseTypeSelector";
import ExerciseProblemInput from "../../../../../common/components/Inputs/ExerciseProblemInput";
import exercisesClient from "../../../../../../clients/exercisesClient";
import {ExerciseType} from "../../../../../../utils/exerciseType";

class CreateExercisePage extends Component {
  constructor(props) {
    super(props);

    this.MathBoxRef = React.createRef();

    this.state = {
      name: null,
      initialHint: null,
      type: ExerciseType.DOMAIN,
      problemInput: null,
      difficulty: 'easy',
      description: null,
      actionDisabled: true
    };
  }

  componentWillUnmount() {
    this.onResetExerciseError();
    this.onResetSolvedExercise();
  }

  chechIfActionDisabled = ({
    name,
    type,
    problemInput,
    difficulty
  }) => {
    const actionDisabled = !name || !type || !problemInput || !difficulty;

    this.setState({ actionDisabled });
  };

  handleOnCancel = () => {
    const { onCancel, guideId, courseId } = this.props;

    return onCancel({ courseId, guideId });
  }

  handleOnCreateExercise = () => {
    const {
      name,
      type,
      initialHint,
      problemInput,
      difficulty,
      description
    } = this.state;
    const { onCreateExercise, guideId, courseId } = this.props;

    onCreateExercise({
      guideId,
      courseId,
      exercise: {
        name,
        type,
        initialHint,
        problemInput,
        difficulty,
        description
      }
    });
  };

  handleClickSymbol = (symbol) => {
    if (!this.MathBoxRef.current) {
      return;
    }

    this.MathBoxRef.current.insertSymbol(symbol);
  }

  handleEvaluateExercise = () => {
    const { type, problemInput } = this.state;
    const { onEvaluateExercise, guideId, courseId } = this.props;

    onEvaluateExercise({
      guideId,
      courseId,
      exercise: { type, problemInput }
    });
  };

  generateProblem ({problemType}) {
    const context = this.props.context
    return exercisesClient.generateProblemForExerciseType({context, exerciseType: problemType})
  }

  onResetExerciseError = () => {
    const { resetExerciseError, creatingExerciseError } = this.props;

    if (creatingExerciseError) {
      resetExerciseError();
    }
  }

  onResetSolvedExercise = () => {
    const { resetSolvedExercise, solvedCreatingExercise } = this.props;

    if (solvedCreatingExercise) {
      resetSolvedExercise();
    }
  }

  onChangeName = (event) => {
    const newName = event.target.value;

    this.setState({ name: newName });
    this.chechIfActionDisabled({ ...this.state, name: newName });
    this.onResetExerciseError();
  };

  onChangeDescription = (event) => {
    const newDescription = event.target.value;

    this.setState({ description: newDescription });
    this.onResetExerciseError();
  };

  onChangeHint = (event) => {
    const newHint = event.target.value;

    this.setState({ initialHint: newHint });
    this.onResetExerciseError();
  };

  onChangeType = (event) => {
    const newType = event.target.value;

    this.setState({ type: newType, problemInput: null });
    this.chechIfActionDisabled({ ...this.state, type: newType });
    this.onResetExerciseError();
  };

  onChangeDifficulty = (event) => {
    const newDif = event.target.value;

    this.setState({ difficulty: newDif });
    this.chechIfActionDisabled({ ...this.state, difficulty: newDif });
    this.onResetExerciseError();
  };

  onChangeExercise = (event) => {
    const { problemInput } = this.state;
    const newExercise = event.target.value;

    if (problemInput !== newExercise) {
      this.setState({ problemInput: newExercise });
      this.chechIfActionDisabled({ ...this.state, problemInput: newExercise });
      this.onResetExerciseError();
      this.onResetSolvedExercise();
    }
  };

  shouldShowEvaluate = (type) => {
    return type !== 'trigonometry';
  }

  render() {
    const {
      actionDisabled,
      type,
      difficulty,
      problemInput,
    } = this.state;
    const {
      isCreatingExercise,
      isEvaluatingExercise,
      creatingExerciseError,
      solvedCreatingExercise,
    } = this.props;
    const isActionButtonDisabled = actionDisabled && !isCreatingExercise;

    return (
      <div className={styles.container}>
        <Typography
          id="creation-label"
          color="textPrimary"
          variant="h5"
          className={styles.title}
        >
          Crear nuevo ejercicio
        </Typography>

        <TextField
          id="exercise-name"
          label="Nombre"
          margin="dense"
          onChange={this.onChangeName}
          className={styles.name}
        />

        <FormControl className={styles.dropdownContainer}>
          <ExerciseTypeSelector onChangeType={this.onChangeType} type={type}/>
        </FormControl>

        <FormControl className={styles.dropdownContainer}>
          <InputLabel id="dropdown-input-label">Dificultad</InputLabel>
          <Select
            id="exercise-difficulty-selector"
            value={difficulty}
            onChange={this.onChangeDifficulty}
            input={<BootstrapDropdownInput />}
          >
            <MenuItem value="easy">Fácil</MenuItem>
            <MenuItem value="medium">Medio</MenuItem>
            <MenuItem value="hard">Difícil</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="exercise-description"
          label="Descripción (opcional)"
          onChange={this.onChangeDescription}
          className={styles.optional}
          fullWidth
          multiline
          maxRows="4"
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="exercise-hint"
          label="Pista inicial (opcional)"
          onChange={this.onChangeHint}
          className={styles.optional}
          fullWidth
          multiline
          maxRows="1"
          margin="normal"
          variant="outlined"
        />

        <div className={styles.exerciseRow}>

          {type === 'trigonometry' && <TrigonometryCreation
              onContentChange={(context) => this.onChangeExercise({ target: { value: context } })}
          />}

          {type !== 'trigonometry' && <ExerciseProblemInput
            content={problemInput}
            exerciseType={type}
            onChangeExercise={this.onChangeExercise}
            onClickSymbol={this.handleClickSymbol}
            generateProblem={this.generateProblem.bind(this)}
            customTitle={"Función del Ejercicio"} mathBoxRef={this.MathBoxRef}/>
          }

          {this.shouldShowEvaluate(type) && <div className={styles.solvedContainer}>
            <Button
                id="evaluate-exercise"
                onClick={this.handleEvaluateExercise}
                disabled={!problemInput || isEvaluatingExercise}
                variant="contained"
                color="primary"
            >
              Evaluar ejercicio
            </Button>
            {isEvaluatingExercise && (
                <div className={styles.loading}>
                  <CircularProgress disableShrink size="25px"/>
                </div>
            )}
            {solvedCreatingExercise && (
                <div className={styles.solvedExericeContainer}>
                  <Typography color="textSecondary" variant="h6">
                    Solución:
                  </Typography>
                  <MathText
                      id="solved-exercise"
                      className={styles.solvedExerice}
                      content={solvedCreatingExercise.expression}
                  />
                </div>
            )}
          </div>}
        </div>

        {creatingExerciseError && (
          <span className={styles.error}>{creatingExerciseError}</span>
        )}

        <div className={styles.buttonContainer}>
          <Button
            color="secondary"
            variant="contained"
            id="cancel-creation-button"
            onClick={this.handleOnCancel}
            size="large"
            className={styles.cancelButton}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            variant="contained"
            id="create-exercise-button"
            onClick={this.handleOnCreateExercise}
            size="large"
            disabled={isActionButtonDisabled}
            className={styles.button}
          >
            Crear ejercicio
          </Button>
          {isCreatingExercise && (
            <div className={styles.loading}>
              <CircularProgress disableShrink />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(CreateExercisePage);
