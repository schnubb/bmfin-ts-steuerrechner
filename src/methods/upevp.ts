import Big from "big.js";
import { KRV, PKV, STKL } from "../constants";
import { MVSP } from "./mvsp";
import {ICONFIGURATION} from "../config";

export interface UPEVP_INPUT {
  PKV: PKV,
  KRV: KRV,
  STKL: STKL,
  PKPV: Big,
  ZRE4VP: Big,
}

export const UPEVP = ({ PKV, KRV, STKL, PKPV, ZRE4VP, }: UPEVP_INPUT, CONFIG: ICONFIGURATION) => {
  let VSP1: Big;    // Zwischenwert 1 bei der Berechnung der Vorsorgepauschale in Euro, Cent (2 Dezimalstellen)
  let VSP2: Big;                  // Zwischenwert 2 bei der Berechnung der Vorsorgepauschale in Euro, Cent (2 Dezimalstellen)
  let VHB: Big;  // Höchstbetrag der Mindestvorsorgepauschale für die Kranken- und Pflegeversicherung in Euro, Cent (2 Dezimalstellen)
  let VSPN: Big;                   // Vorsorgepauschale mit Teilbeträgen für die Rentenversicherung sowie der Mindestvorsorgepauschale für die Kranken- und Pflegeversicherung in Euro, Cent (2 Dezimalstellen)

  const { BBGRV, RVSATZAN, TBSVORV } = CONFIG;

  let zre4vp = ZRE4VP;

  // KRV > 1
  if (KRV > 1) {
    VSP1 = new Big(0);
  } else {
    if(zre4vp.gt(BBGRV)) {
      zre4vp = BBGRV;
    }

    VSP1 = (TBSVORV.mul(zre4vp));
    VSP1 = (VSP1.mul(RVSATZAN));
  }

  VSP2 = (zre4vp.mul(0.12));

  if (STKL === 3) {
    VHB = new Big(3000);
  } else {
    VHB = new Big(1900);
  }

  if (VSP2.gt(VHB)) {
    VSP2 = VHB;
  }

  VSPN = VSP1.add(VSP2).round(0, Big.roundUp);

  // RUN MVSP
  const { VSP, VSP3 } = MVSP({
    VSP1,
    PKV,
    STKL,
    PKPV,
    ZRE4VP:zre4vp,
  }, CONFIG);

  let vsp = VSP;
  // VSPN > VSP ?
  if (VSPN.gt(VSP)) {
    vsp = VSPN;
  }

  return {
    VSP2,
    VSP3,
    VSP:vsp
  }
}
