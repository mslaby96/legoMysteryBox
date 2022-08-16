import { Action, IAppState, IFigure } from "./models";

export const AppStateReducer = (state: IAppState, action: Action) => {
  switch (action.type) {
    case "SETFIGURES":
      const pickedNumbers = [];
      while (pickedNumbers.length < 3) {
        const r = Math.floor(Math.random() * action.payload.res.length) + 1;
        if (pickedNumbers.indexOf(r) === -1) pickedNumbers.push(r);
      }
      const picks: IFigure[] = [];
      pickedNumbers.forEach((p) => {
        picks.push(action.payload.res[p]);
      });
      return { ...state, figures: picks };
    case "SETSELECTEDFIGURE":
      return { ...state, selectedFigure: action.payload.selectedFigure };
    case "SETFIGUREDETAILS":
      return { ...state, selectedFigureDetails: action.payload.details };
    default:
      return state;
  }
};
