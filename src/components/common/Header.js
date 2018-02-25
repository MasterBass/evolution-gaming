import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../../logo.svg';
import './Header.css';

const Header = () => {
    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Evolution Gaming candidate test assignment</h1>
            </header>
            <p className="App-intro">
                <NavLink to='/' exact activeClassName='selected'>Home</NavLink>{" | "}
                <NavLink to='/about' activeClassName='selected'>About</NavLink>
            </p>
        </div>
    );
};

export default Header;