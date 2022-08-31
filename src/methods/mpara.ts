import { PARAMS } from "../config";
import {IINPUT} from "../input";


export const MPARA = (P:IINPUT) => {
  const CONFIGURATION = new PARAMS(P);

  return {...CONFIGURATION};
}
