import React from 'react';
import { connect } from 'react-redux';
import { surveyFetch, surveyStart } from '../actions/survey.actions';

class Survey extends React.Component {

  componentDidMount() {
    this.props.surveyFetch();
  }

  render() {
    const { loading, error } = this.props;
    if (loading) {
      return <p>Fetching...</p>
    }
    if (error) {
      return <p>Has Error</p>
    }
    return (
      <p>Survey</p>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.surveyReducer.loading,
    error: state.surveyReducer.error,
    survey: state.surveyReducer.survey,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    surveyFetch: () => {
      dispatch(surveyStart());
      surveyFetch()
        .then(action => dispatch(action));
    }
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(Survey);