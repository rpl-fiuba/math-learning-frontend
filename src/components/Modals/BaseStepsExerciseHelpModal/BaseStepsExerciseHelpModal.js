import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';
import classNames from 'classnames';

import Modal from '../Modal';
import styles from './BaseStepsExerciseHelpModal.module.sass';


/* eslint-disable global-require */
class BaseStepsExerciseHelpModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      helpIndex: 0,
      modalParams: props.modalParams,
    };
  }

  onUpgradeHelpIndex = () => {
    const { helpIndex } = this.state;

    this.setState({ helpIndex: helpIndex + 1 });
  };

  onDowngradeHelpIndex = () => {
    const { helpIndex } = this.state;

    this.setState({ helpIndex: helpIndex - 1 });
  };


  render() {
    const { onClose } = this.props;
    const { helpIndex, modalParams } = this.state;

    return (
      <Modal className={styles.modal} onClose={onClose}>
        <div className={styles.modalContentContainer}>
          <Typography id="creation-label" color="textPrimary" variant="body1"
                      className={classNames(styles.textExplanation, styles.text)}>
            {modalParams.screens[helpIndex].topText}
          </Typography>
          <img src={require('../../../images/' + modalParams.screens[helpIndex].image)}
               className={styles.modalCustomImage} alt="math calc"/>
          <Typography id="creation-label" color="textPrimary" variant="body1"
                      className={classNames(styles.textExplanation, styles.text)}>
            {modalParams.screens[helpIndex].bottomText}
          </Typography>
        </div>

        <div className={styles.buttonContainer}>
          <Button
              color="default"
              variant="contained"
              id="create-exercise-button"
            onClick={this.onDowngradeHelpIndex}
            size="large"
            disabled={helpIndex === 0}
            className={styles.backButton}
          >
            Atrás
          </Button>
          <Button
            color="primary"
            variant="contained"
            id="create-exercise-button"
            onClick={this.onUpgradeHelpIndex}
            size="large"
            disabled={helpIndex === modalParams.screens.length - 1}
            className={styles.button}
          >
            Continuar
          </Button>
        </div>
      </Modal>
    );
  }
}

export default BaseStepsExerciseHelpModal;
