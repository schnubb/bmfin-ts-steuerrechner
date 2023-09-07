import { PARAMS } from "../config";
import { IINPUT } from "../input";

export const MPARA = (YEAR: number|string, P: IINPUT) => {
  const CONFIGURATION = PARAMS(YEAR, P);

  return { ...CONFIGURATION };
};
