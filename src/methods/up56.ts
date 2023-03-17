import Big from "big.js";
import { KZTAB } from "../constants";
import { UPTAB } from "./uptab";
import { ICONFIGURATION } from "../config";

export interface UP56_INPUT {
  X: Big;
  ZX: Big;
  KZTAB: KZTAB;
}

export const UP56 = ({ ZX, ...rest }: UP56_INPUT, CONFIG: ICONFIGURATION) => {
  // X = ZX * 1,25 || UPTAB22 || ST1 = ST
  const ST1 = UPTAB({ ...rest, X: ZX.mul(1.25).round(2, Big.roundDown) }, CONFIG);
  // X = ZX * 0,75 || UPTAB22 || ST2 = ST
  const ST2 = UPTAB({ ...rest, X: ZX.mul(0.75).round(2, Big.roundDown) }, CONFIG);

  const DIFF = ST1.minus(ST2).mul(2);

  const MIST = ZX.mul(0.14).round(0, Big.roundDown);

  return MIST.gt(DIFF) ? MIST : DIFF;
};
