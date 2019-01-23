import * as React from 'react';
import classnames from 'classnames';
import '../assets/styles/answer.scss';
import { ISurveyQuestion } from '../reducers/survey.reducer';

export interface IAnswerProps extends ISurveyQuestion {
  updateAnswer: (event: any) => void;
}

export default class AnswerComponent extends React.Component<IAnswerProps, any> {

  renderTextField() {
    const { identifier, answer } = this.props;
    return (
      <div className={classnames('col-md-12', 'no-padding')}>
        <input
          key={identifier}
          type="text"
          onChange={this.props.updateAnswer}
          value={answer}
          className={classnames("col-md-12", 'no-padding')}
        />
      </div>
    )
  }

  renderChoice(multiple: boolean) {
    const { choices } = this.props;
    return choices.map(v => {
      return (
        <React.Fragment key={v.label}>
          <div            
            className={classnames('col-md-12','col-lg-6', 'padding-0', 'multiple', { active: v.selected })}
          >
            <input
              type={multiple ? "checkbox" : "radio"}
              key={v.label}
              id={v.label}
              value={v.value}
              checked={v.selected}
              onChange={this.props.updateAnswer}
              className={"col-2"}
            />
            <label
              className={"col-10"}
              htmlFor={v.label}
            >
              {v.label}
            </label>
          </div>
          <div className={classnames('blank-space-10')} />
        </React.Fragment>
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

  renderQuestion() {
    const { question } = this.props;
    return (
      <div className={classnames('col-md-12', 'no-padding')}>
        <p className={classnames('question')}>{question}</p>
        <div className={classnames('blank-space-20')} />
      </div>
    )
  }
  render() {

    return (
      <div className={classnames('answer')}>
        <div className="blank-space-50" />
        {this.renderQuestion()}
        {this.renderAnswerBox()}
        <div className="blank-space-20" />
      </div>
    )
  }

}