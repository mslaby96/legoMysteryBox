import { createContext, useContext, useMemo, useReducer } from "react";
import {
  IAppState,
  IContextProps,
  IFigure,
  IFigureDetails,
} from "../shared/models";
import { AppStateReducer } from "../shared/reducers";

const AppStateContext = createContext({} as IContextProps);

const initialState: IAppState = {
  figures: [] as IFigure[],
  selectedFigure: {} as IFigure,
  selectedFigureDetails: [] as IFigureDetails[],
};

export function AppStateContextWrapper({
  children,
}: {
  children: JSX.Element;
}) {
  const [appState, dispatchAppState] = useReducer(
    AppStateReducer,
    initialState
  );

  const contextValue = useMemo(() => {
    return { appState, dispatchAppState };
  }, [appState, dispatchAppState]);

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppStateContext() {
  return useContext(AppStateContext);
}
