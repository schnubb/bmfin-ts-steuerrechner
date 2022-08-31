import { MPARA } from "./methods/mpara";
import { MRE4JL } from "./methods/mre4jl";
import { MRE4 } from "./methods/mre4";
import { MRE4ABZ } from "./methods/mre4abz";
import { MBERECH } from "./methods/mberech";
import { MSONST } from "./methods/msonst";
import { MVMT } from "./methods/mvmt";
import {ICONFIGURATION} from "./config";
import {IINPUT, INPUTS, LST_INPUT} from "./input";

export const LST2022 = ( INPUT: LST_INPUT) => {

  const INPUTDATA:IINPUT = new INPUTS(INPUT);

  const CONFIGURATION:ICONFIGURATION = MPARA(INPUTDATA);

  const { ZRE4J, JLHINZU, JLFREIB, ZVBEZJ, F:f } = MRE4JL(INPUTDATA);

  INPUTDATA.F = f;

  const { ALTE, FVB, FVBZ, FVBZSO } = MRE4( {
    ...INPUTDATA,
    ZVBEZJ,
    ZRE4J,
  }, CONFIGURATION);

  const { ZRE4, ZRE4VP, ZVBEZ } = MRE4ABZ({
    ...INPUTDATA,
    ZRE4J,
    ZVBEZJ,
    FVB,
    ALTE,
    JLFREIB,
    JLHINZU,
  }, CONFIGURATION);

  const { BK:mberechBK, VFRB, VKVLZZ, SOLZLZZ, LSTLZZ, JBMG, KZTAB, ZTABFB, WVFRB } = MBERECH({
    ...INPUTDATA,
    ZRE4,
    ZRE4J,
    ZRE4VP,
    ZVBEZ,
    ZVBEZJ,
    FVB,
    FVBZ,
    FVBZSO,
    ALTE,
    JLFREIB,
    JLHINZU,
  }, CONFIGURATION);

  const { VKVSONST, VFRBS1, VFRBS2, SOLZS, STS, BKS, BK, LSTSO, WVFRBM, WVFRBO } = MSONST({
    ...INPUTDATA,
    BK:mberechBK,
    JLFREIB,
    JLHINZU,
    LSTLZZ,
    SOLZLZZ,
  }, CONFIGURATION);

  const { BKV, SOLZV, STV } = MVMT({
    ...INPUTDATA,
    LSTSO,
    VFRBS1,
    KZTAB,
    ZTABFB,
    ALTE,
    JLFREIB,
    JLHINZU,
    ZRE4,
    JBMG,
  },  CONFIGURATION);

  return {
    BK: BK.toNumber(),
    BKS: BKS.toNumber(),
    BKV: BKV.toNumber(),
    LSTLZZ: LSTLZZ.toNumber(),
    SOLZLZZ: SOLZLZZ.toNumber(),
    SOLZS: SOLZS.toNumber(),
    SOLZV: SOLZV.toNumber(),
    STS: STS.toNumber(),
    STV: STV.toNumber(),
    VKVLZZ: VKVLZZ.toNumber(),
    VKVSONST: VKVSONST.toNumber(),
    VFRB: VFRB.toNumber(),
    VFRBS1: VFRBS1.toNumber(),
    VFRBS2: VFRBS2.toNumber(),
    WVFRB: WVFRB.toNumber(),
    WVFRBO: WVFRBO.toNumber(),
    WVFRBM: WVFRBM.toNumber(),
  }
};
