import React from 'react';
import '../../../../../../../../node_modules/react-vis/dist/style.css';
import {CircularProgress, MenuItem} from '@material-ui/core';
import EmptyStatePage from '../../../../../../common/containers/EmptyStatePage';
import BaseExerciseStatisticPage from '../BasicExerciseStatisticPage';
import styles from '../StatisticsCommon.module.sass';
import {FlexibleWidthXYPlot, Hint, LabelSeries, VerticalBarSeries, XAxis, YAxis} from "react-vis";
import HelpIcon from "@material-ui/icons/Help";
import {Close} from "@material-ui/icons";
import borrowedStyles from './../../../../../exercises/ExerciseByStepsInterface/ExerciseByStepsInterface.module.sass';

export default class StudentProgressPage extends BaseExerciseStatisticPage {
  constructor(props) {
    super(props);

    this.state = {
      guideId: props.course.guides[0].guideId,
      userId: 'Todos',
      sumType: 'Promedio',
      graphicType: 'Histograma',
      selectedBar: {},
      clickedBar: {},
      focusedUsers: [],
    };
  }

  onChangeGuide = (event) => {
    const guideId = event.target.value;

    this.setState({ guideId }, () => {
      this.props.getGuideStudentProgress(this.props.course.courseId, guideId);
    });
  }


  renderGuidesSelector = () => {
    const { statistics } = this.props;
    const { guideId } = this.state;
    const currentGuide = guideId || statistics[0].guideId;

    return this.renderSelector({
      title: 'Guía:',
      value: currentGuide,
      onChange: this.onChangeGuide,
      values: [
        this.props.course.guides.map((g) => <MenuItem key={g.guideId} value={g.guideId}>{g.name}</MenuItem>),
      ]
    });
  }


  buildPlotDataFromStatistics = (dataPoints, kind) => {
    return dataPoints.map((exercise) => ({
      x: exercise.name.replace("Ejercicio", "Ej."),
      y: exercise.userCount,
      kind: kind,
      users: exercise.users
    })).sort((a, b) => a.x > b.x);
  }

  renderFocusedUserList = () => {
    if (this.state.focusedUsers.length === 0) {
      return <div className={borrowedStyles.helpBar} style={{marginTop: "20px"}}>
        <div className={borrowedStyles.helpLeftContainer}>
          <div>
            <HelpIcon className={borrowedStyles.nonClickableIcon}/>
          </div>
          <span className={borrowedStyles.helpTitle}> Clickeá una barra del grafico para listar a los alumnos de ese grupo </span>
        </div>
      </div>;
    } else {
      const usersList = this.state.focusedUsers
        .map((userId) => {
          const maybeUser = this.props.course.users.find(user => user.userId === userId)
          return {name: maybeUser?.name, email: maybeUser?.email, id: userId}
        })
        .filter(user => !!(user.name))
        .sort((a, b) => a.name > b.name)

      return (
        <div className={styles.title}>
          <h3>Ejercicio: "{this.state.clickedBar.x}" con estado: "{this.state.clickedBar.kind}"</h3>
          <h3>Alumnos ({usersList.length})</h3>
          <ul style={{columnCount: Math.min(3, Math.ceil(this.state.focusedUsers.length / 10)), columnGap: "2em"}}>
            {usersList.map((user) => <li key={user.id}>{user.name} - ({user.email})</li>)
            }
          </ul>
        </div>
      );
    }
  }

  renderGraphic = () => {

    const statistics = this?.props?.statistics?.[this.state.guideId]?.progress;
    const { guideId } = this.state;

    if (statistics.resolved?.guideId === guideId) {
      const resolvedData = this.buildPlotDataFromStatistics(statistics.resolved.exercises, "Resuelto")
      const initiatedData = this.buildPlotDataFromStatistics(statistics.initiated.exercises, "Iniciado")
      const failedData = this.buildPlotDataFromStatistics(statistics.failed.exercises, "Fallido")

      return (<FlexibleWidthXYPlot
          xType="ordinal"
          stackBy="y"
          height={400}
        >
          <XAxis style={{fontSize: "17px", height: "30px"}}/>
          <YAxis/>
          {this.buildVerticalBarSeries(resolvedData, "#438223")}
          {this.buildVerticalBarSeries(initiatedData, "#a29934")}
          {this.buildVerticalBarSeries(failedData, "#822b23")}
          {!!this.state.selectedBar && !!this.state.selectedBar.y && <Hint
            value={this.buildHint()}
            style={{content: {fontSize: "16px"}}}
            format={(datapoint) => [
              {title: "Alumnos", value: datapoint.realY},
              {title: "Estado", value: datapoint.kind},
            ]}
          />}
        </FlexibleWidthXYPlot>
      );

    } else {
      return <></>;
    }
  }

  buildVerticalBarSeries(data, color) {
    return <VerticalBarSeries data={data} barWidth={0.2} color={color}
                              onValueMouseOver={(datapoint, {event}) => {
                                this.setState({selectedBar: datapoint});
                              }} onValueClick={(datapoint, {event}) => {
      this.setState({focusedUsers: datapoint.users})
      this.setState({clickedBar: {x: datapoint.x, kind: datapoint.kind}})
    }}/>;
  }

  buildHint() {
    return {
      x: this.state.selectedBar.x,
      y: (this.state.selectedBar.y || 0) - (((this.state.selectedBar.y || 0) - (this.state.selectedBar.y0 || 0)) / 2),
      realY: (this.state.selectedBar.y || 0) - (this.state.selectedBar.y0 || 0),
      y1: this.state.selectedBar.y || 0,
      kind: this.state.selectedBar.kind
    };
  }

  componentDidMount() {
    const { statistics, course, getGuideStudentProgress } = this.props;

    if (!statistics) {
      getGuideStudentProgress(course.courseId, this.state.guideId);
    }
  }

  render() {
    const statistics = this?.props?.statistics?.[this.state.guideId]?.progress;

    if (!statistics) {
      return (
        <div className={styles.loading}>
          <CircularProgress disableShrink />
        </div>
      );
    }
    if (!statistics.resolved || !statistics.initiated || !statistics.failed) {
      return (
        <EmptyStatePage
          title="No existen estadísticas aún."
          subtitle="Tus alumnos deberán utilizar más el curso para que aparezcan"
        />
      );
    }

    return (
      <div className={styles.container}>
        <div className={styles.selectors}>
          {this.renderGuidesSelector()}
        </div>
        {this.renderGraphic()}
        {this.renderFocusedUserList()}
      </div>
    );
  }
}
