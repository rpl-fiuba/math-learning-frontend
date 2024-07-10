import React, {useEffect, useState} from 'react';
import {XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, MarkSeries} from 'react-vis';
import Grid from "@material-ui/core/Grid";
import {
    Button,
    Input,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";
import CompassCalibrationIcon from "@material-ui/icons/CompassCalibration";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import styles from "./Trigonometry.module.sass";
import {Check} from "@material-ui/icons";
import WarningIcon from "@material-ui/icons/Warning";
import HelpIcon from "@material-ui/icons/Help";
import HelpTooltip from "../HelpTooltip";

function calculateAxisRange(vertices) {
    const minX = Math.min(...vertices.map(point => point.x));
    const minY = Math.min(...vertices.map(point => point.y));
    const maxX = Math.max(...vertices.map(point => point.x));
    const maxY = Math.max(...vertices.map(point => point.y));
    return [Math.min(minX, minY), Math.max(maxX, maxY)];
}

const TriangleGraph = ({ angle1, angle2, baseLength }) => {

    // Calculate coordinates of the triangle vertices
    const triangleData = calculateTriangle(angle1, angle2, baseLength);
    const axisRange = calculateAxisRange(triangleData.vertices);

    return (
        <XYPlot width={350} height={350} xDomain={axisRange} yDomain={axisRange}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries data={triangleData.vertices} strokeWidth={5}/>
        </XYPlot>
    );
};

const LEFT_ANGLE = "Ang. Izquierdo";
const RIGHT_ANGLE = "Ang. Derecho";
const TOP_ANGLE = "Ang. Superior";
export const tagFromLabelForAngles = {
    "leftAngle": LEFT_ANGLE,
    "rightAngle": RIGHT_ANGLE,
    "topAngle": TOP_ANGLE,
}
const BOTTOM_SIDE = "Lado Inferior";
const RIGHT_SIDE = "Lado Derecho";
const LEFT_SIDE = "Lado Izquierdo";
export const tagFromLabel = {
    ...tagFromLabelForAngles,
    "bottomSide": BOTTOM_SIDE,
    "rightSide": RIGHT_SIDE,
    "leftSide": LEFT_SIDE
}

const getSineLawRequirements = (elementToCalculate) => {
    switch (elementToCalculate) {
        case LEFT_ANGLE:
            return [[RIGHT_SIDE, RIGHT_ANGLE, LEFT_SIDE], [RIGHT_SIDE, TOP_ANGLE, BOTTOM_SIDE]]
        case RIGHT_ANGLE:
            return [[LEFT_SIDE, RIGHT_SIDE, LEFT_ANGLE], [LEFT_SIDE, TOP_ANGLE, BOTTOM_SIDE]]
        case TOP_ANGLE:
            return [[BOTTOM_SIDE, RIGHT_SIDE, LEFT_ANGLE], [BOTTOM_SIDE, LEFT_SIDE, RIGHT_ANGLE]]
        case LEFT_SIDE:
            return [[RIGHT_ANGLE, RIGHT_SIDE, LEFT_ANGLE], [RIGHT_ANGLE, TOP_ANGLE, BOTTOM_SIDE]]
        case RIGHT_SIDE:
            return [[LEFT_ANGLE, LEFT_SIDE, RIGHT_ANGLE], [LEFT_ANGLE, TOP_ANGLE, BOTTOM_SIDE]]
        case BOTTOM_SIDE:
            return [[TOP_ANGLE, RIGHT_SIDE, LEFT_ANGLE], [TOP_ANGLE, LEFT_SIDE, RIGHT_ANGLE]]
        default:
            return []
    }
}

const getCosineLawRequirements = (elementToCalculate) => {
    switch (elementToCalculate) {
        case LEFT_SIDE:
            return [[BOTTOM_SIDE, RIGHT_SIDE, RIGHT_ANGLE]]
        case RIGHT_SIDE:
            return [[BOTTOM_SIDE, LEFT_SIDE, LEFT_ANGLE]]
        case BOTTOM_SIDE:
            return [[LEFT_SIDE, RIGHT_SIDE, TOP_ANGLE]]
        case LEFT_ANGLE:
            return [[LEFT_SIDE, RIGHT_SIDE, BOTTOM_SIDE]]
        case RIGHT_ANGLE:
            return [[LEFT_SIDE, RIGHT_SIDE, BOTTOM_SIDE]]
        case TOP_ANGLE:
            return [[LEFT_SIDE, RIGHT_SIDE, BOTTOM_SIDE]]
        default:
            return []
    }
}

const getSineLawClues = (elementToCalculate, completedElements) => {
    const requirements = getSineLawRequirements(elementToCalculate)
    let clues = []
    for (const requirementSet of requirements) {
        if(requirementSet.every(requirement => completedElements.includes(requirement))){
            clues.push("Aplicá el teorema del seno con " + requirementSet.join(", "))
        }
    }
    return clues
}

const getCosineLawClues = (elementToCalculate, completedElements) => {
    const requirements = getCosineLawRequirements(elementToCalculate)
    let clues = []
    for (const requirementSet of requirements) {
        if(requirementSet.every(requirement => completedElements.includes(requirement))){
            clues.push("Aplicá el teorema del coseno con " + requirementSet.join(", "))
        }
    }
    return clues
}

const getInnerAngleClues = (elementToCalculate, completedElements) => {
    const elementToCalculateIsAngle = Object.values(tagFromLabelForAngles).includes(elementToCalculate)
    if (!elementToCalculateIsAngle)
      return []
    const providedAngles = completedElements.filter(element => Object.values(tagFromLabelForAngles).includes(element))
    if (providedAngles.length === 2) {
        return ["Considerá que la suma de los ángulos internos de un triángulo es 180°"]
    }
    return []
}

const getCluesForElement = (itemName, completedElements) => {
    const innerAngleClues = getInnerAngleClues(itemName, completedElements)
    if (innerAngleClues.length > 0) {
        return innerAngleClues[0]
    }
    const sineLawClues = getSineLawClues(itemName, completedElements)
    if (sineLawClues.length > 0) {
        return sineLawClues[0]
    }
    const cosineLawClues = getCosineLawClues(itemName, completedElements)
    if (cosineLawClues.length > 0) {
        return cosineLawClues[0]
    }
    return []
}

const getAvailableMissingElements = (completedElements, missingElements) => {
    return missingElements
      .filter(element => !completedElements.includes(element.tag) && getCluesForElement(element.tag, completedElements).length > 0)
      .map(element => element.tag)
}



export const ChallengeTriangle = ({problemInput, showInput, showAllData}) => {

    const leftAngle = problemInput.angles.find(angle => angle.label === "leftAngle")
    const rightAngle = problemInput.angles.find(angle => angle.label === "rightAngle")
    const bottomSide = problemInput.sides.find(side => side.label === "bottomSide")
    const triangleData = calculateTriangle(leftAngle.value, rightAngle.value, bottomSide.value)

    const vertices = triangleData.vertices
    vertices[0]["angle"] = "leftAngle"
    vertices[1]["angle"] = "rightAngle"
    vertices[2]["angle"] = "topAngle"
    const [min, max] = calculateAxisRange(vertices);
    const axisRange = [-0.25 * max, 1.25 * max]
    const axisResolution = {x: 400, y: 400}

    const angles = problemInput.angles.map((element, index) => ({...element, kind: "angle", tag: tagFromLabel[element.label]}))
    const sides =  problemInput.sides.map((element, index) => ({...element, kind: "side", tag: tagFromLabel[element.label]}))
    const elements = angles.concat(sides)
    const providedElements = elements.filter(element => !!element.provided)
    const missingElements = elements.filter(element => !element.provided)

    const [clickedElement, setClickedElement] = useState(null);
    const [completedElements, setCompletedElements] = useState(providedElements.map(element => element.tag));
    const [completedExercise, setCompletedExercise] = useState(showAllData);

    useEffect(() => {
        if(completedElements.length >= 6){
            showInput()
            setCompletedExercise(true)
        }
    }, [completedElements]);

    const getHint = (itemKind, itemName) => {
        const cluesForSelectedElement = getCluesForElement(itemName, completedElements)
        if (cluesForSelectedElement.length > 0) {
            return cluesForSelectedElement
        }
        const otherElementClues = getAvailableMissingElements(completedElements, missingElements)
        if (otherElementClues.length > 0) {
            return "Calculá primero otro elemento como " + otherElementClues.join(", ")
        }
        return ""
    }


    return (<>
        <Grid container spacing={10} style={{marginTop: "5px"}}>
            <Grid item xs={4}>
                <Typography id="creation-label" color="textPrimary" variant="h6" className={styles.sectionTitle}>
                    Gráfico
                </Typography>
                <Typography id="creation-label" color="textPrimary" variant="subtitle2" className={styles.sectionTitle}>
                    Clickeá un lado o ángulo para identificarlo en los paneles de la derecha
                </Typography>
                <XYPlot width={axisResolution.x} height={axisResolution.y} xDomain={axisRange} yDomain={axisRange}>
                    {
                        vertices.slice(0,3).map((vertex, index) =>
                            <MarkSeries
                                key = {index}
                                data={[vertex]}
                                size={20}
                                color={clickedElement === vertex.angle ? "#3ab6b2" : "#858585"} // Change color when hovered
                                opacity={0.5}
                                onValueClick={(datapoint) => setClickedElement(vertex.angle)}
                            />)
                    }
                    {
                        vertices.slice(0,3).map((vertex, index) =>
                          <MarkSeries
                            key = {index}
                            data={[vertex]}
                            size={8}
                            color={clickedElement === vertex.angle ? "#3ab6b2" : "#858585"} // Change color when hovered
                            opacity={1}
                            onValueClick={(datapoint) => setClickedElement(vertex.angle)}
                          />)
                    }
                    <XAxis />
                    <YAxis />
                    <LineSeries data={vertices.slice(0,2)} strokeWidth={8} color={clickedElement === "bottomSide" ? "#3ab6b2" : "#858585"} onSeriesClick={() => setClickedElement("bottomSide")}/>
                    <LineSeries data={vertices.slice(1,3)} strokeWidth={8} color={clickedElement === "rightSide" ? "#3ab6b2" : "#858585"} onSeriesClick={() => setClickedElement("rightSide")}/>
                    <LineSeries data={vertices.slice(2,4)} strokeWidth={8} color={clickedElement === "leftSide" ? "#3ab6b2" : "#858585"} onSeriesClick={() => setClickedElement("leftSide")}/>
                </XYPlot>
            </Grid>
            <Grid item xs={3}>
                <Typography id="creation-label" color="textPrimary" variant="h6" className={styles.title}>
                    Datos
                </Typography>
                <Typography id="creation-label" color="textPrimary" variant="subtitle2" className={styles.title}>
                    Usá estos valores para calcular los faltantes
                </Typography>
                {
                    providedElements.map(element => {
                        return <Item
                            itemKind={element.kind}
                            itemName={element.tag}
                            itemValue={element.value}
                            provided={true}
                            setCompletedFields={setCompletedElements}
                            selected={clickedElement === element.label}
                        />
                    })
                }
            </Grid>
            <Grid item xs={4}>
                <Typography id="creation-label" color="textPrimary" variant="h6" className={styles.title}>
                    Incógnitas
                </Typography>
                <Typography id="creation-label" color="textPrimary" variant="subtitle2" className={styles.title}>
                    Completá los datos faltantes y validalos, para ingresar los lados recordá usar al menos dos decimales si redondeás el valor
                </Typography>
                {
                    missingElements.map(element => {
                        return <Item
                            itemKind={element.kind}
                            itemName={element.tag}
                            itemValue={element.value}
                            provided={showAllData}
                            setCompletedFields={setCompletedElements}
                            selected={clickedElement === element.label}
                            getHint={getHint}
                        />
                    })
                }
            </Grid>
        </Grid>
            {<div style={{display: "flex", padding: "20px", alignItems: "center"}}>
                {!completedExercise ? <>
                    <WarningIcon style={{marginRight: "15px"}}/>
                    <Typography id="creation-label" color="textPrimary" variant="h6">
                    Una vez completados los datos faltantes del triangulo, podrás terminar el ejercicio ingresando su
                    área
                    </Typography>
                </> : <Typography id="creation-label" color="textPrimary" variant="h6">
                    Ingresa el area del triángulo
                </Typography>
                }
            </div>}
        </>
    );
};

const Item = ({itemKind, itemName, itemValue, provided, setCompletedFields, selected, getHint}) => {

    const [isCompleted, setIsCompleted] = useState(false)
    const [isWrong, setIsWrong] = useState(false)
    const [userInput, setUserInput] = useState("")
    const secondaryText = itemKind === 'angle' ? itemValue.toString() + "°" : (itemValue.toFixed(2) + ` (${itemValue.toFixed(6)})`)

    const handleValidate = () => {
        if(!!userInput && !!parseFloat(userInput) && !isNaN(parseFloat(userInput)) && itemValue.toFixed(2) === parseFloat(userInput).toFixed(2)){
            setIsCompleted(true)
            setIsWrong(false)
            setUserInput(itemValue)
            setCompletedFields((prev) => [...prev, itemName])
        } else if (!!userInput) {
            setIsWrong(true)
        }
    }

    return <ListItem style={selected ? {backgroundColor: "#23827f"} : {}}>
        <ListItemIcon>
            {itemKind === 'angle' && <CompassCalibrationIcon />}
            {itemKind === 'side' && <SettingsEthernetIcon />}
        </ListItemIcon>
        <ListItemText
            primary={itemName}
            secondary={provided ? secondaryText : <div>
                <Input value={userInput} error={isWrong} onChange={(event) => setUserInput(event.target.value)}/>
                {!provided && isWrong && <div className={styles.errorClueInput}>Valor incorrecto, intentalo nuevamente</div>}
            </div>}
        />
        {
            !provided && isWrong && <HelpTooltip className={styles.help} help={getHint(itemKind, itemName)}/>
        }
        {!provided && !isCompleted &&
            <Button
                color={'primary'}
                variant="contained"
                id="accept-action"
                onClick={() => handleValidate()}
                size="small"
                className={styles.button}
            >Validar
            </Button>
        }
        {!provided && isCompleted &&
            <Check></Check>}
    </ListItem>

}



export function calculateTriangle(leftAngle, rightAngle, bottomSide) {

    const topAngle = 180 - leftAngle - rightAngle;

    const leftRadians = (leftAngle * Math.PI) / 180;
    const rightRadians = (rightAngle * Math.PI) / 180;
    const topRadians = (topAngle * Math.PI) / 180;

    const leftSide = bottomSide * Math.sin(rightRadians) / Math.sin(topRadians)
    const rightSide = bottomSide * Math.sin(leftRadians) / Math.sin(topRadians)

    const innerHeight = Math.sin(leftRadians) * leftSide
    const leftBase = Math.cos(leftRadians) * leftSide

    const leftVertex = {x: 0, y:0}
    const rightVertex = {x: bottomSide, y:0}
    const topVertex = {x: leftBase, y: innerHeight}

    return {
        vertices: [leftVertex, rightVertex, topVertex, leftVertex],
        angles: {left: leftAngle, right: rightAngle, top: topAngle},
        sides: {left: leftSide, right: rightSide, bottom: bottomSide}
    };
}

export function calculateTriangleSideLengths(vertices) {
    const [vertex1, vertex2, vertex3] = vertices;

    const distance = (point1, point2) => Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));

    const side1Length = distance(vertex1, vertex2);
    const side2Length = distance(vertex2, vertex3);
    const side3Length = distance(vertex3, vertex1);

    return [side1Length, side2Length, side3Length];
}

export default TriangleGraph;
