import React from "react";
import {Grid, Row, Col } from "react-bootstrap";

import Card from "../../components/Card/Card.jsx";
import SelectableList from "../../components/List/SelectableList.jsx";

const Home = () => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col md={6}>
          <Card
            title={"Your Robots"}
            content={
              <SelectableList items={[<div>
                <h4 className="list-group-item-heading">List group item heading</h4>
                <p className="list-group-item-text">...</p></div>, <div>
                <h4 className="list-group-item-heading">List group item heading</h4>
                <p className="list-group-item-text">...</p></div>]}/>
            }/>
        </Col>
        <Col md={6}>
          <Card
            title={"Your Robots"}
            content={
              <div className="list-group">
                <a href="#" className="list-group-item active">
                  <h4 className="list-group-item-heading">List group item heading</h4>
                  <p className="list-group-item-text">...</p>
                </a>
                <a href="#" className="list-group-item inactive">
                  <h4 className="list-group-item-heading">List group item heading</h4>
                  <p className="list-group-item-text">...</p>
                </a>
              </div>
            }/>
        </Col>
        <Col md={6}>
          <Card
            title={"Your Robots"}
            content={
              <div className="list-group">
                <a href="#" className="list-group-item active">
                  <h4 className="list-group-item-heading">List group item heading</h4>
                  <p className="list-group-item-text">...</p>
                </a>
                <a href="#" className="list-group-item inactive">
                  <h4 className="list-group-item-heading">List group item heading</h4>
                  <p className="list-group-item-text">...</p>
                </a>
              </div>
            }/>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Home;