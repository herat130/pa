import * as React from 'react';
import { connect } from 'react-redux';
import { ISurveyState } from '../reducers/survey.reducer';
import classnames from 'classnames';

interface ISurveyMapStateToProps extends ISurveyState { }

class SurveyDetails extends React.Component<ISurveyMapStateToProps, any>{

  renderQuestionAnswer() {
    const { survey } = this.props;
    return survey.map(v => {
      return (
        <React.Fragment key={v.identifier}>
          <div className={classnames('col-md-12', 'no-padding', 'details')}>
            <p className={classnames('col-md-12','question')}>
              {v.question}
            </p>
            <p className={classnames('col-md-12')}>
              {v.answer}
            </p>
          </div>
          <div className={"blank-space-10"} />
        </React.Fragment>
      )
    })
  }

  render() {
    return (
      <div className={classnames("col-md-12", 'no-padding')}>
        {this.renderQuestionAnswer()}
      </div>
    )
  }

}

const mapStateToProps = (state: { surveyReducer: ISurveyState }, props: any): ISurveyMapStateToProps => {
  return {
    loading: state.surveyReducer.loading,
    error: state.surveyReducer.error,
    survey: state.surveyReducer.survey,
    currentQuestionIndex: state.surveyReducer.currentQuestionIndex,
  };
};

const mapStateToDispatch = () => {
  return {

  }
}

export default connect(mapStateToProps, mapStateToDispatch)(SurveyDetails)