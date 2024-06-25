import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';
import classNames from 'classnames';

import Modal from '../Modal';
import styles from './StartupExerciseModal.module.sass';
import MathText from "../../common/math/MathText";
import PlotFunction, {buildLookalikeFunctions} from "../../common/components/Graphs/PlotFunction";
import {cleanProblemInput} from "../../../utils/latexUtils";

class SelectButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
		};
	}

	innerHandleSelect = () => {
		const onSelectFunction = this.props.onSelectFunction
		const plottedFunction = this.props.plottedFunction
		if(plottedFunction.kind === "lookalike"){
			this.setState({disabled: true})
		}
		onSelectFunction(plottedFunction)
	}

	render() {
		return (
			<div className={styles.selectButtonContainer}>
				<Button onClick={() => this.innerHandleSelect()} disabled={this.state.disabled} variant={"contained"} color={"default"}>Seleccionar</Button>
				{this.state.disabled &&
					<div> <Typography color="textPrimary" variant="body2"> Incorrecto, este grafico representa:
					<MathText
						id="problem-resolved"
						className={styles.math}
						content={ "f(x) = " + cleanProblemInput(this.props.plottedFunction.functionDefinition)}
					/> </Typography>
						<Typography color="textPrimary" variant="body2"> Intentalo de nuevo seleccionando otro gráfico </Typography>
					</div>}

			</div>
		);
	}
}

export default SelectButton;
