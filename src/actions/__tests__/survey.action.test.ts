import { surveyStart, surveyFetch } from '../survey.actions';
import { FETCH_SURVEY_FETCH_START, FETCH_SURVEY_SUCESS } from '../../util/constants';
import { mockSurvey } from '../../reducers/__mock__/survey.mock';
import * as fetchHelper from '../../util/fetchWrapper';

describe('test for survey fetch start action', () => {
  it('sync action', () => {
    const expectedAction = {
      type: FETCH_SURVEY_FETCH_START,
    }
    expect(surveyStart()).toEqual(expectedAction);
  });

  it('test for fetch survey async action', () => {

    const spy = jest.spyOn(fetchHelper, 'fetchWrapper').mockImplementation(() => {
      return new Promise((resolve, reject) => resolve(mockSurvey));
    });
    const expectedAction = {
      type: FETCH_SURVEY_SUCESS,
      payload: { survey: mockSurvey },
    };    
    surveyFetch().then(action => {
      expect(action).toEqual(expectedAction)
    });
    expect(spy).toHaveBeenCalled();
  });
});