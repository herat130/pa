import { combineReducers } from 'redux';
import surveyReducer from './survey.reducer';
export const allReducer = combineReducers({
  surveyReducer,
});