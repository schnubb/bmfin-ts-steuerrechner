import Big from "big.js";
import {KZTAB} from "../constants";
import {UP56} from "./up56";
import {ICONFIGURATION} from "../config";

export interface MST56_INPUT {
  X:Big,
  KZTAB: KZTAB
}

export const MST56 = ({X, ...rest}:MST56_INPUT, CONFIG:ICONFIGURATION) => {
  let ZX:Big;     // Zwischenfeld zu X für die Berechnung der Steuer nach § 39b Absatz 2 Satz 7 EStG in Euro
  let VERGL: Big; // Zwischenfeld zu X für die Berechnung der Steuer nach § 39b Absatz 2 Satz 7 EStG in Euro
  let st = new Big(0);
  let ZZX = X;    // Zwischenfeld zu X für die Berechnung der Steuer nach § 39b Absatz 2 Satz 7 EStG in Euro

  const { W1STKL5, W2STKL5, W3STKL5 } = CONFIG;

  if (ZZX.gt(W2STKL5)) {
    ZX = W2STKL5;
    const stup56 = UP56({X,ZX, ...rest}, CONFIG);
    if ( ZZX.gt(W3STKL5)) {
      // ST = ST + (W3STKL5 - W2STKL5) * 0,42
      st = stup56.add(W3STKL5.minus(W2STKL5).mul(0.42)).round(0, Big.roundDown);
      // ST = ST + (ZZX - W3STKL5) * 0,45
      st = st.add(ZZX.minus(W3STKL5).mul(0.45)).round(0, Big.roundDown);
    } else {
      // ST = ST + (ZZX - W2STKL5) * 0,42
      st = stup56.add(ZZX.minus(W2STKL5).mul(0.42)).round(0, Big.roundDown);
    }
  } else {
    ZX = ZZX;
    const stt1 = UP56({X, ZX, ...rest}, CONFIG);

    if (ZZX.gt(W1STKL5)) {
      VERGL = stt1;
      ZX = W1STKL5;
      const stvergl = UP56({X, ZX, ...rest}, CONFIG);
      // HOCH = ST  + ( ZZX - W1STKL5) * 0,42
      let HOCH = (stvergl.add(ZZX.minus(W1STKL5).mul(0.42))).round(0, Big.roundDown);

      st = HOCH.lt(VERGL) ? HOCH : VERGL;
    }
  }

  return st;
}
