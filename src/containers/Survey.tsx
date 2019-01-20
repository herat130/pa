import * as React from 'react';
import { connect } from 'react-redux';
import { surveyFetch, surveyStart } from '../actions/survey.actions';
import { ISurveyState } from '../reducers/survey.reducer';
import { Dispatch } from 'redux';
import { IActionType } from '../actions/survey.actions';
import AnswerComponent, { IAnswerProps } from '../component/AnswerComponent';

interface ISurveyMapStateToProps extends ISurveyState { }

interface ISurveyMapStateToDispatch {
  surveyFetch: () => void;
}

interface IOwnProps {

}

type ISurveyProps = ISurveyMapStateToProps & ISurveyMapStateToDispatch & IOwnProps;

class Survey extends React.Component<ISurveyProps, any> {

  componentDidMount() {
    this.props.surveyFetch();
  }

  displayCurrentQuetion = () => {
    const { survey, currentQuestionIndex } = this.props;
    const currentQuestion: IAnswerProps = survey[currentQuestionIndex] || '';
    return (
      <React.Fragment>
        <p>{currentQuestion.question}</p>
        <AnswerComponent {...currentQuestion} />
      </React.Fragment>
    )
  }

  render() {
    const { loading, error } = this.props;
    if (loading) {
      return <p>Fetching...</p>
    }
    if (error) {
      return <p>Has Error</p>
    }
    return (
      <p>{this.displayCurrentQuetion()}</p>
    )
  }
}



const mapStateToProps = (state: { surveyReducer: ISurveyState }, props: IOwnProps): ISurveyMapStateToProps => {
  return {
    loading: state.surveyReducer.loading,
    error: state.surveyReducer.error,
    survey: state.surveyReducer.survey,
    currentQuestionIndex: state.surveyReducer.currentQuestionIndex,
  };
};

const mapStateToDispatch = (dispatch: Dispatch<IActionType>): ISurveyMapStateToDispatch => {
  return {
    surveyFetch: () => {
      dispatch(surveyStart());
      surveyFetch()
        .then(action => dispatch(action));
    }
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(Survey);