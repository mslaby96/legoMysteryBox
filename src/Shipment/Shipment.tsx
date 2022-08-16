import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from "../AppContext/AppContext";
import "./Shipment.css";
import ShipmentDetails from "./ShipmentDetails/ShipmentDetails";
import Summary from "./Summary/Summary";

const Shipment = () => {
  const { appState, dispatchAppState } = useAppStateContext();

  let navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(appState.selectedFigure).length === 0) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="shipment-container">
      <ShipmentDetails />
      <Summary />
    </div>
  );
};

export default Shipment;
