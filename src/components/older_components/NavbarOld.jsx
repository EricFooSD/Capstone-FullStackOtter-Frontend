import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements.jsx';

export default function Navbar() {
  return (
    <Nav>
      <NavLink to="/">
        <img
          src="https://www.pngitem.com/pimgs/m/79-793607_otter-otter-icon-png-transparent-png.png"
          height="40"
          width="40"
          alt="logo"
        />
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/" activeStyle>
          Home
        </NavLink>
        <NavLink to="/search" activeStyle>
          Search
        </NavLink>
        <NavLink to="/dashboard" activeStyle>
          Dashboard
        </NavLink>
        <NavLink to="/profile" activeStyle>
          Profile Page
        </NavLink>

      </NavMenu>
      <NavBtn>
        <div>
          <NavBtnLink to="/login">Log In</NavBtnLink>
        </div>
      </NavBtn>
    </Nav>
  );
}
