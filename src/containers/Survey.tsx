import * as React from 'react';
import { connect } from 'react-redux';
import { surveyFetch, surveyStart, updateAnswer, geToNextQuestion, geToPreviousQuestion } from '../actions/survey.actions';
import { ISurveyState, ISurveyQuestion } from '../reducers/survey.reducer';
import { Dispatch } from 'redux';
import { IActionType } from '../actions/survey.actions';
import AnswerComponent, { IAnswerProps } from '../component/AnswerComponent';

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
    if ((survey.length - 1) === currentQuestionIndex) {
      return false;
    }
    return (
      <button
        onClick={this.goToNext}
      >
        Next
      </button>
    );
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
      <React.Fragment>
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