import React from 'react';
import { Link } from 'react-router-dom'
export default class Header extends React.Component {

  render() {
    return (
      <div className="row header">
        <div className="col-12 align-self-center">
          <Link to={'/'}>
            <div className="card card-block text-center border-0 ">
              Header Logo
            </div>
          </Link>
        </div >
      </div>

    );
  }
}