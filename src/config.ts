import Big from "big.js";
import { KENNVMT } from "./constants";
import { IINPUT } from "./input";
import config2022 from "./configuraions/2022";
import config2023 from "./configuraions/2023";

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

export interface IPARAMS {
  BJAHR: number;
  KENNVMT: KENNVMT;
  GFB: Big; // Grundfreibetrag in Euro
  SOLZFREI: Big; // Freigrenze für den Solidaritätszuschlag in Euro
  TBSVORV: Big; // Teilbetragssatz der Vorsorgepauschale für die Rentenversicherung (2 Dezimalstellen)
  W1STKL5: Big; // Erster Grenzwert in Steuerklasse V/VI in Euro
  W2STKL5: Big; // Zweiter Grenzwert in Steuerklasse V/VI in Euro
  W3STKL5: Big; // Dritter Grenzwert in Steuerklasse V/VI in Euro
  RVSATZAN: Big; // Beitragssatz des Arbeitnehmers in der allgemeinen gesetzlichen Rentenversicherung (4 Dezimalstellen)
  BBGRV: Big; // Allgemeine Beitragsbemessungsgrenze in der allgemeinen Rentenversicherung in Euro
  VBEZBSO: Big; // Bemessungsgrundlage für den Versorgungsfreibetrag in Cent für den sonstigen Bezug
  PVSATZAG: Big; // Beitragssatz des Arbeitgebers zur Pflegeversicherung (5 Dezimalstellen)
  PVSATZAN: Big; // Beitragssatz des Arbeitnehmers zur Pflegeversicherung (5 Dezimalstellen)
  KVSATZAG: Big; // Beitragssatz des Arbeitgebers zur Krankenversicherung unter Berücksichtigung des durchschnittlichen Zusatzbeitragssatzes für die Ermittlung des Arbeitgeberzuschusses (5 Dezimalstellen)
  KVSATZAN: Big; // Beitragssatz des Arbeitnehmers zur Krankenversicherung (5 Dezimalstellen)
  BBGKVPV: Big; // Beitragsbemessungsgrenze in der gesetzlichen Krankenversicherung und der sozialen Pflegeversicherung in Euro
}

const parseYEAR = (inputYear: number | string): { BJAHR: number, PATCH: string } => {
  let calculationYear:number;
  let calculationPatch:string;
  if (typeof inputYear === "number") {
    calculationYear = inputYear;
    calculationPatch = ""
  } else {
    const [cYear, cPatch] = inputYear.split(".");
    calculationYear = parseInt(cYear);
    calculationPatch = cPatch;
  }
  return {
    BJAHR: calculationYear,
    PATCH: calculationPatch,
  }
}

export const PARAMS = (year:number|string, CONFIG:IINPUT):IPARAMS => {
  const { BJAHR, PATCH } = parseYEAR(year);

  const base = {
    BJAHR: BJAHR,
    KENNVMT: KENNVMT.NORMAL,
    GFB: new Big(0),
    SOLZFREI: new Big(0),
    TBSVORV: new Big(0),
    W1STKL5: new Big(0),
    W2STKL5: new Big(0),
    W3STKL5: new Big(222260),
    RVSATZAN: new Big(0),
    BBGRV: new Big(0),
    VBEZBSO: new Big(0),
    PVSATZAG: new Big(0),
    PVSATZAN: new Big(0),
    KVSATZAG: new Big(0),
    KVSATZAN: new Big(0),
    BBGKVPV: new Big(0),
  }

  return {
    ...base,
    ...(BJAHR === 2022 ? config2022(CONFIG, base, PATCH) : {}),
    ...(BJAHR === 2023 ? config2023(CONFIG, base, PATCH) : {}),
  };
}
