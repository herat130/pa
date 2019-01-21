import { ISurveyState } from "../reducers/survey.reducer";

export const currentIndexFromIdentifier = (state: { surveyReducer: ISurveyState }, identifier: string) => {
  const index = (state.surveyReducer.survey || []).findIndex(v => v.identifier === identifier);
  return identifier === '' ? 0 : index;
};