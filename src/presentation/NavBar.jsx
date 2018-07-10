import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

const NavBar = (props) => {
    const rightMenuLogged = (
        <Menu.Menu position='right'>
            <Menu.Item><Button onClick={props.logOut}>Log Out</Button></Menu.Item>
        </Menu.Menu>
    )
    const rightMenuNotLogged = (
        <Menu.Menu position='right'>
            <Menu.Item active={props.location.pathname === '/login'}><NavLink to="/login">Sign In</NavLink></Menu.Item>
            <Menu.Item active={props.location.pathname === '/register'}><NavLink to="/register">Sign Up</NavLink></Menu.Item>
        </Menu.Menu>
    )
    return (
        <Menu id="nav" size="massive">
            <Menu.Item header>
                <img style={{width: '2.3rem'}} src="/icon.png" alt="Logo"/>
            </Menu.Item>
            <Menu.Item active={props.location.pathname === '/'}><NavLink to="/">Home</NavLink></Menu.Item>
            <Menu.Item active={props.location.pathname === '/about-us'}><NavLink to="/about-us">About Us</NavLink></Menu.Item>
            {props.isLoggedIn ? rightMenuLogged : rightMenuNotLogged}
        </Menu>
    )
}

export default NavBar
