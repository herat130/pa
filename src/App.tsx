import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './component/Layout';
import ErrorComponent from './component/ErrorComponent';
import Survey from './containers/Survey';
import SurveyDetails from './containers/SurveyDetails';
import 'bootstrap/dist/css/bootstrap.css';
class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout>
          <ErrorComponent>
            <Switch>
              <Route exact path={'/'} component={Survey} />
              <Route exact path={'/survey/:identifier'} component={Survey} />
              <Route exact path={'/surveyDetails'} component={SurveyDetails} />
            </Switch>
          </ErrorComponent>
        </Layout>
      </div>
    );
  }
}

export default App;
