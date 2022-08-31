import Big from "big.js";
import { LZZ } from "../constants";
import {MOSONST} from "./mosonst";
import {UPVKV} from "./upvkv";
import {MRE4SONST} from "./mre4sonst";
import {MLSTJAHR} from "./mlstjahr";
import {STSMIN} from "./stsmin";
import {ICONFIGURATION} from "../config";
import {IINPUT} from "../input";

export interface MSONST_INPUT extends IINPUT {
  BK: Big,
  JLFREIB: Big,
  JLHINZU: Big,
  LSTLZZ: Big,
  SOLZLZZ: Big,
}

export const MSONST = ({...MOSONSTCONFIG}:MSONST_INPUT, CONFIG:ICONFIGURATION) => {

  const { BK, F, ZMVB, MBV, SONSTB, JRE4, PKV, VBS, JVBEZ, STERBE, } = MOSONSTCONFIG;

  let lzz:LZZ = 1;
  let VKVSONST:Big;
  let LSTSO:Big;
  let STS:Big;
  let SOLZS:Big;
  let BKS:Big;
  let WVFRBO = new Big(0);
  let WVFRBM = new Big(0);
  let VFRBS1 = new Big(0);
  let VFRBS2 = new Big(0);
  let bkNeu = BK;

  const { GFB } = CONFIG;

  // ZMVB = 0 ?
  // |
  // ZMVB = 12
  let zmvb = ZMVB === 0 ? 12 : ZMVB;

  if (SONSTB.eq(0) && MBV.eq(0)) {
    VKVSONST = new Big(0);
    LSTSO = new Big(0);
    STS = new Big(0);
    SOLZS = new Big(0);
    BKS = new Big(0);
  } else {
    // MOSONST
    const { VFRBS1: vfrbs1, WVFRBO:wvfrbo, LSTOSO, VSP2:vsp2mosonst, VSP3:vsp3mosonst, KZTAB, ZTABFB, ZRE4, KFB } = MOSONST(
      {
        ...MOSONSTCONFIG,
        LZZ:lzz,
        ZMVB:zmvb,
      }, CONFIG);
    VFRBS1 = vfrbs1;
    WVFRBO = wvfrbo;
    // UPVKV
    const { VKV:vkv1 } = UPVKV({PKV,VSP2:vsp2mosonst, VSP3:vsp3mosonst});
    // VKVSONST = VKV
    VKVSONST = vkv1;
    // ZRE4J = (JRE4 + SONSTB) / 100
    const zre4j = JRE4.add(SONSTB).div(100);
    // ZVBEZJ = (JVBEZ + VBS) / 100
    const zvbezj = JVBEZ.add(VBS).div(100);
    // VBEZBSO = STERBE
    // |
    // MRE4SONST

    const { VFRBS2:vfrbs2, ZRE4VP } = MRE4SONST({
      ...MOSONSTCONFIG,
      LZZ:lzz,
      VFRBS1:vfrbs1,
      ZRE4J:zre4j,
      ZVBEZJ:zvbezj,
      ZMVB:zmvb,
    }, { ...CONFIG, VBEZBSO:STERBE });
    VFRBS2 = vfrbs2;
    // MLSTJAHR
    const { ST, ZVE, VSP2:vsp2mlstjahr, VSP3:vsp3mlstjahr } = MLSTJAHR({
      ...MOSONSTCONFIG,
      ZTABFB,
      ZRE4,
      ZRE4VP,
      KZTAB,
    }, { ...CONFIG, VBEZBSO:STERBE });
    // WVFRBM = (ZVE - GFB) * 100
    let WVFRBM = ZVE.minus(GFB).mul(100);
    // WVFRBM < 0 ?
    if (WVFRBM.lt(0)) {
      // | ja
      // WVFRBM = 0
      WVFRBM = new Big(0);
    }
    // UPVKV
    const { VKV:vkv2 } = UPVKV({PKV, VSP2:vsp2mlstjahr, VSP3:vsp3mlstjahr});
    // VKVSONST = VKV - VKVSONST
    VKVSONST = vkv2.minus(VKVSONST);
    // LSTSO = ST * 100
    LSTSO = ST.mul(100);
    // STS = (LSTSO - LSTOSO) * F
    STS = LSTSO.minus(LSTOSO).mul(F);
    // STSMIN
    const { BK:bk, BKS:bks, SOLZS:solzs } = STSMIN({
      ...MOSONSTCONFIG,
      KZTAB,
      STS,
      ZVE,
      KFB,
    },  CONFIG);

    bkNeu = bk;
    BKS = bks;
    SOLZS = solzs;
  }

  return {
    VKVSONST,
    VFRBS1,
    VFRBS2,
    STS,
    BKS,
    BK:bkNeu,
    SOLZS,
    LSTSO,
    WVFRBM,
    WVFRBO,
  }
}
