import { fetchWrapper } from '../util/fetchWrapper';
import {
  FETCH_SURVEY_SUCESS,
  FETCH_SURVEY_FETCH_START,
  FETCH_SURVEY_FAIL,
  UPDATE_ANSWER,
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

export const updateAnswer = (input: any, currentIndex: number) => {
  return {
    type: UPDATE_ANSWER,
    payload: { input, currentIndex },
  };
};