import {
  FETCH_SURVEY_SUCESS,
  FETCH_SURVEY_FETCH_START,
  FETCH_SURVEY_FAIL,
  UPDATE_ANSWER,
} from '../util/constants';
import { IActionType } from '../actions/survey.actions';

export interface IChoices {
  label: string;
  value: string;
  selected: boolean;
}

export interface ISurveyQuestion {
  question_type: string;
  identifier: string;
  question: string;
  description: string;
  required: boolean;
  multiple: boolean;
  choices: IChoices[];
  jumps: [];
  answer: any;
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
    case UPDATE_ANSWER:
      const currentIndex = action.payload.currentIndex;
      state.survey[currentIndex] = updateAnswer(state, currentIndex, action);
      return Object.assign({}, state, {
        survey: Object.assign([], state.survey),
      });
    default:
      return initialState;
  }
}

const updateAnswer = (state: ISurveyState, currentIndex: number, action: IActionType) => {
  let choices;
  let currentQuestion = state.survey[currentIndex] || {};
  if (currentQuestion.question_type === 'text') {
    currentQuestion.answer = action.payload.input;
  }
  if (currentQuestion.question_type === 'multiple-choice') {
    if (currentQuestion.multiple) {
      choices = (currentQuestion.choices || []).map(v => {
        if (v.label == action.payload.input) {
          return Object.assign({}, v, { selected: !v.selected })
        }
        return v;
      });
    }
    if (!currentQuestion.multiple) {
      choices = (currentQuestion.choices || []).map(v => {
        if (v.label == action.payload.input) {
          return Object.assign({}, v, { selected: !v.selected });
        }
        return Object.assign({}, v, { selected: false });
      });
    }
    currentQuestion = Object.assign({}, currentQuestion, {
      answer: (choices || []).filter(v => v.selected).map(v => v.label).join(','),
      choices: choices || [],
    });
  }
  return Object.assign({}, currentQuestion);
}