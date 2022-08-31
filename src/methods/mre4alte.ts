import Big from "big.js";
import {TAB4, TAB5} from "../constants";
import {IINPUT} from "../input";


export interface MRE4ALTE_INPUT {
  ZRE4J: Big,
  ZVBEZJ: Big
}

export const MRE4ALTE = ({ ZRE4J, ZVBEZJ }:MRE4ALTE_INPUT,  INPUTDATA:IINPUT) => {

  const { ALTER1, AJAHR } = INPUTDATA;

  let ALTE = new Big(0);      // Altersentlastungsbetrag in Euro, Cent (2 Dezimalstellen)
  let HBALTE = new Big(0);    // Maximaler Altersentlastungsbetrag in Euro
  let K = "36";                     // Nummer der Tabellenwerte für Parameter bei Altersentlastungsbetrag
  let BMG = new Big(0);       // Bemessungsgrundlage für Altersentlastungsbetrag in Euro, Cent (2 Dezimalstellen)

  // ALTER1 = 0 | false
  if (ALTER1) {
    if (AJAHR && AJAHR.year < 2006) {
      K = "1";
    } else if (AJAHR && AJAHR.year < 2040) {
      K = AJAHR.minus({year: 2004}).year.toString();
    }
    // BMG = ZRE4J - ZVBEZJ
    BMG = ZRE4J.minus(ZVBEZJ);
    // ALTE = BMG * TAB4(K)
    ALTE = BMG.mul(TAB4[K]).round(-1, Big.roundUp);
    // HBALTE = TAB5(K)
    HBALTE = TAB5[K];

    if (ALTE.gt(HBALTE)) {
      ALTE = HBALTE;
    }
  }

  return { ALTE }
}
