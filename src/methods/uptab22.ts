import Big from "big.js";
import { KZTAB } from "../constants";
import {ICONFIGURATION} from "../config";

export interface UPTAB22_INPUT {
  KZTAB: KZTAB,
  X: Big,
}

export const UPTAB22 = ( { X, KZTAB} : UPTAB22_INPUT, CONFIG:ICONFIGURATION) => {
  let ST:Big;
  let Y:Big;      // Gem. § 32a Absatz 1 EStG (6 Dezimalstellen)
  let RW:Big;     // Rechenwert in Gleitkommadarstellung

  const { GFB } = CONFIG;

  // X < GFB + 1
  if (X.lt(GFB.add(1))) {
    ST = new Big(0);
  } else {
    // | Nein
    // | X < 14927 ?
    if (X.lt(new Big(14927))) {
      // Y = (X - GFB) / 10000
      Y = (X.minus(GFB).div(10000)).round(6, Big.roundDown);
      // RW = Y*1008,70
      RW = Y.mul(new Big(1088.67));
      // RW = RW + 1400
      RW = RW.add(1400);
      // ST = RW * Y
      ST = RW.mul(Y).round(0, Big.roundDown);
    } else
    // | X < 58597 ?
    if (X.lt(new Big(58597))) {
      // Y = (X - 14926) / 10000
      Y = X.minus(14926).div(10000).round(6, Big.roundDown);
      // RW = Y * 206,43
      RW = Y.mul(206.43)
      // RW = RW + 2397
      RW = RW.add(2397)
      // RW = RW * Y
      RW = RW.mul(Y);
      // ST = RW + 938,24
      // ST = RW.add(938.24).round(-1, Big.roundDown); // WTF? Das ist der Wert aus der PDF?!
      ST = RW.add(869.32).round(0, Big.roundDown); // WTF? Das ist der Wert aus der XML?!
    } else
    // | X < 277826 ?
    if (X.lt(new Big(277826))) {
      // ST = X * 0,42 - 9267,53
      ST = X.mul(0.42).minus(9336.45).round(0, Big.roundDown);
    } else {
      // ST = X * 0,45 - 17602,28
      ST = X.mul(0.45).minus(17671.2).round(0, Big.roundDown);
    }
  }

  ST = ST.mul(KZTAB);

  return ST
}
