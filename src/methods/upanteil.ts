import Big from "big.js";
import { LZZ } from "../constants";

export interface UPANTEIL_INPUT {
  JW: Big,
  LZZ: LZZ,
}

export const UPANTEIL = ({ JW, LZZ }:UPANTEIL_INPUT) => {
  let ANTEIL1: Big;   // Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten auf ganze Cent abgerundet

  switch (LZZ) {
    case 1:
      ANTEIL1 = JW;
      break;
    case 2:
      ANTEIL1 = JW.div(12).round(0,Big.roundDown);
      break;
    case 3:
      ANTEIL1 = (JW.mul(7)).div(360).round(0, Big.roundDown);
      break;
    default:
      ANTEIL1 = JW.div(360).round(0, Big.roundDown);
  }

  return { ANTEIL1 };
}
