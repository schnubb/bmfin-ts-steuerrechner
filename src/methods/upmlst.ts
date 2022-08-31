import Big from "big.js";
import { KZTAB, STKL } from "../constants";
import { UPTAB22 } from "./uptab22";
import {MST56} from "./mst56";
import {ICONFIGURATION} from "../config";

export interface UPMLST_INPUT {
  STKL: STKL,
  ZVE: Big,
  KZTAB: KZTAB,
}

export const UPMLST = ( { STKL, ZVE, KZTAB }:UPMLST_INPUT, CONFIG:ICONFIGURATION ) => {
  let X:Big;            // Zu versteuerndes Einkommen gem. § 32a Absatz 1 und 5 EStG in Euro, Cent (2 Dezimalstellen)
  let zve = ZVE;
  let st:Big;

  if (ZVE.lt(1)) {
    zve = new Big(0);
    X = new Big(0);
  } else {
    X = (ZVE.div(KZTAB)).round(0, Big.roundDown);
  }

  // STKL < 5
  if (STKL !== 5 && STKL !== 6) {
    // UPTAB22
    st = UPTAB22({ X, KZTAB }, CONFIG);
  } else {
    // MST5-6
    st = MST56({X, KZTAB}, CONFIG);
  }

  return st;
}
