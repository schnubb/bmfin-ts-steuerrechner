import Big from "big.js";
import {KZTAB, STKL} from "../constants";

export interface MZTABFB_INPUT {
  ZRE4: Big,
  ZVBEZ: Big,
  FVBZ: Big,
  FVBZSO: Big,
  STKL: STKL,
  ZKF: Big
}

export const MZTABFB = ({ ZRE4, ZVBEZ, FVBZ, FVBZSO, STKL, ZKF }:MZTABFB_INPUT) => {
  let ANP = new Big(0);      // Arbeitnehmer-Pauschbetrag/Werbungskosten-Pauschbetrag in Euro
  let fvbz = FVBZ;
  let fvbzso = FVBZSO;
  let kztab: KZTAB = KZTAB.GRUND;
  let KFB = new Big(0);      // Summe der Freibeträge für Kinder in Euro
  let EFA = new Big(0);      // Entlastungsbetrag für Alleinerziehende in Euro
  let SAP:Big;      // Sonderausgaben-Pauschbetrag in Euro
  let ZTABFB:Big;   // Feste Tabellenfreibeträge (ohne Vorsorgepauschale) in Euro, Cent (2 Dezimalstellen)

  // ZVBEZ >= 0
  // | JA
  // ZVBEZ < FVBZ
  // | JA
  if (ZVBEZ.gte(0) && ZVBEZ.lt(FVBZ)) {
    fvbz = ZVBEZ;
  }

  // STKL < 6
  if (STKL < 6) {
    // | Ja
    // ZVBEZ > 0
    if (ZVBEZ.gt(0)) {
      // ZVBEZ - FVBZ < 102
      if ((ZVBEZ.minus(fvbz)).lt(102)){
        ANP = (ZVBEZ.minus(fvbz)).round(0, Big.roundUp);
      } else {
        ANP = new Big(102);
      }
    }
  } else {
    fvbz = new Big(0);
    fvbzso = new Big(0)
  }

  // STKL < 6
  if (STKL < 6) {
    // | Ja
    // ZRE4 > ZVBEZ
    if (ZRE4.gt(ZVBEZ) ) {
      if ((ZRE4.minus(ZVBEZ).lt(1200))) { // WTF?! 1000 in der PDF
        ANP = ANP.add(ZRE4).minus(ZVBEZ).round(0, Big.roundUp);
      } else {
        ANP = ANP.add(1200); /// WTF ?! 1000 in der PDF
      }
    }
  }

  switch (STKL) {
    case 1:
      SAP = new Big(36);
      KFB = (ZKF.mul(8388)).round(0, Big.roundDown);
      break;
    case 2:
      EFA = new Big(4008);
      SAP = new Big(36);
      KFB = (ZKF.mul(8388)).round(0, Big.roundDown);
      break;
    case 3:
      kztab = KZTAB.SPLIT;
      SAP = new Big(36);
      KFB = (ZKF.mul(8388)).round(0, Big.roundDown);
      break;
    case 4:
      SAP = new Big(36);
      KFB = (ZKF.mul(4194)).round(0, Big.roundDown);
      break;
    case 5:
      SAP = new Big(36);
      KFB = new Big(0);
      break;
    default:
      SAP = new Big(0);
      break;
  }

  ZTABFB = EFA.add(ANP).add(SAP).add(fvbz);

  return {
    ANP,
    KFB,
    FVBZ: fvbz,
    FVBZSO: fvbzso,
    KZTAB: kztab,
    ZTABFB
  }
}
