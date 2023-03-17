import Big from "big.js";
import { KENNVMT } from "./constants";
import { IINPUT } from "./input";

export interface ICONFIGURATION {
  BJAHR: number;
  KENNVMT: KENNVMT;
  GFB: Big;
  SOLZFREI: Big;
  TBSVORV: Big;
  W1STKL5: Big;
  W2STKL5: Big;
  W3STKL5: Big;
  RVSATZAN: Big;
  PVSATZAG: Big;
  PVSATZAN: Big;
  KVSATZAG: Big;
  KVSATZAN: Big;
  BBGKVPV: Big;
  BBGRV: Big;
  VBEZBSO: Big;
}

export class PARAMS {
  BJAHR: number;
  KENNVMT: KENNVMT = KENNVMT.NORMAL;
  GFB = new Big(0); // Grundfreibetrag in Euro
  SOLZFREI = new Big(0); // Freigrenze für den Solidaritätszuschlag in Euro
  TBSVORV = new Big(0); // Teilbetragssatz der Vorsorgepauschale für die Rentenversicherung (2 Dezimalstellen)
  W1STKL5 = new Big(0); // Erster Grenzwert in Steuerklasse V/VI in Euro
  W2STKL5 = new Big(0); // Zweiter Grenzwert in Steuerklasse V/VI in Euro
  W3STKL5 = new Big(222260); // Dritter Grenzwert in Steuerklasse V/VI in Euro
  RVSATZAN = new Big(0); // Beitragssatz des Arbeitnehmers in der allgemeinen gesetzlichen Rentenversicherung (4 Dezimalstellen)
  BBGRV = new Big(0); // Allgemeine Beitragsbemessungsgrenze in der allgemeinen Rentenversicherung in Euro
  VBEZBSO = new Big(0); // Bemessungsgrundlage für den Versorgungsfreibetrag in Cent für den sonstigen Bezug
  PVSATZAG = new Big(0); // Beitragssatz des Arbeitgebers zur Pflegeversicherung (5 Dezimalstellen)
  PVSATZAN = new Big(0); // Beitragssatz des Arbeitnehmers zur Pflegeversicherung (5 Dezimalstellen)
  KVSATZAG = new Big(0); // Beitragssatz des Arbeitgebers zur Krankenversicherung unter Berücksichtigung des durchschnittlichen Zusatzbeitragssatzes für die Ermittlung des Arbeitgeberzuschusses (5 Dezimalstellen)
  KVSATZAN = new Big(0); // Beitragssatz des Arbeitnehmers zur Krankenversicherung (5 Dezimalstellen)
  BBGKVPV = new Big(0); // Beitragsbemessungsgrenze in der gesetzlichen Krankenversicherung und der sozialen Pflegeversicherung in Euro

  constructor(YEAR = 2022, CONFIG: IINPUT) {
    this.BJAHR = YEAR;

    if (this.BJAHR === 2022) {
      this.config2022(CONFIG);
    }
    if (this.BJAHR === 2023) {
      this.config2023(CONFIG);
    }

    return this;
  }

  config2022({ KRV, KVZ, PVS, PVZ }: IINPUT) {
    this.GFB = new Big(10347);
    this.SOLZFREI = new Big(16956);
    this.W1STKL5 = new Big(11793);
    this.W2STKL5 = new Big(29298);

    if (KRV < 2) {
      if (KRV === 0) {
        this.BBGRV = new Big(84600);
      } else {
        this.BBGRV = new Big(81000);
      }
      this.RVSATZAN = new Big(0.093);
      this.TBSVORV = new Big(0.88);
    }

    this.BBGKVPV = new Big(58050);
    this.KVSATZAN = KVZ.div(2).div(100).add(0.07);
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
  }

  config2023({ KRV, KVZ, PVS, PVZ }: IINPUT) {
    this.GFB = new Big(10908);
    this.SOLZFREI = new Big(17543);
    this.W1STKL5 = new Big(12485);
    this.W2STKL5 = new Big(31404);

    if (KRV < 2) {
      if (KRV === 0) {
        this.BBGRV = new Big(87600);
      } else {
        this.BBGRV = new Big(85200);
      }
      this.RVSATZAN = new Big(0.093);
      this.TBSVORV = new Big(1.0);
    }

    this.BBGKVPV = new Big(59850);
    this.KVSATZAN = KVZ.div(2).div(100).add(0.07);
    this.KVSATZAG = new Big(0.008).add(0.07);

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
  }
}
