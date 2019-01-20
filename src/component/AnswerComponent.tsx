import * as React from 'react';
import { ISurveyQuestion } from '../reducers/survey.reducer';

export interface IAnswerProps extends ISurveyQuestion {

}

export default class AnswerComponent extends React.Component<IAnswerProps, any> {

  renderTextField() {

  }

  renderMultipleChoice() {

  }

  renderSingleChoice() {

  }

  renderAnswerBox() {
    const { question_type } = this.props;
    if (question_type == 'text') {

    }
    if (question_type == 'multiple-choice') {

    }
  }

  render() {
    return (
      <React.Fragment>
        Answer Component
      </React.Fragment>
    )
  }

}