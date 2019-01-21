import * as React from 'react';
import { connect } from 'react-redux';
import { ISurveyState } from '../reducers/survey.reducer';

interface ISurveyMapStateToProps extends ISurveyState { }

class SurveyDetails extends React.Component<ISurveyMapStateToProps, any>{

  renderQuestionAnswer() {
    const { survey } = this.props;
    return survey.map(v => {
      return (
        <div>
          <p>{v.question}</p>
          <p>{v.answer}</p>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
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