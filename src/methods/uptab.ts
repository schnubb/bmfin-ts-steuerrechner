import Big from "big.js";
import { KZTAB } from "../constants";
import { ICONFIGURATION } from "../config";

export interface UPTAB_INPUT {
  KZTAB: KZTAB;
  X: Big;
}

export const UPTAB = (INPUT_DATA: UPTAB_INPUT, CONFIG: ICONFIGURATION) => {
  const { BJAHR } = CONFIG;

  if (BJAHR === 2023) {
    return UPTAB23(INPUT_DATA, CONFIG);
  }

  return UPTAB22(INPUT_DATA, CONFIG);
};

export const UPTAB22 = ({ X, KZTAB }: UPTAB_INPUT, CONFIG: ICONFIGURATION) => {
  let ST: Big;
  let Y: Big; // Gem. § 32a Absatz 1 EStG (6 Dezimalstellen)
  let RW: Big; // Rechenwert in Gleitkommadarstellung

  const { GFB, PATCH } = CONFIG;

  // X < GFB + 1
  if (X.lt(GFB.add(1))) {
    ST = new Big(0);
  } else {
    // | Nein
    // | X < 14927 ?
    if (X.lt(new Big(14927))) {
      // Y = (X - GFB) / 10000
      Y = X.minus(GFB).div(10000).round(6, Big.roundDown);
      // RW = Y*1008,70
      RW = Y.mul(new Big(PATCH === "1" ? 1008.7 : 1088.67));
      // RW = RW + 1400
      RW = RW.add(1400);
      // ST = RW * Y
      ST = RW.mul(Y).round(0, Big.roundDown);
    }
    // | X < 58597 ?
    else if (X.lt(new Big(58597))) {
      // Y = (X - 14926) / 10000
      Y = X.minus(14926).div(10000).round(6, Big.roundDown);
      // RW = Y * 206,43
      RW = Y.mul(206.43);
      // RW = RW + 2397
      RW = RW.add(2397);
      // RW = RW * Y
      RW = RW.mul(Y);
      // ST = RW + 938,24
      ST = RW.add(PATCH === "1" ? 938.24 : 869.32).round(0, Big.roundDown); // XML Wert
    }
    // | X < 277826 ?
    else if (X.lt(new Big(277826))) {
      // ST = X * 0,42 - 9267,53
      ST = X.mul(0.42).minus(PATCH === "1" ? 9267.53 : 9336.45).round(0, Big.roundDown);
    } else {
      // ST = X * 0,45 - 17602,28
      ST = X.mul(0.45).minus(PATCH === "1" ? 17602.28 : 17671.2).round(0, Big.roundDown);
    }
  }

  ST = ST.mul(KZTAB);

  return ST;
};

export const UPTAB23 = ({ X, KZTAB }: UPTAB_INPUT, CONFIG: ICONFIGURATION) => {
  let ST: Big;
  let Y: Big; // Gem. § 32a Absatz 1 EStG (6 Dezimalstellen)
  let RW: Big; // Rechenwert in Gleitkommadarstellung

  const { GFB } = CONFIG;

  // X < GFB + 1
  if (X.lt(GFB.add(1))) {
    ST = new Big(0);
  } else {
    // | Nein
    // | X < 14927 ?
    if (X.lt(new Big(16000))) {
      // Y = (X - GFB) / 10000
      Y = X.minus(GFB).div(10000).round(6, Big.roundDown);
      // RW = Y*1008,70
      RW = Y.mul(new Big(979.18));
      // RW = RW + 1400
      RW = RW.add(1400);
      // ST = RW * Y
      ST = RW.mul(Y).round(0, Big.roundDown);
    }
    // | X < 58597 ?
    else if (X.lt(new Big(62810))) {
      // Y = (X - 14926) / 10000
      Y = X.minus(15999).div(10000).round(6, Big.roundDown);
      // RW = Y * 206,43
      RW = Y.mul(192.59);
      // RW = RW + 2397
      RW = RW.add(2397);
      // RW = RW * Y
      RW = RW.mul(Y);
      // ST = RW + 938,24
      ST = RW.add(966.53).round(0, Big.roundDown); // .XML Wert
    }
    // | X < 277826 ?
    else if (X.lt(new Big(277826))) {
      // ST = X * 0,42 - 9267,53
      ST = X.mul(0.42).minus(9972.98).round(0, Big.roundDown);
    } else {
      // ST = X * 0,45 - 17602,28
      ST = X.mul(0.45).minus(18307.73).round(0, Big.roundDown);
    }
  }

  ST = ST.mul(KZTAB);

  return ST;
};
