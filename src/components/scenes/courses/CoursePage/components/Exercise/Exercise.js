import React, {Component} from 'react';
import classNames from 'classnames';
import {Card, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import WrongGenerationIcon from '@material-ui/icons/BatteryAlert';
import WaitingGeneratedIcon from '@material-ui/icons/BatteryCharging60';
import constants from '../../../../../../utils/constants';
import MathText from '../../../../../common/math/MathText';
import BootstrapTooltip from '../../../../../../bootstrap/Tooltip';
import styles from './Exercise.module.sass';
import MoreVertOptions from '../Options';
import {cleanProblemInput} from "../../../../../../utils/latexUtils";
import {getTrigonometryProvidedData} from "../../../../exercises/Trigonometry/Trigonometry";
import {typeMap} from "./TypeMap";

const difficultyMap = {
  easy: {
    text: 'Fácil',
    className: styles.tcGreen
  },
  medium: {
    text: 'Medio',
    className: styles.tcYellow
  },
  hard: {
    text: 'Difícil',
    className: styles.tcRed
  },
};

const stateMap = {
  incompleted: {
    text: 'En progreso',
    className: styles.greyBackground
  },
  resolved: {
    text: 'Resuelto',
    className: styles.blueBackground
  },
  delivered: {
    text: 'Entregado',
    className: styles.greenBackground
  },
};

export default class Exercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTooltipOpen: false
    };
  }

  componentDidMount() {
    const { exercise, onCheckExerciseStatus } = this.props;

    if (exercise.pipelineStatus === constants.WAITING_PIPELINE_STATUS) {
      onCheckExerciseStatus();
    }
  }

  handleClickExercise = () => {
    const { exercise, onClickExercise } = this.props;

    if ([
      constants.WAITING_PIPELINE_STATUS,
      constants.FAILED_PIPELINE_STATUS
    ].includes(exercise.pipelineStatus)) {
      this.setState({ isTooltipOpen: true });
      this.handleOnOpenTooltip();
      return;
    }
    onClickExercise();
  }

  handleOnOpenTooltip = () => {
    setTimeout(() => this.setState({ isTooltipOpen: false }), 3000);
  }

  renderTooltip = () => {
    const { isTooltipOpen } = this.state;
    const { exercise } = this.props;

    if (exercise.pipelineStatus === constants.GENERATED_PIPELINE_STATUS) {
      return null;
    }
    const message = exercise.pipelineStatus === constants.WAITING_PIPELINE_STATUS
      ? 'El ejercicio aún no se ha generado. Vuelve en un rato'
      : 'El ejercicio ha fallado su generación. Vuelve a crearlo';

    const icon = exercise.pipelineStatus === constants.WAITING_PIPELINE_STATUS
      ? <WaitingGeneratedIcon className={styles.statusIcon} />
      : <WrongGenerationIcon className={styles.statusIcon} />;

    return (
      <BootstrapTooltip
        open={isTooltipOpen}
        title={message}
        placement="bottom-start"
      >
        {icon}
      </BootstrapTooltip>
    );
  }

  render() {
    const { exercise, isProfessor, isPlayground = false } = this.props;
    return (
      <Card onClick={this.handleClickExercise} className={classNames(styles.card, stateMap[exercise.state].className)}>
        <Grid container>
          <Grid item xs={isProfessor || isPlayground ? 3 : 4}>
            <Typography className={classNames(styles.item, styles.tcGray1)} variant="h6">
              {exercise.name}
            </Typography>
            <Typography className={classNames(styles.item, styles.problemInputTitle)}>Enunciado: Resuelva paso a paso</Typography>
            {!isPlayground && this.renderTooltip()}
          </Grid>

          <Grid item xs={6}>
            {exercise.type !== "trigonometry" && <MathText content={cleanProblemInput(exercise.problemInput)} className={styles.exercise}/>}
            {exercise.type === "trigonometry" && getTrigonometryProvidedData(exercise.problemInput)}
          </Grid>

          <Grid item xs={2}>
            <Typography className={classNames(styles.type, styles.exerciseInfo)}>
              Tipo: {typeMap[exercise.type].text}
            </Typography>
            <Typography className={classNames(styles.type, styles.exerciseInfo)}>
              Estado: {stateMap[exercise.state].text}
            </Typography>
            {exercise.difficulty && <Typography className={classNames(difficultyMap[exercise.difficulty].className, styles.exerciseInfo)}>
              Dificultad: {difficultyMap[exercise.difficulty].text}
            </Typography>}
            {exercise.calification && (
              <Typography className={styles.qualification}>
                Calificación: {exercise.calification}
              </Typography>
            )}
          </Grid>

          <Grid item xs={1}>
            { (isProfessor || isPlayground) && (
              <div onClick={(event) => event.stopPropagation()}>
                <MoreVertOptions
                  options={this.buildExerciseOptions()}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </Card>
    );
  }

  buildExerciseOptions() {
    const { exercise, onDeleteExercise, onEditExercise, isProfessor, isPlayground = false } = this.props;
    const options = []
    if (isProfessor) {
      options.push({
        text: 'Editar',
        onClick: () => onEditExercise({
          courseId: exercise.courseId,
          guideId: exercise.guideId,
          exerciseId: exercise.exerciseId,
          exercise
        })
      })
    }
    if (isProfessor || isPlayground) {
      options.push({
        text: 'Eliminar',
        onClick: onDeleteExercise
      })
    }
    return options;
  }
}
