import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import CompassCalibrationIcon from '@material-ui/icons/CompassCalibration';
import {
    List,
    ListItem,
    ListItemText, ListItemIcon, Checkbox, Typography, Tooltip, Switch
} from '@material-ui/core';
import { Slider } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import TriangleGraph, {calculateTriangle, calculateTriangleSideLengths} from "./Triangle";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import styles from "../../courses/CoursePage/components/CreateExercisePage/CreateExercisePage.module.sass";
import WarningIcon from "@material-ui/icons/Warning";
class TrigonometryCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftInterval: 60,
            rightInterval:120,
            scale:10,
            checkedAngles: [],
            checkedSides: []
        }
    }

    enoughDataIsProvided = () => {
        const providedSides = this.state.checkedSides.length
        const providedAngles = this.state.checkedAngles.length
        return providedSides >= 1 && providedAngles >= 1 && (providedSides + providedAngles) >= 3
    }

    calculateMissingProvidedData = () => {
        const providedSides = this.state.checkedSides.length
        const providedAngles = this.state.checkedAngles.length
        return 3 - providedAngles - providedSides
    }


    updateExerciseIfValid = () => {
        if(this.enoughDataIsProvided()){
            this.props.onContentChange(this.buildExercise())
        } else {
            this.props.onContentChange(null)
        }
    }

    buildExercise = () => {

        const leftAngle = this.state.leftInterval
        const rightAngle = this.state.rightInterval - this.state.leftInterval
        const topAngle = 180 - this.state.rightInterval

        const [leftSide, rightSide, bottomSide] = this.getSideLengths()

        const exercise = {
            angles : [{label: "leftAngle", value: leftAngle, provided: false},
                {label: "rightAngle", value: rightAngle, provided: false},
                {label: "topAngle", value: topAngle, provided: false}],
            sides: [{label: "leftSide", value: leftSide, provided: false},
                {label: "rightSide", value: rightSide, provided: false},
                {label: "bottomSide", value: bottomSide, provided: false}]
        }

        this.state.checkedAngles.forEach((name, index) => {
            exercise.angles[index].provided = true
        })

        this.state.checkedSides.forEach((name, index) => {
            exercise.sides[index].provided = true
        })

        return exercise
    }

    onChangeAngleInterval = (event, value) => {
        const [left, right] = value
        if (right - left >= 10 && left > 0 && right > 0 && left < 90 && right - left < 90) {
            this.setState({leftInterval: left, rightInterval: right}, this.updateExerciseIfValid);

        }
    };

    onChangeTriangleScale = (event, value) => {
        this.setState({ scale: value }, this.updateExerciseIfValid);
    };


    angleMarks = [
        {
            value: 0,
            label: '0°',
        }, {
            value: 180,
            label: '180°',
        },
    ];

    sideMarks = [
        {
            value: 0,
            label: '0',
        }, {
            value: 100,
            label: '100'
        },
    ];


    handleToggleSide = (value) => () => {
        const currentList = this.state.checkedSides
        const currentIndex = currentList.indexOf(value);
        const newChecked = [...currentList];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({checkedSides: newChecked}, this.updateExerciseIfValid);
    };

    handleToggleAngle = (value) => () => {
        const currentList = this.state.checkedAngles
        const currentIndex = currentList.indexOf(value);
        const newChecked = [...currentList];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({checkedAngles: newChecked}, this.updateExerciseIfValid);
    };

    buildItem(itemKind, itemName, itemValue) {

        const onChangeFunction = itemKind === 'angle' ? this.handleToggleAngle(itemName) : this.handleToggleSide(itemName)
        const checkedList = itemKind === 'angle' ? this.state.checkedAngles : this.state.checkedSides
        const secondaryText = itemKind === 'angle' ? itemValue.toString() + "°" : (itemValue.toFixed(2) + ` (${itemValue.toFixed(6)})`)

        return <ListItem>
            <ListItemIcon>
                {itemKind === 'angle' && <CompassCalibrationIcon />}
                {itemKind === 'side' && <SettingsEthernetIcon />}
            </ListItemIcon>
            <ListItemText
                primary={itemName}
                secondary={secondaryText}
            />
            <ListItemSecondaryAction>
                <div style={{display: "grid", alignItems: "center"}}>
                <Typography id="creation-label" color="textPrimary" variant="caption" align={"center"}> {checkedList.indexOf(itemName) !== -1 ? 'Dato' : 'Incognita'}</Typography>
                <Tooltip arrow
                         placement={"top"}
                         title={<Typography id="creation-label" color="textPrimary" variant="caption">
                             Seleccionar el item lo hará un dato del ejercicio </Typography>}>
                    <Switch
                        checked={checkedList.indexOf(itemName) !== -1}
                        onChange={onChangeFunction}
                        color="primary"
                    />
                </Tooltip>
                </div>
            </ListItemSecondaryAction>
        </ListItem>

    }

    getSideLengths() {
        const vertices = calculateTriangle(this.state.leftInterval,
            this.state.rightInterval - this.state.leftInterval,
            this.state.scale).vertices
        return calculateTriangleSideLengths(vertices.slice(0,3))
    }

    render() {

        return (
            <div className={styles.extraExerciseSettings}>
                <Grid container spacing={10}>
                    <Grid item xs={3}>
                        <Typography id="creation-label" color="textPrimary" variant="subtitle1" className={styles.title}>
                            Ajustar Ángulos
                        </Typography>
                        <Slider
                            value={[this.state.leftInterval, this.state.rightInterval]}
                            onChange={(ev, value) => this.onChangeAngleInterval(ev, value)}
                            min={0}
                            max={180}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            marks={this.angleMarks}
                        />
                        <List >
                            {this.buildItem("angle", "Angulo A", this.state.leftInterval)}
                            {this.buildItem("angle","Angulo B", this.state.rightInterval - this.state.leftInterval)}
                            {this.buildItem("angle","Angulo C", 180 - this.state.rightInterval)}
                        </List>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography id="creation-label" color="textPrimary" variant="subtitle1" className={styles.title}>
                            Ajustar Hipotenusa
                        </Typography>
                        <Slider
                            value={this.state.scale}
                            onChange={(ev, value) => this.onChangeTriangleScale(ev, value)}
                            min={1}
                            max={100}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            marks={this.sideMarks}
                        />
                        <List >
                            {this.buildItem("side","Lado X", this.getSideLengths()[0])}
                            {this.buildItem("side","Lado Y", this.getSideLengths()[1])}
                            {this.buildItem("side","Lado Z", this.getSideLengths()[2])}
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <TriangleGraph angle1={this.state.leftInterval}
                                       angle2={this.state.rightInterval - this.state.leftInterval}
                                       baseLength={this.state.scale}
                        />
                    </Grid>
                </Grid>

                {(this.calculateMissingProvidedData() > 0) && <span style={{display: "flex", alignItems: "left"}}>
                    <WarningIcon style={{marginRight: "10px"}}/>
                    <Typography color="textPrimary" variant="subtitle2" align={"center"}>
                        Datos minimos restantes {this.calculateMissingProvidedData()}
                    </Typography>
                </span>}
            </div>);
    }
}

export default withRouter(TrigonometryCreation);
