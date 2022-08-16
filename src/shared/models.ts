import { Dispatch } from "react";

export interface IFigure {
  last_modified_dt: string;
  name: string;
  num_parts: number;
  set_img_url: string;
  set_num: string;
  set_url: string;
}

export interface IFigurePart {
  part_num: string;
  name: string;
  part_cat_id: number;
  part_url: string;
  part_img_url: string;
}

export interface IFigureDetails {
  id: number;
  inv_part_id: number;
  part: IFigurePart;
  set_num: string;
}

export interface IContextProps {
  appState: IAppState;
  dispatchAppState: Dispatch<Action>;
}

export interface Action {
  type: string;
  payload?: any;
}

export interface IAppState {
  figures: IFigure[];
  selectedFigure: IFigure;
  selectedFigureDetails: IFigureDetails[];
}
