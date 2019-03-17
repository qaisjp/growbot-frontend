import React from "react";
import { NavItem, Nav } from "react-bootstrap";

const HeaderLinks = () => {
  return (
    <div>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">
          Settings
        </NavItem>
        <NavItem eventKey={3} href="#">
          Log out
        </NavItem>
      </Nav>
    </div>
  );
};

export default HeaderLinks;
