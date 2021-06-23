import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {NAV_BAR_LOGO_ONE} from '../images/images';

const TopNavBar = ()=>{

    
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand pl-3">
                    <img src={NAV_BAR_LOGO_ONE} width={30} height={30} className="d-inline-block align-top rounded" alt="App Logo" loading="lazy" />
                    &nbsp;{process.env.REACT_APP_NAME}
                </Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/" className="nav-item nav-link">Home</Link>
                        <Link to="/" className="nav-item nav-link">Help</Link>
                    </div>
                </div>
            </nav>
        )
    
}

export default TopNavBar;
