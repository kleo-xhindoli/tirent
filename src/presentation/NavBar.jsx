import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => (
    <header>
        <Link to="/">Home</Link>
        <Link to="/about-us">About</Link>
        {props.isLoggedIn ? <a href="#" onClick={props.logOut}>Log Out</a> : <Link to="/login">Log In</Link>}
    </header>
)

export default NavBar
