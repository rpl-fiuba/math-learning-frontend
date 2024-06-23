import React from 'react';
import PlotFunction from "./PlotFunction";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import styles from './LinearFunctionGraph.sass';

export default function LinearFunctionGraph(props) {
	const { functionToDraw, onSelectFunction, id } = props;
	return (
		<Grid direction={"column"} spacing={3} xs>
			<Grid item xs> <PlotFunction functionToDraw/> </Grid>
			<Grid item xs> <div style={{display: 'grid'}}>
					<Button color="primary" variant="contained" size={"large"} onClick={() => onSelectFunction(id)}> Seleccionar </Button>
				</div> </Grid>
		</Grid>
	);
}
