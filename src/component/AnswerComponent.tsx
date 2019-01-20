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

  renderChoice(multiple: boolean) {
    const { choices } = this.props;
    return choices.map(v => {
      return (
        <div key={v.label}>
          <input
            type={multiple ? "checkbox" : "radio"}
            key={v.label}
            id={v.label}
            value={v.value}
            checked={v.selected}
            onChange={this.props.updateAnswer}
          />
          <label
            htmlFor={v.label}
          >
            {v.label}
          </label>
        </div>
      )
    });
  }

  renderAnswerBox() {
    const { question_type, multiple } = this.props;
    if (question_type === 'text') {
      return this.renderTextField();
    }
    if (question_type === 'multiple-choice') {
      return this.renderChoice(multiple);
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