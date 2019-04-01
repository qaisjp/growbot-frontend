import React, {useState} from "react";
import {connect} from "react-redux";

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
    const [currentModal, setModal] = useState(null);
    const [renamePlantText, setRenamePlantText] = useState("");

    const {loginToken, plants, onPlantAdded} = props;

    const reduxPlants = plants;

    const onRenamePlant = async (renamePlantName) => {
        console.log(reduxPlants);
        if (renamePlantName === "") {
            // todo: improve alert
            alert("Please make sure you've typed in a new name!");
            return;
        }

        const {reduxRenamePlant} = props;

        const response = await httpRenamePlant(
            loginToken,
            selectedPlant.id,
            renamePlantName
        );

        if (response.status === 200) {
            reduxRenamePlant(selectedPlant, renamePlantName);
        }

        setModal(null);
    };
    const onRemovePlant = async () => {
        const {reduxRemovePlant} = props;

        const response = await httpRemovePlant(loginToken, selectedPlant.id);

        if (response.status === 200) {
            reduxRemovePlant(selectedPlant);
        }

        setModal(null);
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

        setModal(null);
    };

    const MiniButton = ({icon, onClick}) => {
        return (
            <button
                onClick={onClick}
                type="button"
                className="btn btn-sm btn-danger"
                style={{marginLeft: "0.5em"}}
            >
                <i className={`glyphicon glyphicon-${icon}`}/>
            </button>
        );
    }

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
                onClick={() => setModal("add")}
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
                                    <li key={idx} className="list-group-item" style={{display: "flex", justifyContent: "space-between", alignContent: "middle"}}>
                                        {plant.name}{" "}
                                        <span>
                                            <MiniButton icon="pencil"
                                                onClick={() => {
                                                    const plant = reduxPlants[idx];
                                                    selectPlant(plant);
                                                    setRenamePlantText(plant.name);
                                                    setModal("rename");
                                                }}
                                            />
                                            <MiniButton icon="trash"
                                                onClick={() => {
                                                    const plant = reduxPlants[idx];
                                                    selectPlant(plant);
                                                    setModal("remove");
                                                }}
                                            />
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                }
            />

            <PlantsAdd
                onSubmit={onAddPlant}
                visible={currentModal === "open"}
                onClose={() => setModal(null)}
            />
            <PlantsRename
                onSubmit={onRenamePlant}
                visible={currentModal === "rename"}
                onClose={() => setModal(null)}
                defaultText={renamePlantText}
            />
            <PlantsRemove
                onSubmit={onRemovePlant}
                visible={currentModal === "remove"}
                onClose={() => setModal(null)}
            />
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    const {
        auth: {loginToken},
        plantState: {plants}
    } = state;
    return {plants, loginToken};
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
