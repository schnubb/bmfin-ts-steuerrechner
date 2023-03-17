import Big from "big.js";
import { MRE4 } from "./mre4";
import { MRE4ABZ } from "./mre4abz";
import { MZTABFB } from "./mztabfb";
import { MLSTJAHR } from "./mlstjahr";
import { ICONFIGURATION } from "../config";
import { IINPUT } from "../input";

export const MOSONST = ({ ...INPUTDATA }: IINPUT, CONFIG: ICONFIGURATION) => {
  const { JRE4, JRE4ENT, JVBEZ, JFREIB, JHINZU } = INPUTDATA;

  // ZRE4J = JRE4 / 100
  const zre4j = JRE4.div(100);
  // ZVBEZJ = JVBEZ / 100
  const zvbezj = JVBEZ.div(100);
  // JLFREIB = JFREIB / 100
  const jlfreib = JFREIB.div(100);
  // JLHINZU = JHINZU / 100
  const jlhinzu = JHINZU.div(100);
  // MRE4
  const { FVB, FVBZ, FVBZSO, ALTE } = MRE4(
    {
      ...INPUTDATA,
      ZRE4J: zre4j,
      ZVBEZJ: zvbezj,
    },
    CONFIG,
  );
  // MRE4ABZ
  const { ZRE4, ZRE4VP, ZVBEZ } = MRE4ABZ(
    {
      ...INPUTDATA,
      ZRE4J: zre4j,
      ZVBEZJ: zvbezj,
      JLFREIB: jlfreib,
      JLHINZU: jlhinzu,
      FVB,
      ALTE,
    },
    CONFIG,
  );
  // ZRE4VP = ZRE4VP - JRE4ENT / 100
  const zre4vp = ZRE4VP.minus(JRE4ENT.div(100));
  // MZTABFB
  const {
    ANP,
    FVBZ: fvbzNew,
    KZTAB,
    ZTABFB,
    KFB,
  } = MZTABFB(
    {
      ...INPUTDATA,
      ZRE4,
      ZVBEZ,
      FVBZ,
      FVBZSO,
    },
    CONFIG,
  );
  // VFRBS1 = (ANP + FVB + FVBZ) * 100
  const VFRBS1 = ANP.add(FVB).add(fvbzNew).mul(100);
  // MLSTJAHR
  const { ST, ZVE, VSP2, VSP3 } = MLSTJAHR(
    {
      ...INPUTDATA,
      ZRE4VP: zre4vp,
      ZTABFB,
      ZRE4,
      KZTAB,
    },
    CONFIG,
  );
  const { GFB } = CONFIG;
  // WVFRBO = (ZVE - GFB ) * 100
  let WVFRBO = ZVE.minus(GFB).mul(100);
  // WVFRBO < 0 ?
  if (WVFRBO.lt(0)) {
    // | Ja
    // WVFRBO = 0
    WVFRBO = new Big(0);
  }
  // LSTOSO = ST * 100
  const LSTOSO = ST.mul(100);

  return { VFRBS1, WVFRBO, LSTOSO, VSP2, VSP3, KZTAB, ZTABFB, KFB, ZRE4, ZRE4VP: zre4vp };
};
