import {
  FETCH_SURVEY_SUCESS,
  FETCH_SURVEY_FETCH_START,
  FETCH_SURVEY_FAIL,
  GO_TO_NEXT_QUETION,
  GO_TO_PREVIOUS_QUETION,
} from '../util/constants';
import { IActionType } from '../actions/survey.actions';

export interface ISurveyQuestion {
  question_type: string;
  identifier: string;
  question: string;
  description: string;
  required: boolean;
  multiple: boolean;
  choices: [];
  jumps: [];
}

export interface ISurveyState {
  loading: boolean;
  error: boolean;
  survey: Array<ISurveyQuestion>,
  currentQuestionIndex: number;
}

const initialState: ISurveyState = {
  loading: false,
  error: false,
  survey: [],
  currentQuestionIndex: 0,
};

export default function (state = initialState, action: IActionType): ISurveyState {
  switch (action.type) {
    case FETCH_SURVEY_FETCH_START:
      return Object.assign({}, state, {
        loading: true,
        error: false,
        survey: null,
      });
    case FETCH_SURVEY_SUCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        survey: action.payload.survey.surveyDetails.questions,
      });
    case FETCH_SURVEY_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: true,
        survey: null,
      });
    case GO_TO_NEXT_QUETION:
      return Object.assign({}, state, {
        currentQuestionIndex: action.payload.currentQuestionIndex,
      });
    case GO_TO_PREVIOUS_QUETION:
      return Object.assign({}, state, {
        currentQuestionIndex: action.payload.currentQuestionIndex,
      });
    default:
      return initialState;
  }
}