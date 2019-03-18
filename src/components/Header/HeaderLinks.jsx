import React from "react";
import { NavItem, Nav } from "react-bootstrap";

import store from "../../store";
import logout from "../../actions/logout";

const HeaderLinks = () => {
  return (
    <div>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">
          Settings
        </NavItem>
        <NavItem onClick={() => store.dispatch(logout())} eventKey={3}>
          Log out
        </NavItem>
      </Nav>
    </div>
  );
};

export default HeaderLinks;
