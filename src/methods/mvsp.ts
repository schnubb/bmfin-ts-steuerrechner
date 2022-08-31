import Big from "big.js";
import { PKV, STKL } from "../constants";
import {ICONFIGURATION} from "../config";

export interface MVSP_INPUT {
  VSP1: Big,
  PKV: PKV,
  STKL:STKL,
  PKPV: Big,
  ZRE4VP: Big,
}

export const MVSP = (
  {
    VSP1,
    PKV,
    STKL,
    PKPV,
    ZRE4VP,
}: MVSP_INPUT, CONFIG:ICONFIGURATION) => {
  let zre4vp = ZRE4VP;
  let VSP3:Big;     // Vorsorgepauschale mit Teilbeträgen für die gesetzliche Kranken- und soziale Pflegeversicherung nach fiktiven Beträgen oder ggf. für die private Basiskrankenversicherung und private Pflege-Pflichtversicherung in Euro, Cent (2 Dezimalstellen)
  let VSP:Big;      // Vorsorgepauschale mit Teilbeträgen für die Rentenversicherung sowie die gesetzliche Kranken- und soziale Pflegeversicherung nach fiktiven Beträgen oder ggf. für die private Basiskrankenversicherung und private Pflege-Pflichtversicherung in Euro, Cent (2 Dezimalstellen)

  const { BBGKVPV, KVSATZAG, PVSATZAG, KVSATZAN, PVSATZAN } = CONFIG;

  if (ZRE4VP.gt(BBGKVPV)) {
    zre4vp = BBGKVPV
  }

  // PKV > 0
  if (PKV > 0) {
    if (STKL === 6) {
      VSP3 = new Big(0);
    } else {
      VSP3 = PKPV.mul(12).div(100);

      if (PKV === 2) {
        VSP3 =VSP3.minus(zre4vp.mul(KVSATZAG.add(PVSATZAG)));
      }
    }
  } else {
    VSP3 = zre4vp.mul(KVSATZAN.add(PVSATZAN));
  }

  VSP = VSP3.add(VSP1).round(0, Big.roundUp);

  return {
    VSP,
    VSP3
  }
};

