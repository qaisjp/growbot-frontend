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
                <h4 className="list-group-item-heading">PrototypeBot</h4>
                <p className="list-group-item-text">Battery: 100%; Water: 500ml</p></div>, <div>
                <h4 className="list-group-item-heading">NoobBot</h4>
                <p className="list-group-item-text">Battery: 88%; Water: 80ml</p></div>]}/>
            }/>
        </Col>
        <Col md={6}>
          <Card
            title={"Your Plants"}
            content={
              <ul className="list-group">
                <li className="list-group-item">Sunflower 1</li>
                <li className="list-group-item">Sunflower 2</li>
                <li className="list-group-item">Sunflower 3</li>
                <li className="list-group-item">Sunflower 4</li>
                <li className="list-group-item">Sunflower 5</li>
              </ul>
            }/>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Home;