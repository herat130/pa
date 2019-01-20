import React from 'react';
import classnames from 'classnames';

export default class Header extends React.Component {

  render() {
    return (
      <div className={classnames('header')}>
        <div className={classnames('logo')}>Header</div>
        <div className={classnames('nav')}></div>
      </div>
    );
  }
}