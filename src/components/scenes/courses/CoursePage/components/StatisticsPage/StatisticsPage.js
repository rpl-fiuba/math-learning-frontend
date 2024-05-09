import React, { Component } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import ActivityPage from './ActivityPage';
import ExerciseErrorsPage from './ExerciseErrorsPage';
import ExerciseStepCountPage from './ExerciseStepCountPage';
import StudentProgressPage from "./StudentProgressPage";

const statisticsTabs = [
  { label: 'Progreso de estudiantes', class: StudentProgressPage },
  { label: 'Actividad de estudiantes', class:  ActivityPage},
  { label: 'Errores por ejercicio', class: ExerciseErrorsPage },
  { label: 'Promedio de pasos por ejercicio', class: ExerciseStepCountPage }
];

export default class StatisticsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStatistic: statisticsTabs[0].label
    };
  }

  renderStatisticPage = () => {
    const { course, guideId } = this.props;
    const { selectedStatistic } = this.state;
    const SelectedTab = statisticsTabs.find((tab) => tab.label === selectedStatistic).class;
    return <SelectedTab course={course} guideId={guideId}/>;
  }

  handleChange = (event, newValue) => {
    this.setState({ selectedStatistic: newValue });
  }

  render() {
    const { selectedStatistic } = this.state;

    return (
      <React.Fragment>
        <Tabs
          value={selectedStatistic}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          aria-label="disabled tabs example"
        >
          {
            statisticsTabs.map((tab) => <Tab key={tab.label} label={tab.label} value={tab.label}></Tab>)
          }
        </Tabs>

        {this.renderStatisticPage()}
      </React.Fragment>
    );
  }
}
