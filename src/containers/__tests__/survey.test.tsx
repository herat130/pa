import * as React from 'react';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Link, HashRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { Survey, ISurveyProps } from '../Survey';
import { mockSurvey } from '../../reducers/__mock__/survey.mock';

configure({ adapter: new Adapter() });
let wrapper: any;
let surveyProps: ISurveyProps = {
  loading: false,
  error: false,
  survey: mockSurvey.surveyDetails.questions,
  currentQuestionIndex: 0,
  history: null,
  location: null,
  match: null,
  surveyFetch: () => { },
  updateAnswer: (input: any, curentIndex: number) => { },
}

describe('Survey container test', () => {

  beforeEach(() => {
    wrapper = mount(
      <HashRouter>
        <Survey {...surveyProps} />
      </HashRouter>
    );
  });

  it('next should disable till answer found', () => {
    expect(wrapper.find('.next').at(0).hasClass('disable')).toEqual(true);
  });

  it('previous should not be enable on first question', () => {
    expect(wrapper.find('.previous').length).toBe(0);
  });

  it('next should be hide on last question', () => {
    surveyProps.currentQuestionIndex = mockSurvey.surveyDetails.questions.length - 1;
    const wrapper1 = mount(
      <HashRouter>
        <Survey {...surveyProps} />
      </HashRouter>
    );
    expect(wrapper1.find('.next').length).toBe(0);
  });

});