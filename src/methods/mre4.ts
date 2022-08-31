import Big from "big.js";
import {TAB1, TAB2, TAB3} from "../constants";
import {MRE4ALTE} from "./mre4alte";
import {ICONFIGURATION} from "../config";
import {IINPUT} from "../input";

export interface MRE4_INPUT extends IINPUT {
  ZRE4J: Big,
  ZVBEZJ:Big,
}

export const MRE4 = (PARAMS:MRE4_INPUT, CONFIG:ICONFIGURATION) => {

  const { LZZ, VJAHR, ZRE4J, ZVBEZJ, ZMVB, VBEZS, VBEZM } = PARAMS;

  let FVB = new Big(0);      // Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)
  let FVBZ = new Big(0);     // Zuschlag zum Versorgungsfreibetrag in Euro
  let FVBSO = new Big(0);    // Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen) für die Berechnung der Lohnsteuer für den sonstigen Bezug
  let FVBZSO = new Big(0);   // Zuschlag zum Versorgungsfreibetrag in Euro für die Berechnung der Lohnsteuer beim sonstigen Bezug
  let VBEZB = new Big(0);    // Bemessungsgrundlage für den Versorgungsfreibetrag in Cent
  let HFVB = new Big(0);     // Maßgeblicher maximaler Versorgungsfreibetrag in Euro
  let HFVBZ = new Big(0);    // Maßgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)
  let HFVBZSO = new Big(0);  // Maßgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen) für die Berechnung der Lohnsteuer für den sonstigen Bezug
  let J = "";                      // Nummer der Tabellenwerte für Versorgungsparameter
  let vbezm = VBEZM || new Big(0);
  let zmvb = ZMVB || new Big(0);
  let vbezs = VBEZS || new Big(0);

  const { VBEZBSO } = CONFIG;

  // ZVBEZJ = 0 ?
  if (ZVBEZJ.gt(0)) {
    // ZVBEZJ = 0 | Nein
    if (VJAHR && VJAHR.year < 2006) {
      // VJAHR < 2006
      J = "1";
    } else if (VJAHR && VJAHR.year < 2040) {
      J = VJAHR.minus({year: 2004}).year.toString();
    } else {
      J = "36";
    }

    if (LZZ === 1) {
      // VBEZB = VBEZM * ZMVB + VBEZS
      VBEZB = vbezm.mul(zmvb).add(vbezs);
      // HFVB = TAB2[J] / 12 * ZMVB
      HFVB = TAB2[J].div(12).mul(zmvb);
      // FVBZ = TAB3(J) / 12 * ZMVB
      FVBZ = TAB3[J].div(12).mul(zmvb).round(0, Big.roundUp);
    } else {
      // VBEZB = VBEZM * 12 + VBEZS
      VBEZB = vbezm.mul(12).add(vbezs);
      HFVB = TAB2[J];
      FVBZ = TAB3[J];
    }
    // FVB = VBEZB * TAB1(J) / 100
    FVB = VBEZB.mul(TAB1[J]).div(100).round(2, Big.roundUp);

    // FVB > HFVB
    if (FVB.gt(HFVB)) {
      FVB = HFVB;
    }

    // FVB > ZVBEZJ
    if (FVB.gt(ZVBEZJ)) {
      FVB = ZVBEZJ;
    }

    // FVBSO = FVB + VBEZBSO * TAB1(J) / 100
    FVBSO = FVB.add(VBEZBSO.mul(TAB1[J].div(100))).round(2, Big.roundUp);

    //FVBSO > TAB2(J)
    if (FVBSO.gt(TAB2[J])) {
      FVBSO = TAB2[J];
    }
    // HFVBZSO = (VBEZB + VBEZBSO) / 100 - FVBSO
    HFVBZSO = VBEZB.add(VBEZBSO).div(100).minus(FVBSO);
    // FVBZSO = FVBZ + VBEZBSO / 100
    FVBZSO = FVBZ.add(VBEZBSO.div(100)).round(0, Big.roundUp);

    //FVBZSO > HFVBZSO
    if(FVBZSO.gt(HFVBZSO)) {
      FVBZSO = HFVBZSO.round(0, Big.roundUp);
    }

    // FVBZSO > TAB3(J)
    if(FVBZSO.gt(TAB3[J])) {
      FVBZSO = TAB3[J];
    }

    //HFVBZ = VBEZB/100 - FVB
    HFVBZ = VBEZB.div(100).minus(FVB);

    // FVBZ > HFVBZ
    if(FVBZ.gt(HFVBZ)) {
      FVBZ = HFVBZ.round(0, Big.roundUp);
    }
  }

  const { ALTE } = MRE4ALTE({
    ...PARAMS,
    ZRE4J,
    ZVBEZJ
  }, {...PARAMS});

  return {
    ALTE,
    FVB,
    FVBSO,
    FVBZ,
    FVBZSO,
  }

}
