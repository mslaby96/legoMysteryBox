import { Button } from "@mui/material";
import { useAppStateContext } from "../../AppContext/AppContext";

const Summary = () => {
  const { appState, dispatchAppState } = useAppStateContext();
  return (
    <div className="shipment-figure-details">
      <div className="shipment-figure-details-margin">
        <h1>Summary</h1>
        <div className="shipment-figure-img-container">
          <img
            src={appState.selectedFigure.set_img_url}
            alt={appState.selectedFigure.set_num}
          />
          <p>{appState.selectedFigure.name}</p>
        </div>
        <p>
          There are {appState.selectedFigureDetails.length} parts in this
          minifig:
        </p>
        {appState.selectedFigureDetails.map((detail) => (
          <div key={detail.part.part_num} className="shipment-figure-part">
            <img
              className="shipment-figure-part-img"
              src={detail.part.part_img_url}
              alt={detail.part.part_num}
            />
            <div className="shipment-figure-part-info">
              <p>{detail.part.name}</p>
              <p className="shipment-figure-part-id">{detail.id}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="shipment-button--ship">
        <Button variant="contained" form="shipment-form" type="submit">
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default Summary;
