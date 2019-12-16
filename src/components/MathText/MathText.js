import React from 'react';
import PropTypes from 'prop-types';
import { MQ } from './mathquill-loader';

class MathText extends React.Component {
  constructor(props) {
    super(props);

    this.element = null;
    this.mathField = null;

    // MathJax apparently fire 4 edit events on startup.
    this.ignoreEditEvents = 4;
  }

  componentDidMount() {
    const { className } = this.props;

    this.mathField = MQ.StaticMath(this.element);
    if (className) {
      this.element.classList.add(className);
    }
  }

  componentDidUpdate() {
    this.mathField = MQ.StaticMath(this.element);
  }

  render() {
    const { id, content } = this.props;

    return (
      <p
        id={id}
        ref={(x) => {
          this.element = x;
        }}
      >
        {content}
      </p>
    );
  }
}

MathText.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  content: PropTypes.string,
};

export default MathText;
