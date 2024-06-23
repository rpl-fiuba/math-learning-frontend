import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';
import classNames from 'classnames';

import Modal from '../Modal';
import styles from './StartupExerciseModal.module.sass';
import MathText from "../../common/math/MathText";
import PlotFunction, {buildLookalikeFunctions} from "../../common/components/Graphs/PlotFunction";
import SelectButton from "./SelectButton";
import CheckIcon from "@material-ui/icons/Check";


/* eslint-disable global-require */
const INITIAL_SCREEN_INDEX = -1;

class StartupExerciseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenIndex: INITIAL_SCREEN_INDEX,
      showIntraStepScreen: false,
      modalParams: props.modalParams,
    };
  }

  onUpgradeScreenIndex = () => {
    if(this.state.screenIndex === this.state.modalParams.functions.length - 1){
      this.props.modalParams.onCloseAction();
    } else {
      this.setState(prevState => ({ screenIndex: prevState.screenIndex + 1, showIntraStepScreen: false }));
    }
  };

  onSetInnerScreenTrue = () => {
    this.setState({ showIntraStepScreen: true });
  };


  onDowngradeScreenIndex = () => {
    this.setState(prevState => ({ screenIndex: prevState.screenIndex - 1 }));
  };

  buildFunctionArray = ({originalFunction, lookalikeFunctions}) => {
    const elements = [];
    elements.push({functionDefinition: originalFunction, kind: "original"});
    elements.push(...lookalikeFunctions.map((lookalikeFunction) => ({
      functionDefinition: lookalikeFunction,
      kind: "lookalike"
    })));
    const sortedElements = elements.sort(() => Math.random() - 0.5);
    return sortedElements;
  }

  handleSelectedFunction(selectedFunction) {
    if(selectedFunction?.kind === "original"){
      this.onSetInnerScreenTrue();
    }
  }

  buildPlotElements = ({originalFunction, amountOfLookalikes}) => {
    const lookalikeFunctions = buildLookalikeFunctions({functionToDraw: originalFunction, desiredAmount: amountOfLookalikes})
    const functions = this.buildFunctionArray({originalFunction, lookalikeFunctions} );
    return functions.map((element, index) => (
      <div className={classNames(styles.plot)} key={"functionPlotDiv_" + index}>
        <div className={classNames(styles.answerContainer)} key={"functionPlotDiv_" + index}>
          <PlotFunction functionsToDraw={[element.functionDefinition]} downscaleFactor={3} key={"functionPlot_" + index}/>
        </div>
        <div className={styles.plot} key={"functionPlotButton_" + index}> <SelectButton key={"functionSelectButton_" + originalFunction + index} plottedFunction={element} onSelectFunction={this.handleSelectedFunction.bind(this)}/> </div>
      </div>))
  }

  render() {
    const { screenIndex, modalParams, showIntraStepScreen } = this.state;
    const { functions } = modalParams;


    return (
      <Modal className={styles.modal} closable={false} blurOverlay>
        { screenIndex !== INITIAL_SCREEN_INDEX && !showIntraStepScreen && <div className={styles.modalContentContainer}>
          <Typography id="creation-label" color="textPrimary" variant="h6"
                      className={classNames(styles.textExplanation, styles.text)}>
            Desafio {screenIndex + 1} de {functions.length}
          </Typography>
          <Typography id="creation-label" color="textPrimary" variant="body1"
                      className={classNames(styles.textExplanation, styles.text)}>
            Selecciona el gráfico que corresponde a la función
          </Typography>
          <MathText
            id="problem-resolved"
            className={styles.math}
            content={ "f(x) = " + functions[screenIndex]}
          />
          <div style={{display: "flex"}}> {this.buildPlotElements({originalFunction: functions[screenIndex], amountOfLookalikes: 2})} </div>
        </div> }
        { screenIndex === INITIAL_SCREEN_INDEX && !showIntraStepScreen && <div className={styles.modalContentContainer}>
          <Typography id="creation-label" color="textPrimary" variant="subtitle1"
                      className={classNames(styles.text)}>
            Para habilitar la resolución de este ejercicio primero deberás resolver un desafío de identificación de gráfico de funciones en el plano real
          </Typography>
          <img src={require('../../../images/intersection-fake-challenge.png')} className={styles.modalCustomImage} alt="math calc"/>
          <Typography id="creation-label" color="textPrimary" variant="subtitle2"
                      className={classNames(styles.textExplanation)}>
            Imagen ilustrativa del desafío
          </Typography>

          <Typography id="creation-label" color="textPrimary" variant="subtitle1"
                      className={classNames(styles.text)}>
            Se te presentarán tres opciones de gráficos que podrían corresponder a la función a identificar y deberás seleccionar el gráfico que verdaderamente corresponda a ella, para iniciar el desafío clickeá "Comenzar"
          </Typography>
          <div className={styles.buttonContainer}>
            <Button
              color="primary"
              variant="contained"
              id="create-exercise-button"
              onClick={this.onUpgradeScreenIndex}
              size="large"
              className={styles.button}
            >
              Comenzar
            </Button>
          </div>
        </div>
        }
        {
          showIntraStepScreen && <div className={styles.modalContentContainer}>
          <div>
            <div className={styles.modalTitleBar}>
            <CheckIcon className={styles.checkIcon}/>
            <Typography id="creation-label" color="textPrimary" variant="h6" className={styles.modalTitleBarElement}>
              Correcto, el gráfico seleccionado es el correspondiente a la función
            </Typography>
            </div>
            <MathText
              id="problem-resolved"
              className={styles.math}
              content={ "f(x) = " + functions[screenIndex]}
            />
            <div className={classNames(styles.answerContainer)}>
              <PlotFunction functionsToDraw={[functions[screenIndex]]} downscaleFactor={1}/>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                color="primary"
                variant="contained"
                id="create-exercise-button"
                onClick={this.onUpgradeScreenIndex}
                size="large"
              >
                {screenIndex === (functions.length - 1) ? "Finalizar Desafío" : "Continuar"}
              </Button>
            </div>
          </div>
          </div>
        }
      </Modal>
    );
  }
}

export default StartupExerciseModal;
