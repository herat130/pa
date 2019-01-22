import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { surveyFetch, surveyStart, updateAnswer } from '../actions/survey.actions';
import { ISurveyState, ISurveyQuestion } from '../reducers/survey.reducer';
import { Dispatch } from 'redux';
import { IActionType } from '../actions/survey.actions';
import AnswerComponent, { IAnswerProps } from '../component/AnswerComponent';
import ProgressBar, { IProgressBar } from '../component/ProgressBar';
import { currentIndexFromIdentifier } from '../selectors/survey.selector';
import '../assets/styles/survey.scss';
interface ISurveyMapStateToProps extends ISurveyState {

}

interface SurveyRouterProps {
  history?: any;
  location?: any;
  match?: any;
}

interface ISurveyMapStateToDispatch {
  surveyFetch: () => void;
  updateAnswer: (input: any, curentIndex: number) => void;
}

export type ISurveyProps = ISurveyMapStateToProps & ISurveyMapStateToDispatch
  & SurveyRouterProps;

export class Survey extends React.Component<ISurveyProps, any> {

  componentDidMount() {
    const { survey } = this.props;
    if (survey.length === 0) {
      this.props.surveyFetch();
    }
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

  previousBtn() {
    const { currentQuestionIndex, survey } = this.props;
    const currentQuestion = survey[currentQuestionIndex];
    const prevQuestion = survey[currentQuestionIndex - 1];
    if (currentQuestionIndex === 0) {
      return false;
    }
    return (
      <Link
        to={`/survey/${prevQuestion.identifier}`}
        className="previous"
      >
        Previous
      </Link>
    );
  }

  nextBtn() {
    const { survey, currentQuestionIndex } = this.props;
    const currentQuestion = survey[currentQuestionIndex];
    const nextQuestion = survey[currentQuestionIndex + 1];
    if ((survey.length - 1) === currentQuestionIndex) {
      return (
        <Link
          to={'/surveyDetails'}
          className="detailslink"
        >
          Details
        </Link>
      );
    }
    return (
      <Link
        to={`/survey/${nextQuestion.identifier}`}
        className={classnames('next', {
          'disable': (currentQuestion.required && !(currentQuestion.answer))
        })}
      >
        Next
      </Link>
    );
  }

  progressBar() {
    const { currentQuestionIndex, survey } = this.props;
    const ProgressBarProps: IProgressBar = {
      totalQuestions: survey.length,
      currentQuestion: currentQuestionIndex,
    }
    return (
      <div className={classnames('column-12')}>
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
      <div className={classnames('wrapper')}>
        {this.progressBar()}
        {this.displayCurrentQuetion()}
        {this.previousBtn()}
        {this.nextBtn()}
      </div>
    )
  }
}



const mapStateToProps = (state: { surveyReducer: ISurveyState }, props: any): ISurveyMapStateToProps => {
  const identifier = props.match.params.identifier || '';
  return {
    loading: state.surveyReducer.loading,
    error: state.surveyReducer.error,
    survey: state.surveyReducer.survey,
    currentQuestionIndex: currentIndexFromIdentifier(state, identifier),
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
  };
};

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Survey as any));