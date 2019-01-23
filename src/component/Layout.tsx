import React from 'react';
import Header from './Header';
import Footer from './Footer';
import classnames from 'classnames';
import '../assets/styles/layout.scss';

export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <div className={'blank-space-50'} />
        <div className={classnames('container')}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}