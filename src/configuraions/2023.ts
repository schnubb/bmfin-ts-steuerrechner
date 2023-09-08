import {IINPUT} from "../input";
import Big from "big.js";
import {ICONFIGURATION} from "../config";

const initial = ({ KRV, KVZ, PVS, PVZ }: IINPUT, base: ICONFIGURATION):ICONFIGURATION => {
  let defaults: ICONFIGURATION;
  defaults = {
    ...base,
    GFB: new Big(10908),
    SOLZFREI: new Big(17543),
    W1STKL5: new Big(12485),
    W2STKL5: new Big(31404),
    BBGKVPV: new Big(59850),
    KVSATZAN: KVZ.div(2).div(100).add(0.07),
    KVSATZAG: new Big(0.008).add(0.07),
  }

  if (KRV < 2) {
    defaults = {
      ...defaults,
      BBGRV: KRV === 0 ? new Big(87600) : new Big(85200),
      RVSATZAN: new Big(0.093),
      TBSVORV: new Big(1.0),
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
const july = ({ KRV, KVZ, PVS, PVZ, LZZ }: IINPUT, base: ICONFIGURATION):ICONFIGURATION => {
  let defaults: ICONFIGURATION;
  defaults = {
    ...base,
    GFB: new Big(10908),
    SOLZFREI: new Big(17543),
    W1STKL5: new Big(12485),
    W2STKL5: new Big(31404),
    BBGKVPV: new Big(59850),
    KVSATZAN: KVZ.div(2).div(100).add(0.07),
    KVSATZAG: new Big(0.008).add(0.07),
  }

  if (KRV < 2) {
    defaults = {
      ...defaults,
      BBGRV: KRV === 0 ? new Big(87600) : new Big(85200),
      RVSATZAN: new Big(0.093),
      TBSVORV: new Big(1.0),
    }
  }

  if (LZZ === 1) {
    if (PVS) {
      defaults = {
        ...defaults,
        PVSATZAN: new Big(0.021125),
        PVSATZAG: new Big(0.011125),
      }
    } else {
      defaults = {
        ...defaults,
        PVSATZAN: new Big(0.016125),
        PVSATZAG: new Big(0.016125),
      }
    }

    if (PVZ) {
      defaults = {
        ...defaults,
        PVSATZAN: defaults.PVSATZAN.add(new Big(0.00475)),
      }
    }
  } else {
    if (PVS) {
      defaults = {
        ...defaults,
        PVSATZAN: new Big(0.022),
        PVSATZAG: new Big(0.012),
      }
    } else {
      defaults = {
        ...defaults,
        PVSATZAN: new Big(0.017),
        PVSATZAG: new Big(0.017),
      }
    }

    if (PVZ) {
      defaults = {
        ...defaults,
        PVSATZAN: defaults.PVSATZAN.add(new Big(0.006)),
      }
    }
  }

  return {...defaults};
}

export const config = (CONFIG: IINPUT, base: ICONFIGURATION):ICONFIGURATION => {
  const { PATCH } = base;
  if (PATCH && PATCH === "1") return {...initial(CONFIG, base)};
  return {...july(CONFIG, base)}
};
export default config;
