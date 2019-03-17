import React from "react";
import {Grid, Row, Col } from "react-bootstrap";

import Card from "../../components/Card/Card.jsx";
import SelectableList from "../../components/List/SelectableList.jsx";

import green_circle from "../../assets/img/green_circle.png";
import red_circle from "../../assets/img/red_circle.png";

const Home = () => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col md={6}>
          <Card
            title={"Your Robots"}
            content={
              <SelectableList items={[<div>
                <h4 className="list-group-item-heading"><img src={green_circle} alt="Online" /> PrototypeBot</h4>
                <span style={{marginRight: '15px'}}className="label label-primary">Water: 500ml</span>
                <span className="label label-default">Battery: 100%</span>
              </div>, <div disabled>
                <h4 className="list-group-item-heading disabled"><img src={red_circle} alt="Offline" /> NoobBot</h4>
                <span style={{marginRight: '15px'}}className="label label-primary">Water: 335ml</span>
                <span className="label label-default">Battery: 93%</span>
              </div>]}/>
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