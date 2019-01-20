import React from 'react';
import ErrorPage from './ErrorPage';

export default class ErrorComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error, info) {
    console.warning(info);
    return { error: true };
  }

  render() {
    if (this.state.error) {
      return <ErrorPage />;
    }

    return this.props.children;
  }

}