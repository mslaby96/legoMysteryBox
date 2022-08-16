import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from "../AppContext/AppContext";
import Details from "../Details/Details";
import { GetFigureDetails } from "../shared/Api";
import { IFigure } from "../shared/models";

import "./Pick.css";

const Pick = () => {
  const { appState, dispatchAppState } = useAppStateContext();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [figureDetails, setFigureDetails] = useState<IFigure>();

  let navigate = useNavigate();

  useEffect(() => {
    if (appState.figures.length === 0) {
      navigate("/", { replace: true });
    }
  }, []);

  const handleSelectedFigure = (figure: IFigure) => {
    if (!isDialogOpen) {
      dispatchAppState({
        type: "SETSELECTEDFIGURE",
        payload: { selectedFigure: figure },
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOpenDialog = (e: React.MouseEvent, figure: IFigure) => {
    e.stopPropagation();
    setFigureDetails(figure);
    setIsDialogOpen(true);
  };

  const handleProceedToShipment = () => {
    GetFigureDetails(appState.selectedFigure).then((res) => {
      dispatchAppState({ type: "SETFIGUREDETAILS", payload: { details: res } });
      navigate("/shipment", { replace: true });
    });
  };

  return (
    <div className="pick-container">
      <h1>CHOOSE YOUR MINIFIG</h1>
      <div className="pick-figures">
        {appState.figures.map((figure: IFigure) => (
          <div
            key={figure.set_num}
            className={`pick-figure-card ${
              figure === appState.selectedFigure
                ? "pick-figure-card-selected"
                : "pick-figure-card-default"
            }`}
            onClick={() => handleSelectedFigure(figure)}
          >
            <img src={figure.set_img_url} alt={figure.set_num} />
            {figure.name}
            <button
              className="pick-figure-card--showDetails"
              onClick={(e: React.MouseEvent) => handleOpenDialog(e, figure)}
            >
              SHOW DETAILS
            </button>
          </div>
        ))}
      </div>
      <div>
        <Button
          variant="contained"
          disabled={!appState.selectedFigure.set_num}
          onClick={handleProceedToShipment}
          style={{ opacity: appState.selectedFigure.set_num ? "1" : "0" }}
        >
          PROCEED TO SHIPMENT
        </Button>
      </div>
      {figureDetails && (
        <Details
          figure={figureDetails}
          isDialogOpen={isDialogOpen}
          handleClose={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default Pick;
