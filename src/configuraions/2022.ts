import {IINPUT} from "../input";
import Big from "big.js";
import {IPARAMS} from "../config";

const initial = ({ KRV, KVZ, PVS, PVZ }:IINPUT, base: IPARAMS):IPARAMS => {
  let defaults: IPARAMS;
  defaults = {
    ...base,
    GFB: new Big(10347),
    SOLZFREI: new Big(16956),
    W1STKL5: new Big(11793),
    W2STKL5: new Big(29298),
    BBGKVPV: new Big(58050),
    KVSATZAN: KVZ.div(2).div(100).add(0.07),
    KVSATZAG: new Big(0.0065).add(0.07),
  }

  if (KRV < 2) {
    defaults = {
      ...defaults,
      BBGRV: KRV === 0 ? new Big(84600) : new Big(81000),
      RVSATZAN: new Big(0.093),
      TBSVORV: new Big(0.88),
    }
  }

  if (PVS) {
    defaults = {
      ...defaults,
      PVSATZAN: new Big(0.02025),
      PVSATZAG: new Big(0.01025),
    }
  } else {
    defaults = {
      ...defaults,
      PVSATZAN: new Big(0.01525),
      PVSATZAG: new Big(0.01525),
    }
  }

  if (PVZ) {
    defaults = {
      ...defaults,
      PVSATZAN: defaults.PVSATZAN.add(0.0035),
    }
  }

  return {...defaults};
}

export const config = (CONFIG: IINPUT, base: IPARAMS, patch?: string):IPARAMS => {
  return {...initial(CONFIG, base)};
}

export default config;
