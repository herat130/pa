import { fetchWrapper } from '../util/fetchWrapper';
import { FETCH_SURVEY_FETCH_START, FETCH_SURVEY_FAIL, FETCH_SURVEY_SUCESS } from '../util/constants';

export const surveyStart = () => {
  return {
    type: FETCH_SURVEY_FETCH_START,
  };
};

export const surveyFetch = () => {
  return fetchWrapper('http://localhost:3000/json/survey.json')
    .then(result => surveySuccess(result))
    .catch(error => surveyFail(error))
}

export const surveySuccess = (survey) => {
  return {
    type: FETCH_SURVEY_SUCESS,
    payload: { survey },
  };
};

export const surveyFail = (error) => {
  return {
    type: FETCH_SURVEY_FAIL,
    payload: { error },
  };
};