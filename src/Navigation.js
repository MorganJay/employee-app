import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                    Home
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/departments">
                    Departments
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/employees">
                    Employees
                </NavLink>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
