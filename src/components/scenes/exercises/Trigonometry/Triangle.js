import React, {useEffect, useState} from 'react';
import {XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, MarkSeries} from 'react-vis';
import Grid from "@material-ui/core/Grid";
import {
    Button,
    Checkbox,
    Input,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    Tooltip,
    Typography
} from "@material-ui/core";
import CompassCalibrationIcon from "@material-ui/icons/CompassCalibration";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import styles from "../../courses/CoursePage/components/CreateExercisePage/CreateExercisePage.module.sass";
import {Check} from "@material-ui/icons";
import WarningIcon from "@material-ui/icons/Warning";

const TriangleGraph = ({ angle1, angle2, baseLength }) => {

    // Calculate coordinates of the triangle vertices
    const triangleData = calculateTriangle(angle1, angle2, baseLength);

    const vertices = triangleData.vertices
    const minX = Math.min(...vertices.map(point => point.x));
    const minY = Math.min(...vertices.map(point => point.y));
    const maxX = Math.max(...vertices.map(point => point.x));
    const maxY = Math.max(...vertices.map(point => point.y));
    const axisRange = [Math.min(minX, minY), Math.max(maxX, maxY)]

    return (
        <XYPlot width={350} height={350} xDomain={axisRange} yDomain={axisRange}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries data={vertices} strokeWidth={5}/>
        </XYPlot>
    );
};

export const ChallengeTriangle = ({problemInput, showInput}) => {

    const leftAngle = problemInput.angles.find(angle => angle.label === "leftAngle")
    const rightAngle = problemInput.angles.find(angle => angle.label === "rightAngle")
    const bottomSide = problemInput.sides.find(side => side.label === "bottomSide")
    const triangleData = calculateTriangle(leftAngle.value, rightAngle.value, bottomSide.value)

    const vertices = triangleData.vertices
    vertices[0]["angle"] = "leftAngle"
    vertices[1]["angle"] = "rightAngle"
    vertices[2]["angle"] = "topAngle"

    const minX = Math.min(...vertices.map(point => point.x));
    const minY = Math.min(...vertices.map(point => point.y));
    const maxX = Math.max(...vertices.map(point => point.x));
    const maxY = Math.max(...vertices.map(point => point.y));
    const axisRange = [Math.min(minX - 0.20 * maxX , minY), Math.max(maxX, maxY * 1.1)]
    const axisResolution = {x: 400, y: 400}

    const angles = problemInput.angles.map((element, index) => ({...element, kind: "angle", tag: `Ángulo ${index+1}`}))
    const sides =  problemInput.sides.map((element, index) => ({...element, kind: "side", tag: `Lado ${index+1}`}))
    const elements = angles.concat(sides)
    const providedElements = elements.filter(element => !!element.provided)
    const missingElements = elements.filter(element => !element.provided)

    // State to track which vertex is currently hovered over
    const [clickedAngle, setClickedAngle] = useState(null);
    const [completedFields, setCompletedFields] = useState(providedElements.map(element => element.tag));
    const [isCompleted, setCompleted] = useState(false);

    useEffect(() => {
        console.log("Called useEffect on completed fields, completedFields is", completedFields)
        if(completedFields.length >= 6){
            console.log("Calling showInput")
            showInput()
            setCompleted(true)
        }
    }, [completedFields]);

    return (<>
        <Grid container spacing={10} style={{marginTop: "5px"}}>
            <Grid item xs={4}>
                <Typography id="creation-label" color="textPrimary" variant="h6" className={styles.sectionTitle}>
                    Gráfico
                </Typography>
                <XYPlot width={axisResolution.x} height={axisResolution.y} xDomain={axisRange} yDomain={axisRange}>
                    {
                        vertices.slice(0,3).map((vertex, index) =>
                            <MarkSeries
                                key = {index}
                                data={[vertex]}
                                size={20}
                                color={clickedAngle === vertex.angle ? "#3ab6b2" : "#858585"} // Change color when hovered
                                opacity={0.5}
                                onValueClick={(datapoint) => setClickedAngle(vertex.angle)}
                            />)
                    }
                    <XAxis />
                    <YAxis />
                    <LineSeries data={vertices} strokeWidth={5} color={"#4abdce"}/>
                </XYPlot>
            </Grid>
            <Grid item xs={3}>
                <Typography id="creation-label" color="textPrimary" variant="h6" className={styles.title}>
                    Datos
                </Typography>
                {
                    providedElements.map(element => {
                        return <Item
                            itemKind={element.kind}
                            itemName={element.tag}
                            itemValue={element.value}
                            provided={true}
                            setCompletedFields={setCompletedFields}
                            selected={clickedAngle === element.label}
                        />
                    })
                }
            </Grid>
            <Grid item xs={3}>
                <Typography id="creation-label" color="textPrimary" variant="h6" className={styles.title}>
                    Incógnitas
                </Typography>
                {
                    missingElements.map(element => {
                        return <Item
                            itemKind={element.kind}
                            itemName={element.tag}
                            itemValue={element.value}
                            provided={false}
                            setCompletedFields={setCompletedFields}
                            selected={clickedAngle === element.label}
                        />
                    })
                }
            </Grid>
        </Grid>
            {<div style={{display: "flex", padding: "20px", alignItems: "center"}}>
                {!isCompleted ? <>
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

const Item = ({itemKind, itemName, itemValue, provided, setCompletedFields, selected}) => {

    const [isCompleted, setIsCompleted] = useState(false)
    const [userInput, setUserInput] = useState("")
    const secondaryText = itemKind === 'angle' ? itemValue.toString() + "°" : (itemValue.toFixed(2) + ` (${itemValue.toFixed(6)})`)

    const handleValidate = () => {
        if(!!userInput && !!parseFloat(userInput) && !isNaN(parseFloat(userInput)) && itemValue.toFixed(2) == parseFloat(userInput).toFixed(2)){
            setIsCompleted(true)
            setUserInput(itemValue)
            setCompletedFields((prev) => [...prev, itemName])
        }
    }

    return <ListItem style={selected ? {backgroundColor: "#23827f"} : {}}>
        <ListItemIcon>
            {itemKind === 'angle' && <CompassCalibrationIcon />}
            {itemKind === 'side' && <SettingsEthernetIcon />}
        </ListItemIcon>
        <ListItemText
            primary={itemName}
            secondary={provided ? secondaryText : <Input value={userInput} onChange={(event) => setUserInput(event.target.value)}></Input>}
        />
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
