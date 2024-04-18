import React, { Component } from 'react';
import ColapseIcon from '@material-ui/icons/ChevronLeft';
import ExpandIcon from '@material-ui/icons/ChevronRight';
import { Grid, FormControlLabel, Switch } from '@material-ui/core';
import SymbolButton from '../SymbolButton';
import styles from './MathTable.module.sass';

const numberSymbols = [
  { label: '0', value: '0' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' }
];

const operationSymbols = [
  { label: '+', value: '+' },
  { label: '-', value: '-' },
  { label: '*', value: '*', latexValue: '\\cdot' },
  { label: '/', value: '/', latexValue: '\\frac{ }{ }' },
];

const separatorSymbols = [
  { label: '(', latexValue: '(' },
  { label: ')', latexValue: ')' },
  { label: '[', latexValue: '[' },
  { label: ']', latexValue: ']' },
]

const trigonometrySymbols = [
  { label: 'sen', latexValue: '\\sin()' },
  { label: 'cos', latexValue: '\\cos()' },
  { label: 'tg', value: 'tan()' }
];

const exponentialSymbols = [
  { label: '\\mid a \\mid', value: '|', latexValue: '|' },
  { label: 'a^{()}', value: '^' },
  { label: '\\sqrt{()}', value: '\\sqrt(', latexValue: '\\sqrt {}' },
  { label: 'x', value: 'x' },
  { label: 'x^{a}', value: 'x^' },
  { label: 'a^b', latexValue: '{}^{}' },
  { label: '\\sqrt{x}', latexValue: '\\sqrt x' },
  { label: '\\sqrt[a]{b}', latexValue: '\\sqrt[]{}' },
  { label: 'e^x', value: 'e^x' },
  { label: '\\ln{x}', latexValue: '\\ln x' },
  { label: '\\log_2 x', latexValue: '\\log_2 x' },
  { label: '\\log_b a', latexValue: '\\log_{} {}' }
];

const complexSymbols = [
  { label: 'dx', value: 'dx' },
  { label: '\\frac{d()}{dx}', value: 'd()/dx', latexValue: '\\frac{d()}{dx}' },
  { label: '\\int dx', latexValue: '(\\int_{\\ }^{\\ }\\ dx)' }, // TODO: Mathquill issue: https://github.com/mathquill/mathquill/issues/784
];

const rangeSymbols = [
  { label: '\\R', latexValue: '\\R' },
  { label: '\\Z', latexValue: '\\Z' },
  { label: '\\o', latexValue: '\\o' },
  { label: '\\cup', latexValue: '\\cup' },
  { label: '\\infty', latexValue: '\\infty' },
  { label: 'Dom', latexValue: 'Dom' },
  { label: 'Img', latexValue: 'Img' }
];

const creationModeSymbols = [...exponentialSymbols, ...separatorSymbols]

export default class MathTable extends Component {

  creationMode = this.props.creationMode;

  constructor(props) {
    super(props);

    this.state = {
      isColapsed: false,
      latexModeOn: false
    };
  }

  handleLatexMode = () => {
    const { onChangeMode } = this.props;
    const { latexModeOn } = this.state;

    this.setState({ latexModeOn: !latexModeOn });
    onChangeMode({ latexModeOn: !latexModeOn });
  }

  handleColapse = () => {
    this.setState({ isColapsed: true });
  }

  handleExpand = () => {
    this.setState({ isColapsed: false });
  }

  renderColapseHeader = () => {
    const { isColapsed } = this.state;
    const { hideColapse = true } = this.props;

    if (hideColapse) {
      return null;
    }

    return (
      <div className={styles.mathTableHeader}>
        {isColapsed
          ? (
            <ExpandIcon
              className={styles.colapseIcon}
              onClick={this.handleExpand}
            />
          ) : (
            <ColapseIcon
              className={styles.colapseIcon}
              onClick={this.handleColapse}
            />
          )}
      </div>
    );
  }



  render = () => {
    const { onClickSymbol } = this.props;
    const { latexModeOn } = this.state;

    if (this.creationMode) {
      return (<div className={styles.mathTable}>
        {this.renderColapseHeader()}
        <Grid container spacing={2} className={styles.mathTableActions}>
          {creationModeSymbols.map((symbol) => (
              <Grid item key={symbol.label}>
                <SymbolButton symbol={symbol} onClick={onClickSymbol} />
              </Grid>
          ))}
        </Grid>
      </div>)

    } else {
      return (
          <div className={styles.mathTable}>
            {this.renderColapseHeader()}

            <FormControlLabel
                className={styles.latexSwitch}
                label="Modo Latex"
                control={
                  <Switch size="small" checked={latexModeOn} onChange={this.handleLatexMode} color="primary"/>
                }
            />
            <Grid container spacing={1} className={styles.mathTableActions}>
              {numberSymbols.map((symbol) => (
                  <Grid item key={symbol.label}>
                    <SymbolButton symbol={symbol} onClick={onClickSymbol}/>
                  </Grid>
              ))}
            </Grid>

             <Grid container spacing={1} className={styles.mathTableActions}>
              {operationSymbols.map((symbol) => (
                  <Grid item key={symbol.label}>
                    <SymbolButton symbol={symbol} onClick={onClickSymbol}/>
                  </Grid>
              ))}
            </Grid>

            <Grid container spacing={1} className={styles.mathTableActions}>
              {separatorSymbols.map((symbol) => (
                  <Grid item key={symbol.label}>
                    <SymbolButton symbol={symbol} onClick={onClickSymbol}/>
                  </Grid>
              ))}
            </Grid>

            <Grid container spacing={1} className={styles.mathTableActions}>
              {trigonometrySymbols.map((symbol) => (
                  <Grid item key={symbol.label}>
                    <SymbolButton symbol={symbol} onClick={onClickSymbol}/>
                  </Grid>
              ))}
            </Grid>

            <Grid container spacing={2} className={styles.mathTableActions}>
              {exponentialSymbols.map((symbol) => (
                  <Grid item key={symbol.label}>
                    <SymbolButton symbol={symbol} onClick={onClickSymbol} />
                  </Grid>
              ))}
            </Grid>

            <Grid container spacing={1} className={styles.mathTableActions}>
              {complexSymbols.map((symbol) => (
                  <Grid item key={symbol.label}>
                    <SymbolButton symbol={symbol} onClick={onClickSymbol}/>
                  </Grid>
              ))}
            </Grid>

            <Grid container spacing={1} className={styles.mathTableActions}>
              {rangeSymbols.map((symbol) => (
                  <Grid item key={symbol.label}>
                    <SymbolButton symbol={symbol} onClick={onClickSymbol}/>
                  </Grid>
              ))}
            </Grid>

          </div>
      );
    }
  };
}
