import React, { Component } from 'react';
import styles from './PlaygroundCreateExercisePage.module.sass';
import {Button, Divider, TextField, Typography} from "@material-ui/core";
import ExerciseTypeSelector from "../../../common/components/Selectors/ExerciseTypeSelector";
import ExerciseProblemInput from "../../../common/components/Inputs/ExerciseProblemInput";
import Grid from "@material-ui/core/Grid";
import exercisesClient from "../../../../clients/exercisesClient";

export default class PlaygroundCreateExercisePage extends Component {
  constructor(props) {
    super(props);
    this.MathBoxRef = React.createRef();
    this.state = {
      exercise: {stepList: [], type: 'domain', name: null, problemInput: null, currentExpression: {expression: '', variables: [] }},
    };
  }

  onChangeType = (event) => {
    const newType = event.target.value;
    this.setState({exercise: {type: newType, problemInput: null, name: null, stepList: [], currentExpression: {expression: '', variables: [] }}});
  };

  onChangeExercise = (event) => {
    const { problemInput } = this.state;
    const newExercise = event.target.value;

    if (problemInput !== newExercise) {
      this.setState(prevState => ({ exercise: {...prevState.exercise, problemInput: newExercise} }));
    }
  };

  onChangeName = (event) => {
    const newName = event.target.value;
    this.setState(prevState => ({ exercise: {...prevState.exercise, name: newName} }));
  };


  handleClickSymbol = (symbol) => {
    if (!this.MathBoxRef.current) {
      return;
    }

    this.MathBoxRef.current.insertSymbol(symbol);
  }

  handleGeneratePlaygroundExercise = () => {
    const { onGeneratePlaygroundExercise } = this.props;
    const { exercise } = this.state;
    onGeneratePlaygroundExercise({ exercise });
  }


  render() {
    const { exercise } = this.state
    return <>
        <span className={styles.playgroundFrame}> <Grid container spacing={2} direction={'column'}>
          <Grid item> {this.renderTitle()} </Grid>
          <Grid item> {this.renderNameInput(exercise)} </Grid>
          <Grid item> {this.renderTypeSelector(exercise)} </Grid>
          <Grid item> {this.renderProblemInput(exercise)} </Grid>
          <Grid item> {exercise.type && exercise.problemInput && exercise.name && this.renderGenerateButton()}
          </Grid>
        </Grid></span>
    </>;
  }

  renderGenerateButton() {
    return <div className={styles.button}><Button
      color="primary"
      variant="contained"
      onClick={() => this.handleGeneratePlaygroundExercise()}
      size={"large"}
    >
      Generar Ejercicio
    </Button></div>;
  }

  generateProblem ({problemType}) {
    const context = this.props.context
    return exercisesClient.generateProblemForExerciseType({context, exerciseType: problemType})
  }

  renderProblemInput(exercise) {
    return <ExerciseProblemInput content={exercise.problemInput}
                                 exerciseType={exercise.type}
                                 onChangeExercise={this.onChangeExercise}
                                 onClickSymbol={this.handleClickSymbol}
                                 generateProblem={this.generateProblem.bind(this)}
                                 customTitle={"Función del Ejercicio"} mathBoxRef={this.MathBoxRef}/>;
  }

  renderNameInput() {
    return <>
      <Typography className={styles.inputLabel} color="textSecondary" variant="body2"> Nombre del Ejercicio </Typography>
      <TextField
        variant="outlined"
        id="exercise-name"
        value={this.state.exercise.name || ''}
        placeholder={"Ingresá un nombre para el ejercicio"}
        onChange={this.onChangeName}
        className={styles.name}
        inputProps={{
          style: {
            padding: 10.5
          }
        }}
    /></>
      ;
  }


  renderTypeSelector(exercise) {
    return <ExerciseTypeSelector
      customTitle={<Typography className={styles.inputLabel} color="textSecondary" variant="body2"> Tipo de
        Ejercicio </Typography>}
      customStyle={styles.stretchedInput}
      onChangeType={this.onChangeType}
      type={exercise.type}/>;
  }

  renderTitle() {
    return <>
      <div className={styles.generateTitle}>Generar en Modo Libre</div>
      <div className={styles.generateSubTitle}>Ingresá el nombre, tipo y enunciado del ejercicio que deseás generar para comenzar a resolverlo
        con validaciones paso a paso
      </div>
      <div className={styles.divider}>
        <Divider variant="middle"/>
      </div>
    </>;
  }
}
