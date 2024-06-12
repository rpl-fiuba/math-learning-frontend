import {InputLabel, MenuItem, Select} from '@material-ui/core';
import React from 'react';
import BootstrapDropdownInput from '../../../../bootstrap/dropdownInput';

export default function ExerciseTypeSelector(props) {
	const { type, onChangeType, customTitle, customStyle } = props;

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
				<MenuItem value="factorisable">Factoreo</MenuItem>
				<MenuItem value="domain">Dominio</MenuItem>
				<MenuItem value="image">Imagen</MenuItem>
				<MenuItem value="inequality">Inecuaciones</MenuItem>
				<MenuItem value="trigonometry">Trigonometria</MenuItem>
				<MenuItem value="exponential">Ecuaciones exponenciales y logaritmicas</MenuItem>
			</Select>
	</>
	);
}
