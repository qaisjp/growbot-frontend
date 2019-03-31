import React, { useState } from "react";
import { connect } from "react-redux";

import Card from "../../components/Card/Card.jsx";

import httpAddPlant from "../../http/add_plant";
import httpRenamePlant from "../../http/rename_plant";
import httpRemovePlant from "../../http/remove_plant";

import renamePlant from "../../actions/rename_plant";
import removePlant from "../../actions/remove_plant";

import PlantsAdd from "./PlantsAdd";
import PlantsRemove from "./PlantsRemove";
import PlantsRename from "./PlantsRename"

const PlantsCard = props => {
  const [selectedPlant, selectPlant] = useState({});
  const [addPlantModalOpen, addPlantModalVisible] = useState(false);
  const [renamePlantModalOpen, renamePlantModalVisible] = useState(false);
  const [renamePlantText, setRenamePlantText] = useState("");
  const [removePlantModalOpen, removePlantModalVisible] = useState(false);

  const { loginToken, plants, onPlantAdded } = props;

  const reduxPlants = plants;

  const onRenamePlant = async (renamePlantName) => {
    console.log(reduxPlants);
    if (renamePlantName === "") {
      // todo: improve alert
      alert("Please make sure you've typed in a new name!");
      return;
    }

    const { reduxRenamePlant } = props;

    const response = await httpRenamePlant(
      loginToken,
      selectedPlant.id,
      renamePlantName
    );

    if (response.status === 200) {
      reduxRenamePlant(selectedPlant, renamePlantName);
    }

    renamePlantModalVisible(false);
  };
  const onRemovePlant = async () => {
    const { reduxRemovePlant } = props;

    const response = await httpRemovePlant(loginToken, selectedPlant.id);

    if (response.status === 200) {
      reduxRemovePlant(selectedPlant);
    }

    removePlantModalVisible(false);
  };
  const onAddPlant = async newPlantName => {
    if (newPlantName === "") {
      // todo: improve alert
      alert("Please make sure you've entered a name for your new plant!");
      return;
    }

    const response = await httpAddPlant(loginToken, newPlantName);

    if (response.status === 200) {
      onPlantAdded();
    }

    addPlantModalVisible(false);
  };

  return (
    <React.Fragment>
      <Card
        title={
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>Your Plants</span>
            <button
              onClick={() => addPlantModalVisible(true)}
              className="btn btn-sm btn-danger"
            >
              Add Plant
            </button>
          </span>
        }
        content={
          <div>
            <ul className="list-group">
              {reduxPlants
                .filter(plant => plant !== undefined)
                .map((plant, idx) => (
                  <li key={idx} className="list-group-item">
                    {plant.name}{" "}
                    <button
                      onClick={() => {
                        const plant = reduxPlants[idx];
                        selectPlant(plant);
                        removePlantModalVisible(true);
                      }}
                      type="button"
                      style={{ marginLeft: "10px" }}
                      className="btn btn-sm btn-danger pull-right"
                    >
                      <i className="glyphicon glyphicon-trash" />
                    </button>{" "}
                    <button
                      onClick={() => {
                        const plant = reduxPlants[idx];
                        selectPlant(plant);
                        setRenamePlantText(plant.name);
                        renamePlantModalVisible(true);
                      }}
                      type="button"
                      className="btn btn-sm btn-danger pull-right"
                    >
                      <i className="glyphicon glyphicon-pencil" />
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        }
      />

      <PlantsAdd
        onSubmit={onAddPlant}
        visible={addPlantModalOpen}
        onClose={() => addPlantModalVisible(false)}
      />
      <PlantsRename
        onSubmit={onRenamePlant}
        visible={renamePlantModalOpen}
        onClose={() => renamePlantModalVisible(false)}
        defaultText={renamePlantText}
      />
      <PlantsRemove
        onSubmit={onRemovePlant}
        visible={removePlantModalOpen}
        onClose={() => removePlantModalVisible(false)}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const {
    auth: { loginToken },
    plantState: { plants }
  } = state;
  return { plants, loginToken };
};

const mapDispatchToProps = dispatch => {
  return {
    reduxRemovePlant: plant => dispatch(removePlant(plant)),
    reduxRenamePlant: (plant, name) => dispatch(renamePlant(plant, name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlantsCard);
