import React, { useState } from "react";
import { Navbar } from "react-bootstrap";

import HeaderLinks from "./HeaderLinks";

import dashboardRoutes from "../../routes/dashboard_routes";

const Header = props => {

  const { location } = props;
  const [sidebarExists, setSidebarExists] = useState(false);

  const mobileSidebarToggle = event => {
    if(!sidebarExists) {
      setSidebarExists(true);
    }
    event.preventDefault();

    // This is very very bad!!!!!
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const brand = dashboardRoutes.filter(route => route.path === location.pathname || route.path === "/" ).shift();

  return (
    <Navbar fluid>
      <Navbar.Header>
        <Navbar.Brand>
          { brand.name }
        </Navbar.Brand>
        <Navbar.Toggle onClick={mobileSidebarToggle} />
      </Navbar.Header>
      <Navbar.Collapse>
        <HeaderLinks />
      </Navbar.Collapse>
    </Navbar>
  );

};

export default Header;