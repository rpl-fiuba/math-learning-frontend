import React, { Component } from 'react';
import { Button } from '@material-ui/core';

import MathText from '../../../common/math/MathText';
import styles from './SymbolButton.module.sass';

export default class SymbolButton extends Component {
  onClickMathFormula = () => {
    const { symbol, onClick } = this.props;

    onClick(symbol);
  }

  render = () => {
    const { symbol, big } = this.props;

    return (
      <Button onClick={this.onClickMathFormula} variant="contained" className={big ? styles.mathExpressionBig : styles.mathExpression}>
        <MathText
          content={symbol.label}
          className={styles.singleMathText}
        />
      </Button>
    );
  };
}
