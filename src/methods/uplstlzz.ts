import Big from "big.js";
import { LZZ } from "../constants";
import { UPANTEIL } from "./upanteil";

export interface UPLSTLZZ_INPUT {
  LSTJAHR: Big,
  LZZ: LZZ,
}

export const UPLSTLZZ = ({ LSTJAHR, LZZ }:UPLSTLZZ_INPUT) => {
    const JW = LSTJAHR.mul(100);
    const { ANTEIL1: LSTLZZ } = UPANTEIL({ JW, LZZ });
    return { LSTLZZ }
}
