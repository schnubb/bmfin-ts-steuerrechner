import Big from "big.js";
import { KZTAB, STKL } from "../constants";
import { UPTAB } from "./uptab";
import { MST56 } from "./mst56";
import { ICONFIGURATION } from "../config";

export interface UPMLST_INPUT {
  STKL: STKL;
  ZVE: Big;
  KZTAB: KZTAB;
}

export const UPMLST = ({ STKL, ZVE, KZTAB }: UPMLST_INPUT, CONFIG: ICONFIGURATION) => {
  let X: Big; // Zu versteuerndes Einkommen gem. § 32a Absatz 1 und 5 EStG in Euro, Cent (2 Dezimalstellen)

  if (ZVE.lt(1)) {
    X = new Big(0);
  } else {
    X = ZVE.div(KZTAB).round(0, Big.roundDown);
  }

  //                  STKL < 5          // UPTAB22                                  // MST5-6
  return STKL !== 5 && STKL !== 6 ? UPTAB({ X, KZTAB }, CONFIG) : MST56({ X, KZTAB }, CONFIG);
};
