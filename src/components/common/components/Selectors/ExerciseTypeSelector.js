import {InputLabel, MenuItem, Select} from '@material-ui/core';
import React from 'react';
import BootstrapDropdownInput from '../../../../bootstrap/dropdownInput';
import {ExerciseType} from "../../../../utils/exerciseType";

export default function ExerciseTypeSelector(props) {
	const { type, onChangeType, customTitle, customStyle, excludeTrigonometry = false } = props;

	return (<>
			{customTitle || <InputLabel id="dropdown-input-label"> Tipo de ejercicio </InputLabel>}
			<Select
				className={customStyle || 'exercise-type-selector'}
				id="exercise-type-selector"
				value={type}
				onChange={onChangeType}
				displayEmpty={true}
				input={<BootstrapDropdownInput />}
			>
				<MenuItem value={ExerciseType.FACTORISABLE}>Factoreo</MenuItem>
				<MenuItem value={ExerciseType.DOMAIN}>Dominio</MenuItem>
				<MenuItem value={ExerciseType.IMAGE}>Imagen</MenuItem>
				<MenuItem value={ExerciseType.INEQUALITY}>Inecuaciones</MenuItem>
				{!excludeTrigonometry && <MenuItem value={ExerciseType.TRIGONOMETRY}>Trigonometria</MenuItem>}
				<MenuItem value={ExerciseType.EXPONENTIAL}>Ecuaciones exponenciales y logaritmicas</MenuItem>
				<MenuItem value={ExerciseType.INTERSECTION}>Interseccion de Funciones</MenuItem>
			</Select>
	</>
	);
}
