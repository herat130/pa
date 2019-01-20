import { fetchWrapper } from '../util/fetchWrapper';
import {
  FETCH_SURVEY_SUCESS,
  FETCH_SURVEY_FETCH_START,
  FETCH_SURVEY_FAIL,
  GO_TO_NEXT_QUETION,
  GO_TO_PREVIOUS_QUETION,
} from '../util/constants';
import { ISurveyQuestion } from '../reducers/survey.reducer';

export interface IActionType {
  type: string;
  payload?: any;
};

interface ISurveyResponse {
  id: number;
  identifier: string;
  name: string;
  questions: [ISurveyQuestion];
}

export const surveyStart = (): IActionType => {
  return {
    type: FETCH_SURVEY_FETCH_START,
  };
};

export const surveyFetch = (): Promise<IActionType> => {
  return fetchWrapper('http://localhost:3000/json/survey.json')
    .then(result => surveySuccess(result))
    .catch(error => surveyFail(error))
}

export const surveySuccess = (survey: ISurveyResponse): IActionType => {
  return {
    type: FETCH_SURVEY_SUCESS,
    payload: { survey },
  };
};

export const surveyFail = (error: any): IActionType => {
  return {
    type: FETCH_SURVEY_FAIL,
    payload: { error },
  };
};

export const geToNextQuestion = (currentQuestionIndex: number): IActionType => {
  return {
    type: GO_TO_NEXT_QUETION,
    payload: { currentQuestionIndex },
  };
};

export const geToPreviousQuestion = (currentQuestionIndex: number): IActionType => {
  return {
    type: GO_TO_PREVIOUS_QUETION,
    payload: { currentQuestionIndex },
  };
};