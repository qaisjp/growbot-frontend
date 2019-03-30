import React from "react";

const Logging = () => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Message</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr className="table-danger">
          <td>
            GrowBot is stuck between two objects
            <br/>
              <small>
                <strong>Robot: </strong>PrototypeBot · <strong>Plant: </strong>
                Sunflower
              </small>
          </td>
          <td>2 minutes ago</td>
        </tr>
        <tr className="table-success">
          <td>
            GrowBot successfully watered your plant
            <br/>
              <small>
                Robot: PrototypeBot · Plant:
                Sunflower
              </small>
          </td>
          <td>3 hours ago</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Logging;
