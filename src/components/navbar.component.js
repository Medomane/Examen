import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Home</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/users" className="nav-link">Create</Link>
          </li>
        </ul>
        <div className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" id="search" type="search" placeholder="username" aria-label="Search" />
          <button onClick={(e) => { let str = document.getElementById('search').value.trim() ; if(str !== '') document.location.href = '/users/1/10?search='+str;else e.preventDefault(); } } 
           className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </div>
        </div>
      </nav>
    );
  }
}