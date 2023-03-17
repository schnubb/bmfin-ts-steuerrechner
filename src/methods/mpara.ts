import { PARAMS } from "../config";
import { IINPUT } from "../input";

export const MPARA = (YEAR: number, P: IINPUT) => {
  const CONFIGURATION = new PARAMS(YEAR, P);

  return { ...CONFIGURATION };
};
