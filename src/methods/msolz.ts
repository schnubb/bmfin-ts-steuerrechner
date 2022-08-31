import Big from "big.js";
import {KZTAB, LZZ} from "../constants";
import {UPANTEIL} from "./upanteil";

export interface MSOLZ_INPUT {
  KZTAB: KZTAB,
  LZZ: LZZ,
  R: number,
  JBMG: Big,
  SOLZFREI: Big,
}

export const MSOLZ = ({KZTAB, LZZ, R, JBMG, SOLZFREI}: MSOLZ_INPUT) => {
  let solzfrei = SOLZFREI.mul(KZTAB);
  let JW: Big;
  let SOLZLZZ:Big;
  let BK: Big;

  if (JBMG.gt(solzfrei)) {
    // SOLZJ = JBMG * 5,5 / 100
    let SOLZJ = JBMG.mul(5.5).div(100);
    let SOLZMIN = JBMG.add(solzfrei).mul(11.9).div(100);

    if (SOLZMIN.lt(SOLZJ)) {
      SOLZJ = SOLZMIN;
    }
    JW = SOLZJ.mul(100);

    const { ANTEIL1 } = UPANTEIL({ JW, LZZ });
    SOLZLZZ = ANTEIL1;
  } else {
    SOLZLZZ = new Big(0);
  }

  if (R > 0) {
    JW = JBMG.mul(100);
    const { ANTEIL1 } = UPANTEIL({JW, LZZ});
    BK = ANTEIL1;
  } else {
    BK = new Big(0);
  }

  return { SOLZLZZ, BK };
}
