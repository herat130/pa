import SurveyReducer, { initialState } from '../../reducers/survey.reducer';
import { FETCH_SURVEY_FETCH_START, FETCH_SURVEY_SUCESS, UPDATE_ANSWER } from '../../util/constants';
import { mockSurvey } from '../__mock__/survey.mock';

describe('Survey Reducer test suits', () => {

  it('should not impact the state on wrong action', () => {
    expect(SurveyReducer(undefined, { type: 'NO_ACTION' })).toEqual(initialState);
  });

  it('start survey fetch', () => {
    const action = {
      type: FETCH_SURVEY_FETCH_START,
    };
    expect(SurveyReducer(initialState, action).loading).toEqual(true);
  });

  it('on survey fetch success loading and error params check', () => {
    const action = {
      type: FETCH_SURVEY_SUCESS,
      payload: { survey: mockSurvey },
    };
    expect(SurveyReducer(initialState, action).loading).toEqual(false);
    expect(SurveyReducer(initialState, action).error).toEqual(false);
    expect(SurveyReducer(initialState, action).survey).toEqual(mockSurvey.surveyDetails.questions);
    expect(SurveyReducer(initialState, action).currentQuestionIndex).toEqual(0);
  });


  it('test for proper text answer update', () => {
    const stateSurvey = Object.assign({}, initialState, { survey: mockSurvey.surveyDetails.questions });
    const action = {
      type: UPDATE_ANSWER,
      payload: { input: "herat", currentIndex: 0 },
    };
    expect(SurveyReducer(stateSurvey, action).survey[action.payload.currentIndex].answer).toEqual("herat");
    const action2 = {
      type: UPDATE_ANSWER,
      payload: { input: "herat1", currentIndex: 0 },
    };
    expect(SurveyReducer(stateSurvey, action2).survey[action.payload.currentIndex].answer).toEqual("herat1");
  });

  it('test for proper checkbox multiple answer update', () => {
    const stateSurvey = Object.assign({}, initialState, { survey: mockSurvey.surveyDetails.questions });
    const updatedValue = mockSurvey.surveyDetails.questions[3].choices[0].value;
    const action = {
      type: UPDATE_ANSWER,
      payload: { input: updatedValue, currentIndex: 3 },
    };
    const returnedState = SurveyReducer(stateSurvey, action);
    expect(returnedState.survey[action.payload.currentIndex].answer).toEqual(updatedValue);
    expect(returnedState.survey[action.payload.currentIndex].choices[0].selected).toBeTruthy();

    const updatedValue2 = mockSurvey.surveyDetails.questions[3].choices[1].value;
    const action2 = {
      type: UPDATE_ANSWER,
      payload: { input: updatedValue2, currentIndex: 3 },
    };
    const returnedState2 = SurveyReducer(returnedState, action2);
    expect(returnedState2.survey[action.payload.currentIndex].answer).toEqual(updatedValue + "," + updatedValue2);
    expect(returnedState2.survey[action.payload.currentIndex].choices[1].selected).toBeTruthy();
  });

  it('radio button answer should toggle answer', () => {
    const stateSurvey = Object.assign({}, initialState, { survey: mockSurvey.surveyDetails.questions });
    const updatedValue = mockSurvey.surveyDetails.questions[2].choices[0].value;
    const action = {
      type: UPDATE_ANSWER,
      payload: { input: updatedValue, currentIndex: 2 },
    };
    const returnedState = SurveyReducer(stateSurvey, action);
    expect(returnedState.survey[action.payload.currentIndex].answer).toEqual(updatedValue);
    expect(returnedState.survey[action.payload.currentIndex].choices[0].selected).toBeTruthy();
    
    const returnedState2 = SurveyReducer(returnedState, action);
    expect(returnedState2.survey[action.payload.currentIndex].answer).toEqual('');
    expect(returnedState2.survey[action.payload.currentIndex].choices[0].selected).toBeFalsy();

  });
});
