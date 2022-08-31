import Big from "big.js";
import {MSOLZSTS} from "./msolzsts";
import {KZTAB, STKL} from "../constants";
import {ICONFIGURATION} from "../config";

export interface STSMIN_INPUT {
  R:number,
  STKL: STKL,
  KZTAB: KZTAB,
  F: Big,
  STS: Big,
  MBV: Big,
  BK: Big,
  ZKF: Big,
  ZVE: Big,
  LSTLZZ: Big,
  SOLZLZZ: Big,
  KFB: Big,
}

export const STSMIN = ({R, F, STKL, STS, MBV, BK, LSTLZZ, SOLZLZZ, ZKF, ZVE, KZTAB, KFB }:STSMIN_INPUT, CONFIG: ICONFIGURATION) => {
  let BKS:Big;
  let SOLZS:Big;
  let sts = STS;
  let solzlzz = SOLZLZZ;
  let lstlzz = LSTLZZ;
  let bk = BK;

  // STS < 0 ?
  if (STS.lt(0)) {
    // | Ja
    // MBV = 0 ?
    if (!MBV.eq(0)) {
      // | Nein
      lstlzz = LSTLZZ.add(STS);

      if (lstlzz.lt(0)) {
        lstlzz = new Big(0);
      }
      solzlzz = SOLZLZZ.add(STS.mul("5,5").div(100)).round(2, Big.roundDown);
      if (solzlzz.lt(0)) {
        solzlzz = new Big(0);
      }
      bk = BK.add(STS);
      if (bk.lt(0)) {
        bk = new Big(0);
      }
    }

    // STS = 0
    // SOLZS = 0
    sts = new Big(0);
    SOLZS = new Big(0);

  } else {
    // | Nein
    // | MSOLZSTS ()
    const { SOLZS:solzs } = MSOLZSTS({
      F,
      STS,
      ZKF,
      STKL,
      ZVE,
      KFB,
      KZTAB,
    }, CONFIG);
    SOLZS = solzs;
  }

  // R > 0
  if (R > 0) {
    // | Ja
    // | BKS = STS
    BKS = sts;
  } else {
    // | Nein
    // | BSK = 0
    BKS = new Big(0);
  }

  return {
    BK:bk,
    BKS,
    STS:sts,
    SOLZS,
    LSTLZZ:lstlzz,
    SOLZLZZ:solzlzz,
  }
}
