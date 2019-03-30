import React from "react";

import Card from "../../components/Card/Card";

const Logging = () => {
  return (
    <div className="content">
      <Card
        title={"Robot Logs"}
        content={
          <table className="table">
            <thead>
              <tr>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="danger">
                <td>
                  GrowBot is stuck between two objects
                  <br />
                  <small>
                    <strong>Robot: </strong>PrototypeBot ·{" "}
                    <strong>Plant: </strong>
                    Sunflower
                  </small>
                </td>
                <td>2 minutes ago</td>
              </tr>
              <tr className="success">
                <td>
                  GrowBot successfully watered your plant
                  <br />
                  <small>Robot: PrototypeBot · Plant: Sunflower</small>
                </td>
                <td>3 hours ago</td>
              </tr>
            </tbody>
          </table>
        }
      />
    </div>
  );
};

export default Logging;
