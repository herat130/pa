import * as React from 'react';
import ErrorPage from './ErrorPage';

interface IErrorComponentState {
  error: boolean;
}

export default class ErrorComponent extends React.Component<any, IErrorComponentState> {

  constructor(props: any) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error: any, info: any) {
    console.info(info);
    return { error: true };
  }

  render() {
    if (this.state.error) {
      return <ErrorPage />;
    }

    return this.props.children;
  }

}