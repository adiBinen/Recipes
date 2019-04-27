import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Capitalize from '../../filters/Capitalize.js';
import './Navbar.scss';

export default ({ currUser, logout, history }) => {

    const onLogout = async () => {
        if (await logout()) history.push('/')
    }

    const links = (currUser && currUser._id) ?
        (
            <nav className="links">
                <NavLink to={`/user/${currUser._id}`} title='See your profile'>
                    <div className="user-section">
                        <img className="user-img" src={currUser.img} alt="user"/>
                        <p className="navbar-welcome">Hello, <Capitalize str={currUser.name}/></p>
                    </div>
                </NavLink>
                <NavLink onClick={onLogout} to='/' title="Logout">
                    <i className="fas fa-sign-out-alt"></i>
                </NavLink>
            </nav>
        ) : (
            <nav className="links">
                <NavLink to='/signup'>Sign up</NavLink>
                <NavLink to='/login'>Log in</NavLink>
            </nav>
        );

    return (
        <header className="navbar">
            <div className="wrapper">
                <div className="logo">
                    <Link to='/'><h1>Recipes.</h1></Link>
                </div>
                {links}
            </div>
        </header>
    )
}