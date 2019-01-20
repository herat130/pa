import React, { Component } from 'react';
import Layout from './component/Layout';
import ErrorComponent from './component/ErrorComponent';
import Survey from './containers/Survey';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout>
          <ErrorComponent>
            <Survey />
          </ErrorComponent>
        </Layout>
      </div>
    );
  }
}

export default App;
