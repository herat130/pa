import { FETCH_SURVEY_SUCESS, FETCH_SURVEY_FETCH_START, FETCH_SURVEY_FAIL } from '../util/constants'
const initialState = {
  loading: false,
  error: false,
  survey: null,
};
export default function (state = initialState, action) {
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
        survey: null,
      });
    case FETCH_SURVEY_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: true,
        survey: null,
      });
    default:
      return initialState;
  }
}