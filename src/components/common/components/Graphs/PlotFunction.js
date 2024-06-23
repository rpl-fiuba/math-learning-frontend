// src/PlotFunction.js
import React, { useEffect, useRef } from 'react';
import styles from '../../../Modals/StartupExerciseModal/StartupExerciseModal.module.sass';

export const sanitizeFunction = (functionToDraw) => {
	const sanitizedFunction = functionToDraw.replace("\\sqrt{x}", "sqrt(x)")
	return sanitizedFunction;
}

export const buildLookalikeFunctions = ({functionToDraw, desiredAmount}) => {
	const lookalikeFunctions = [];
	let previousOneFlippedSigns = false
	let previousOneMultipliedByMinus = false
	let previousOneAddedConstant = false
	let previousOneMultipliedByConstant = false



	for (let index = 0; index < desiredAmount; index++) {

		let currentOneFlippedSigns = false
		let currentOneMultipliedByMinus = false
		let currentOneAddedConstant = false
		let currentOneMultipliedByConstant = false


		let lookalikeFunction = functionToDraw.replace(/(x\s*[+-]\s*\d+)/g, function(match) {
			// Get the sign and number following "x"
			const sign = Math.random() > 0.5 ? "+" : "-";
			let number = parseInt(match.replace(/[^0-9]/g, ''));

			// Change the number to a different number (e.g., subtract 2)
			const randomConstant = Math.round(Math.random() * Math.random() * 7);
			const newNumber = number - randomConstant;
			if(Math.abs(newNumber) === Math.abs(newNumber)){
				number = newNumber - 1;
			}

			// Return "x" followed by the new sign and number
			return `x ${sign} ${Math.abs(number)}`;
		});

		const flipSigns = Math.random() > 0.5;
		if (flipSigns && !previousOneFlippedSigns) {
			previousOneFlippedSigns = true
			currentOneFlippedSigns = true
			lookalikeFunction = lookalikeFunction.replace(/[+-]/g, function(match) {
				return match === "+" ? "-" : "+";
			});
		}

		const multiplyByMinus = Math.random() > 0.5;
		if(multiplyByMinus && !previousOneMultipliedByMinus){
			previousOneMultipliedByMinus = true
			currentOneMultipliedByMinus = true
			lookalikeFunction = `-(${lookalikeFunction})`;
		}

		const addConstant = Math.random() > 0.2;
		if(addConstant && !previousOneAddedConstant){
			previousOneAddedConstant = true
			currentOneAddedConstant = true
			const randomConstant = Math.round(Math.random() * Math.random() * 7) + 2;
			lookalikeFunction = `(${lookalikeFunction}) + ${randomConstant}`;
		}

		const multiplyByConstant = Math.random() > 0.5;
		if(multiplyByConstant && !previousOneMultipliedByConstant){
			previousOneMultipliedByConstant = true
			currentOneMultipliedByConstant = true
			const randomConstant = Math.round(Math.random() * Math.random() * 3) + 2;
			lookalikeFunction = `(${lookalikeFunction}) * ${randomConstant}`;
		}

		if(!currentOneFlippedSigns && !currentOneMultipliedByMinus && !currentOneAddedConstant && !currentOneMultipliedByConstant){
			const negative = Math.random() > 0.5;
			const randomConstant = Math.round(Math.random() * Math.random() * 7) + 1;
			lookalikeFunction = `(${lookalikeFunction}) ${negative ? "-" : "+"} ${randomConstant}`;
		}


		lookalikeFunctions.push(lookalikeFunction)
	}
	return lookalikeFunctions
}

const PlotFunction = ({ functionsToDraw = [], downscaleFactor = 1 }) => {
	const containerRef = useRef(null);

	useEffect(() => {
		if (containerRef.current) {
			// Cleanup previous instance
			while (containerRef.current.firstChild) {
				containerRef.current.removeChild(containerRef.current.firstChild);
			}
			// Create new GeoGebra applet
			const params = {
				appName: 'graphing',
				width: (window.innerWidth - 200) / downscaleFactor,
				height: Math.min((window.innerWidth - 200) / downscaleFactor, 400),
				showToolBar: false,
				showAlgebraInput: false,
				showMenuBar: false,
				enableLabelDrags: false,
				enableShiftDragZoom: true,
				enableRightClick: false,
				enableCAS: false,
				showZoomButtons: true,
				appletOnLoad: function (api) {
					// Set the perspective to hide the algebra view
					api.setPerspective('G');
					// Evaluate the function
					functionsToDraw.forEach((functionToDraw) => api.evalCommand(sanitizeFunction(functionToDraw)));
				},
			};
			const applet = new window.GGBApplet(params, true);
			applet.inject(containerRef.current);
		}
	}, []);

	return <div ref={containerRef} className={styles.functionPlot} />;
};

export default PlotFunction;