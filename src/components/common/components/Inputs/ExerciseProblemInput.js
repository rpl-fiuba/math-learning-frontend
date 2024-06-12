import {Typography} from '@material-ui/core';
import React from 'react';
import createExerciseStyles
	from "../../../scenes/courses/CoursePage/components/CreateExercisePage/CreateExercisePage.module.sass";
import BootstrapTooltip from "../../../../bootstrap/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import MathTextBox from "../../math/MathTextBox";
import MathTable from "../../../scenes/exercises/MathTable";

export default function ExerciseProblemInput(props) {
	const { content, onChangeExercise, onClickSymbol, customTitle, mathBoxRef} = props;

	return (
		<div className={createExerciseStyles.exerciseContainer}>
			<div className={createExerciseStyles.writeExerciseTitle}>
				<Typography color="textSecondary" variant="body2"> {customTitle || "Escriba el ejercicio"} </Typography>
				<BootstrapTooltip title="Solo escribir el contenido la integral, la derivada, o el polinomio a factorizar"
													placement="top-start">
					<InfoIcon id="info-icon" fontSize="small" className={createExerciseStyles.icon}/>
				</BootstrapTooltip>
			</div>
			<MathTextBox
				ref={mathBoxRef}
				id="exercise-math-textbox"
				content={content}
				className={createExerciseStyles.exercise}
				onEnter={() => {
				}}
				onContentChange={(context) => onChangeExercise({target: {value: context}})}
			/>
			<MathTable
				onClickSymbol={onClickSymbol}
				creationMode
			/>
		</div>
	);
}
