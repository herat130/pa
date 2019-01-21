import * as React from 'react';
import '../assets/styles/progress.scss';

export interface IProgressBar {
  totalQuestions: number;
  currentQuestion: number;
}

export default class ProgressBar extends React.Component<IProgressBar, {}> {
  render() {
    const { totalQuestions, currentQuestion } = this.props;
    return (
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: ((currentQuestion * 100) / totalQuestions) + "%" }}
        />
      </div>
    )
  }
}