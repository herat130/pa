import * as React from 'react';
import { ISurveyQuestion } from '../reducers/survey.reducer';

export interface IAnswerProps extends ISurveyQuestion {
  updateAnswer: (event: any) => void;
}

export default class AnswerComponent extends React.Component<IAnswerProps, any> {

  renderTextField() {
    const { identifier, answer } = this.props;
    return (
      <div>
        <input
          key={identifier}
          type="text"
          onChange={this.props.updateAnswer}
          value={answer}
        />
      </div>
    )
  }

  renderMultipleChoice() {

  }

  renderSingleChoice() {

  }

  renderAnswerBox() {
    const { question_type, multiple } = this.props;
    if (question_type == 'text') {
      return this.renderTextField();
    }
    if (question_type == 'multiple-choice') {
      if (multiple) {
        //checkbox
      } else {
        // radio
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderAnswerBox()}
      </React.Fragment>
    )
  }

}