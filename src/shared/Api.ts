import axios from "axios";
import { IFigure, IFigurePart } from "./models";

const API_KEY = "50766aa5ab048d1f7acb0cd1173f159e";

export const GetFigures = async (): Promise<IFigure[]> => {
  let morePagesAvailable = true;
  let page = 0;
  const allFigures: IFigure[] = [];
  while (morePagesAvailable) {
    page++;
    const response = axios
      .get(
        `https://rebrickable.com/api/v3/lego/minifigs/?page=${page}&in_theme_id=246&key=${API_KEY}`
      )
      .then((res) => res.data);
    const data = await response;
    data.results.forEach((el: IFigure) => allFigures.push(el));
    morePagesAvailable = data.next ? true : false;
  }
  return allFigures;
};

export const GetFigureDetails = (figure: IFigure): Promise<IFigurePart[]> => {
  return axios
    .get(
      `https://rebrickable.com/api/v3/lego/minifigs/${figure.set_num}/parts/?key=${API_KEY}`
    )
    .then((res) => res.data.results);
};

export const SendFigure = (
  figure: IFigure,
  personalData: any
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!figure || !personalData) {
      setTimeout(() => reject(new Error("Wrong data")), 250);
    }
    setTimeout(() => resolve(true), 250);
  });
};
