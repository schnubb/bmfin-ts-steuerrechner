import Big from "big.js";
import {MOSONST} from "./mosonst";
import {KENNVMT, KZTAB} from "../constants";
import {MRE4SONST} from "./mre4sonst";
import {MLSTJAHR} from "./mlstjahr";
import {MRE4ABZ} from "./mre4abz";
import {ICONFIGURATION} from "../config";
import {IINPUT} from "../input";

export interface MVMT_INPUT extends IINPUT {
  KZTAB: KZTAB,
  ALTE: Big,
  LSTSO: Big,
  VFRBS1: Big,
  JLFREIB: Big,
  JLHINZU: Big,
  ZRE4: Big,
  ZTABFB: Big,
  JBMG: Big,
}

export const MVMT = ({...MOSONSTCONFIG }:MVMT_INPUT, CONFIG:ICONFIGURATION) => {
  const { R, F, VFRBS1, JRE4, JRE4ENT, JVBEZ, ZRE4, ZTABFB, VKAPA, VMT, VBS, LSTSO, STERBE, SONSTB, SONSTENT, JBMG, KZTAB } = MOSONSTCONFIG;
  let SOLZVBMG: Big; // Bemessungsgrundlage des Solidaritätszuschlags für die Prüfung der Freigrenze beim Solidaritätszuschlag für die Vergütung für mehrjährige Tätigkeit in Euro
  let STV: Big;
  let SOLZV: Big;
  let BKV: Big;
  let vbezbso: Big;
  let zre4j: Big;
  let zre4vp: Big;
  let zvbezj: Big;
  let kennvmt: KENNVMT;
  let vfrbs1 = VFRBS1;
  let kztab = KZTAB;
  let zre4 = ZRE4;
  let ztabfb = ZTABFB;
  let LST1 = new Big(0);     // Zwischenfelder der Jahreslohnsteuer in Cent
  let LST2 = new Big(0);     // Zwischenfelder der Jahreslohnsteuer in Cent
  let LST3 = new Big(0);     // Zwischenfelder der Jahreslohnsteuer in Cent
  let vkapa = VKAPA;

  const { SOLZFREI } = CONFIG;

  // VKAPA < 0 ?
  if (VKAPA.lt(0)) {
  // | Ja
  // | VKAPA = 0
    vkapa = new Big(0);
  }

  // VMT + VKAPA > 0 ?
  if (VMT.add(vkapa).gt(0)) {
    // | Ja
    // | | LSTSO = 0 ?
    if (LSTSO.eq(0)) {
      // | | | Ja
      // | | | | MOSONST
      const { LSTOSO, VFRBS1, ZTABFB, KZTAB, ZRE4 } = MOSONST({
        ...MOSONSTCONFIG,
        VKAPA:vkapa,
      }, CONFIG);
      vfrbs1 = VFRBS1;
      kztab = KZTAB;
      zre4 = ZRE4;
      ztabfb = ZTABFB;
      // | | | | LST1 = LSTOSO
      LST1 = LSTOSO;
    } else {
      // | | | Nein
      // | | | | LST1 = LSTSO
      LST1 = LSTSO;
    }
    // | | VBEZBSO = STERBE + VKAPA
    vbezbso = STERBE.add(VKAPA);
    // | | ZRE4J = (JRE4 + SONSTB + VMT + VKAPA) / 100
    zre4j = JRE4.add(SONSTB).add(VMT).add(VKAPA).div(100);
    // | | ZVBEZJ = (JVBEZ + VBS + VKAPA) / 100
    zvbezj = JVBEZ.add(VBS).add(VKAPA).div(100);
    // | | KENNVMT = 2
    kennvmt = KENNVMT.VORPAU;
    // | | MRE4SONST
    const { ZRE4VP:zrevp1, FVB } = MRE4SONST({
      ...MOSONSTCONFIG,
      VFRBS1:vfrbs1,
      ZRE4J: zre4j,
      ZVBEZJ: zvbezj,
      VKAPA:vkapa,
    }, {...CONFIG, VBEZBSO:vbezbso, KENNVMT: kennvmt });
    // | | MLSTJAHR
    const { ST:st1 } = MLSTJAHR({
      ...MOSONSTCONFIG,
      KZTAB: kztab,
      VKAPA:vkapa,
      ZRE4VP:zrevp1,
      ZRE4: zre4,
      ZTABFB: ztabfb
    }, CONFIG);
    // | | LST3 = ST * 100
    LST3 = st1.mul(100);
    // | | MRE4ABZ
    const { ZRE4VP:zre4vp2 } = MRE4ABZ({
      ...MOSONSTCONFIG,
      ZRE4J: zre4j,
      ZVBEZJ: zvbezj,
      FVB,
    }, {...CONFIG, VBEZBSO:vbezbso, KENNVMT: kennvmt });
    // | | ZRE4VP = ZRE4VP - JRE4ENT / 100 - SONSTENT / 100
    zre4vp = zre4vp2.minus(JRE4ENT.div(100)).minus(SONSTENT.div(100));
    // | | KENNVMT = 1
    kennvmt = KENNVMT.MJTAT;
    // | | MLSTJAHR
    const { ST:st2 } = MLSTJAHR({
      ...MOSONSTCONFIG,
      KZTAB:kztab,
      ZRE4VP: zre4vp,
      ZRE4: zre4,
      ZTABFB:ztabfb,
      VKAPA,
      VMT,
    }, {...CONFIG, VBEZBSO:vbezbso, KENNVMT: kennvmt });
    // | | LST2 = ST * 100
    LST2 = st2.mul(100);
    // | | STV = LST2 - LST1
    STV = LST2.minus(LST1);
    // | | LST3 = LST3 - LST1
    LST3 = LST3.minus(LST1);
    // | | LST3 < STV ?
    if (LST3.lt(STV)) {
    // | | | Ja
    // | | | STV = LST3
      STV = LST3;
    }
    // | | STV < 0 ?
    if (STV.lt(0)) {
    // | | | Ja
    // | | | | STV = 0
      STV = new Big(0)
    } else {
    // | | | Nein
    // | | | | STV = STV * F (-1, roundDown)
      STV = STV.mul(F).round(-1, Big.roundDown);
    }
    // | | SOLZVBMG = STV / 100 + JBMG
    SOLZVBMG = STV.div(100).add(JBMG);
    // | | SOLZVBMG > SOLZFREI ?
    if (SOLZVBMG.gt(SOLZFREI)) {
    // | | | Ja
    // | | | | SOLZV = STV * 5,5 / 100 (2, roundDown)
      SOLZV = STV.mul("5,5").div(100).round(2, Big.roundDown);
    } else {
    // | | | Nein
    // | | | | SOLZV = 0
      SOLZV = new Big(0);
    }
    // | | R > 0
    if ( R > 0) {
      // | | | Ja
      // | | | | BKV = STV
      BKV = STV;
    } else {
      // | | | Nein
      // | | | | BKV = 0
      BKV = new Big(0);
    }
  } else {
    // | Nein
    // | | STV = 0
    STV = new Big(0);
    // | | SOLZV = 0
    SOLZV = new Big(0);
    // | | BKV = 0
    BKV = new Big(0);
  }

  return {
    STV,
    BKV,
    SOLZV
  }
}
