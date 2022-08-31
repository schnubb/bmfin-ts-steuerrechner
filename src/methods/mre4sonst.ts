import {MRE4, MRE4_INPUT} from "./mre4";
import {MRE4ABZ} from "./mre4abz";
import Big from "big.js";
import {MZTABFB} from "./mztabfb";
import {ICONFIGURATION} from "../config";

export interface MRE4SONST_INPUT extends MRE4_INPUT {
  JLFREIB: Big,
  JLHINZU: Big,
  VFRBS1: Big,
}

export const MRE4SONST = (PARAMS:MRE4SONST_INPUT, CONFIG:ICONFIGURATION) => {
  const { STKL, ZKF, ZRE4J, ZVBEZJ, JLFREIB, JLHINZU, JRE4ENT, MBV, SONSTENT, VFRBS1 } = PARAMS;
  const mbv100 = MBV.div(100);
  const jre4ent100 = JRE4ENT.div(100);
  const sonstent100 = SONSTENT.div(100);
  let VFRBS2:Big;

  // MRE4
  const { FVBSO, ALTE, FVBZSO } = MRE4(PARAMS, CONFIG);
  // FVB = FVBSO
  let fvb = FVBSO;
  // MRE4ABZ
  const { ZRE4, ZVBEZ, ZRE4VP } = MRE4ABZ({
    ...PARAMS,
    FVB:fvb,
    ZRE4J,
    ZVBEZJ,
    ALTE,
    JLFREIB,
    JLHINZU,
  }, CONFIG);
  // ZRE4VP = ZRE4VP + MBV / 100 - JRE4ENT / 100 - SONSTENT / 100
  let zre4vp = ZRE4VP.add(mbv100).minus(jre4ent100).minus(sonstent100);
  // FVBZ = FVBZSO
  let fvbz = FVBZSO;
  // MZTABFB
  const { ANP } = MZTABFB({
    ZRE4,
    ZVBEZ,
    FVBZ:fvbz,
    FVBZSO,
    ZKF,
    STKL
  });
  // VFRBS2 = (ANP + FVB +FVBZ) * 100 - VFRBS1
  VFRBS2 = ANP.add(fvb).add(fvbz).mul(100).minus(VFRBS1);

  return {
    VFRBS2,
    FVB: fvb,
    FVBZ: fvbz,
    ZRE4VP: zre4vp,
  }
};
