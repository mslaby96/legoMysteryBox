import Welcome from "./Welcome/Welcome";

import "./App.css";
import { AppStateContextWrapper } from "./AppContext/AppContext";
import { Route, Routes } from "react-router-dom";
import Pick from "./Pick/Pick";
import Shipment from "./Shipment/Shipment";

const App = () => {
  return (
    <AppStateContextWrapper>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="pick" element={<Pick />} />
        <Route path="shipment" element={<Shipment />} />
      </Routes>
    </AppStateContextWrapper>
  );
};

export default App;
