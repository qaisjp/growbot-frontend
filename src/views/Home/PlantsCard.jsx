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
    const [modal, setModal] = useState({});
    const [renamePlantText, setRenamePlantText] = useState("");

    const {loginToken, plants, onPlantAdded} = props;

    const reduxPlants = plants;
    const resetModal = () => setModal({});
    const modalData = () => {
        const {name, ...data} = modal;
        return data;
    }
    const modalName = () => {
        const {name, ...data} = modal;
        return name;
    }

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

        resetModal();
    };
    const onRemovePlant = async () => {
        const {reduxRemovePlant} = props;

        const response = await httpRemovePlant(loginToken, selectedPlant.id);

        if (response.status === 200) {
            reduxRemovePlant(selectedPlant);
        }

        resetModal();
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

        resetModal();
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
                onClick={() => setModal({ name: "add" })}
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
                                    <li key={idx} className="list-group-item" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                        {plant.name}
                                        <span>
                                            <MiniButton icon="pencil"
                                                onClick={() => {
                                                    const plant = reduxPlants[idx];
                                                    selectPlant(plant);
                                                    setRenamePlantText(plant.name);
                                                    setModal({ name: "rename" });
                                                }}
                                            />
                                            <MiniButton icon="trash"
                                                onClick={() => {
                                                    const plant = reduxPlants[idx];
                                                    selectPlant(plant);
                                                    setModal({ name: "remove" });
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
                visible={modalName() === "add"}
                onClose={resetModal}
            />
            <PlantsRename
                onSubmit={onRenamePlant}
                visible={modalName() === "rename"}
                onClose={resetModal}
                defaultText={renamePlantText}
            />
            <PlantsRemove
                onSubmit={onRemovePlant}
                visible={modalName() === "remove"}
                onClose={resetModal}
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
