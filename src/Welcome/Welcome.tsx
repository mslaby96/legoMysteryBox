import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAppStateContext } from "../AppContext/AppContext";
import { GetFigures } from "../shared/Api";

import "./Welcome.css";

const Welcome = () => {
  const { appState, dispatchAppState } = useAppStateContext();

  let navigate = useNavigate();

  const handleFetchFigures = () => {
    GetFigures()
      .then((res) => {
        dispatchAppState({ type: "SETFIGURES", payload: { res: res } });
        navigate("../Pick");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="welcome-container">
      <h1>LEGO MINIFIG MYSTERY BOX</h1>
      <Button variant="contained" onClick={() => handleFetchFigures()}>
        LET'S GO!
      </Button>
      <ToastContainer />
    </div>
  );
};

export default Welcome;
