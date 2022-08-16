import { Dialog } from "@mui/material";
import { IFigure } from "../shared/models";

import "./Details.css";

const Details = ({
  figure,
  isDialogOpen,
  handleClose,
}: {
  figure: IFigure;
  isDialogOpen: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog onClose={handleClose} open={isDialogOpen}>
      <div className="dialog-container">
        <img src={figure.set_img_url} alt={figure.set_num} />
        <span>Set number: {figure.set_num}</span>
        <span>Number of Parts: {figure.num_parts}</span>
      </div>
    </Dialog>
  );
};

export default Details;
