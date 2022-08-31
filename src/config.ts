import Big from "big.js";
import {KENNVMT} from "./constants";
import {IINPUT} from "./input";

export interface ICONFIGURATION {
  KENNVMT: KENNVMT,
  GFB: Big,
  SOLZFREI: Big,
  TBSVORV: Big,
  W1STKL5: Big,
  W2STKL5: Big,
  W3STKL5: Big,
  RVSATZAN: Big,
  PVSATZAG: Big,
  PVSATZAN: Big,
  KVSATZAG: Big,
  KVSATZAN: Big,
  BBGKVPV: Big,
  BBGRV: Big,
  VBEZBSO: Big,
}

export class PARAMS {
  KENNVMT:KENNVMT = KENNVMT.NORMAL;
  GFB = new Big(10347);          // Grundfreibetrag in Euro
  SOLZFREI = new Big(16956);    // Freigrenze für den Solidaritätszuschlag in Euro
  TBSVORV = new Big(0);           // Teilbetragssatz der Vorsorgepauschale für die Rentenversicherung (2 Dezimalstellen)
  W1STKL5 = new Big(11793);     // Erster Grenzwert in Steuerklasse V/VI in Euro
  W2STKL5 = new Big(29298);     // Zweiter Grenzwert in Steuerklasse V/VI in Euro
  W3STKL5 = new Big(222260);    // Dritter Grenzwert in Steuerklasse V/VI in Euro
  RVSATZAN = new Big(0);          // Beitragssatz des Arbeitnehmers in der allgemeinen gesetzlichen Rentenversicherung (4 Dezimalstellen)
  BBGRV = new Big(0);             // Allgemeine Beitragsbemessungsgrenze in der allgemeinen Rentenversicherung in Euro
  VBEZBSO = new Big(0);           // Bemessungsgrundlage für den Versorgungsfreibetrag in Cent für den sonstigen Bezug
  PVSATZAG:Big;  // Beitragssatz des Arbeitgebers zur Pflegeversicherung (5 Dezimalstellen)
  PVSATZAN:Big;  // Beitragssatz des Arbeitnehmers zur Pflegeversicherung (5 Dezimalstellen)
  KVSATZAG:Big;          // Beitragssatz des Arbeitgebers zur Krankenversicherung unter Berücksichtigung des durchschnittlichen Zusatzbeitragssatzes für die Ermittlung des Arbeitgeberzuschusses (5 Dezimalstellen)
  KVSATZAN:Big;          // Beitragssatz des Arbeitnehmers zur Krankenversicherung (5 Dezimalstellen)
  BBGKVPV:Big;     // Beitragsbemessungsgrenze in der gesetzlichen Krankenversicherung und der sozialen Pflegeversicherung in Euro

  constructor({ KRV, KVZ, PVS, PVZ }: IINPUT) {

    if (KRV < 2 ){
      if (KRV === 0) {
        this.BBGRV = new Big(84600);
      } else {
        this.BBGRV = new Big(81000);
      }
      this.RVSATZAN = new Big(0.093);
      this.TBSVORV = new Big(0.88);
    }

    this.BBGKVPV = new Big(58050);
    this.KVSATZAN = (KVZ.div(2).div(100)).add(0.07);
    this.KVSATZAG = new Big(0.0065).add(0.07);

    if (PVS) {
      this.PVSATZAN = new Big(0.02025);
      this.PVSATZAG = new Big(0.01025);
    } else {
      this.PVSATZAN = new Big(0.01525);
      this.PVSATZAG = new Big(0.01525);
    }

    if (PVZ) {
      this.PVSATZAN = this.PVSATZAN.add(0.0035);
    }

    return this;
  }
}
