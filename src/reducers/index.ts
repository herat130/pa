import { combineReducers } from 'redux';
import surveyReducer, { ISurveyState } from './survey.reducer';
import { Reducer } from 'redux';

export const allReducer = combineReducers({
  surveyReducer: surveyReducer as Reducer<ISurveyState>,
});