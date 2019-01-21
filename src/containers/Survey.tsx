import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { surveyFetch, surveyStart, updateAnswer, geToNextQuestion, geToPreviousQuestion } from '../actions/survey.actions';
import { ISurveyState, ISurveyQuestion } from '../reducers/survey.reducer';
import { Dispatch } from 'redux';
import { IActionType } from '../actions/survey.actions';
import AnswerComponent, { IAnswerProps } from '../component/AnswerComponent';
import ProgressBar, { IProgressBar } from '../component/ProgressBar';

interface ISurveyMapStateToProps extends ISurveyState { }

interface ISurveyMapStateToDispatch {
  surveyFetch: () => void;
  updateAnswer: (input: any, curentIndex: number) => void;
  goToPrevious: (index: number) => void;
  goToNext: (index: number) => void;
}

interface IOwnProps {

}

type ISurveyProps = ISurveyMapStateToProps & ISurveyMapStateToDispatch & IOwnProps;

class Survey extends React.Component<ISurveyProps, any> {

  componentDidMount() {
    this.props.surveyFetch();
  }

  updateAnswer = (event: any) => {
    const { currentQuestionIndex } = this.props;
    const input = event.target.value;
    this.props.updateAnswer(input, currentQuestionIndex);
  }

  displayCurrentQuetion = () => {
    const { survey, currentQuestionIndex } = this.props;
    const currentQuestion: ISurveyQuestion = survey[currentQuestionIndex] || '';
    const answerProps: IAnswerProps = {
      ...currentQuestion,
      updateAnswer: this.updateAnswer,
    }
    return (
      <React.Fragment>
        <p>{currentQuestion.question}</p>
        <AnswerComponent {...answerProps} />
      </React.Fragment>
    )
  }

  goToPrevious = () => {
    const { currentQuestionIndex } = this.props;
    this.props.goToPrevious(currentQuestionIndex - 1);
  }

  goToNext = () => {
    const { currentQuestionIndex } = this.props;
    this.props.goToNext(currentQuestionIndex + 1);
  }

  previousBtn() {
    const { currentQuestionIndex } = this.props;
    if (currentQuestionIndex === 0) {
      return false;
    }
    return (
      <button
        onClick={this.goToPrevious}
      >
        Previous
      </button>
    );
  }

  nextBtn() {
    const { survey, currentQuestionIndex } = this.props;
    const currentQuestion = survey[currentQuestionIndex] || {};
    if ((survey.length - 1) === currentQuestionIndex) {
      return (
        <Link to={'/surveyDetails'}>
          Details
        </Link>
      );
    }
    return (
      <button
        onClick={this.goToNext}
        disabled={currentQuestion.required && !(currentQuestion.answer)}
      >
        Next
      </button>
    );
  }

  progressBar() {
    const { currentQuestionIndex, survey } = this.props;
    const ProgressBarProps: IProgressBar = {
      totalQuestions: survey.length,
      currentQuestion: currentQuestionIndex + 1,
    }
    return (
      <div>
        <ProgressBar {...ProgressBarProps} />
      </div>
    )
  }

  render() {
    const { loading, error, survey } = this.props;
    if (loading || survey.length === 0) {
      return <p>Fetching...</p>
    }
    if (error) {
      return <p>Has Error</p>
    }
    return (
      <React.Fragment>
        {this.progressBar()}
        {this.displayCurrentQuetion()}
        {this.previousBtn()}
        {this.nextBtn()}
      </React.Fragment>
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
    },
    updateAnswer: (input, curentIndex) => dispatch(updateAnswer(input, curentIndex)),
    goToNext: (index: number) => { dispatch(geToNextQuestion(index)) },
    goToPrevious: (index: number) => { dispatch(geToPreviousQuestion(index)) },
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(Survey);