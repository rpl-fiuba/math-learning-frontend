import {Typography} from '@material-ui/core';
import React from 'react';
import createExerciseStyles
	from "../../../scenes/courses/CoursePage/components/CreateExercisePage/CreateExercisePage.module.sass";
import BootstrapTooltip from "../../../../bootstrap/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import MathTextBox from "../../math/MathTextBox";
import MathTable from "../../../scenes/exercises/MathTable";
import wandIcon from "../../../../images/wand-icon.svg";
import { cleanExpression } from "../../../../utils/latexUtils";

export default function ExerciseProblemInput(props) {
	const { content, onChangeExercise, onClickSymbol, customTitle, mathBoxRef, exerciseType, generateProblem} = props;

	const buildTitleCopy = (exerciseType) => {
		return "la función del enunciado"
	}

	const overrideMathBoxContext = (content) => {
		if (!mathBoxRef.current) {
			return;
		}
		mathBoxRef.current.updateContent(content);
	}


	return (
		<div className={createExerciseStyles.exerciseContainer}>
			<div className={createExerciseStyles.writeExerciseTitle}>
				<Typography color="textSecondary" variant="body2"> {customTitle || "Escriba el ejercicio"} </Typography>
				<BootstrapTooltip title={"Escribi " + buildTitleCopy(exerciseType) + " o usá la varita mágica para autogenerarla"}
													placement="top-start">
					<InfoIcon id="info-icon" fontSize="small" className={createExerciseStyles.icon}/>
				</BootstrapTooltip>
			</div>
			<div className={createExerciseStyles.createProblemContainer}>
				<MathTextBox
					ref={mathBoxRef}
					id="exercise-math-textbox"
					content={content}
					className={createExerciseStyles.exercise}
					onEnter={() => {
					}}
					onContentChange={(context) => onChangeExercise({target: {value: context}})}
				/>
				<span className={createExerciseStyles.svgIconButton} onClick={() => {
					generateProblem({problemType: exerciseType}).then((response) => {
						const {problemInput} = response;
						overrideMathBoxContext(cleanExpression(problemInput))
					})
				}}>
					<BootstrapTooltip title="Haz clic para autogenerar una función y evitar escribirla manualmente" placement="top">
						<img src={wandIcon} className={createExerciseStyles.svgIcon} alt=""/>
					</BootstrapTooltip>
				</span>
			</div>
			<MathTable
				onClickSymbol={onClickSymbol}
				creationMode
			/>
		</div>
	);
}
