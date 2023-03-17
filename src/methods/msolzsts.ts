import Big from "big.js";
import { KZTAB, STKL } from "../constants";
import { UPTAB } from "./uptab";
import { MST56 } from "./mst56";
import { ICONFIGURATION } from "../config";

export interface MSOLZSTS_INPUT {
  STS: Big;
  ZKF: Big;
  ZVE: Big;
  KFB: Big;
  F: Big;
  KZTAB: KZTAB;
  STKL: STKL;
}

export const MSOLZSTS = ({ F, STS, ZKF, STKL, ZVE, KFB, KZTAB }: MSOLZSTS_INPUT, CONFIG: ICONFIGURATION) => {
  let SOLZS: Big;
  let SOLZSZVE: Big; // Zu versteuerndes Einkommen für die Ermittlung der Bemessungsgrundlage des Solidaritätszuschlags zur Prüfung der Freigrenze beim Solidaritätszuschlag für sonstige Bezüge (ohne Vergütung für mehrjährige Tätigkeit) in Euro, Cent (2 Dezimalstellen)
  let X: Big;
  let ST: Big;

  const { SOLZFREI } = CONFIG;

  // ZKF > 0
  if (ZKF.gt(0)) {
    // | Ja
    // | SOLZSZVE = ZVE - KFB
    SOLZSZVE = ZVE.minus(KFB);
  } else {
    // | Nein
    // | SOLZSZVE = ZVE
    SOLZSZVE = ZVE;
  }

  // SOLZSZVE < 1
  if (SOLZSZVE.lt(1)) {
    // | Ja
    // | SOLZSZVE = 0
    // | X = 0
    SOLZSZVE = new Big(0);
    X = new Big(0);
  } else {
    // | Nein
    // | X = SOLZSZVE / KZTAB (-1, roundDown)
    X = SOLZSZVE.div(KZTAB).round(-1, Big.roundDown);
  }

  // STKL < 5
  if (STKL < 5) {
    // | Ja
    // | | UPTAB22/UPTAB23
    ST = UPTAB({ X, KZTAB }, CONFIG);
  } else {
    // | Nein
    // | | MST5_6
    ST = MST56({ X, KZTAB }, CONFIG);
  }
  // SOLZSBMG = ST * F (-1, roundDown)
  // Bemessungsgrundlage des Solidaritätszuschlags zur Prüfung der Freigrenze beim Solidaritätszuschlag für sonstige Bezüge (ohne Vergütung für mehrjährige Tätigkeit) in Euro
  const SOLZSBMG = ST.mul(F).round(-1, Big.roundDown);

  // SOLZSBMG > SOLZFREI
  if (SOLZSBMG.gt(SOLZFREI)) {
    // | Ja
    // | | SOLZS = STS * 5.5 / 100 (2, roundDown)
    SOLZS = STS.mul("5.5").div(100).round(2, Big.roundDown);
  } else {
    // | Nein
    // | | SOLZS = 0
    SOLZS = new Big(0);
  }

  return {
    SOLZS,
    SOLZSBMG,
    SOLZSZVE,
  };
};
