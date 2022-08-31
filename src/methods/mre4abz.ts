import Big from "big.js";
import {ICONFIGURATION} from "../config";
import {IINPUT} from "../input";

export interface MRE4ABZ_INPUT extends IINPUT {
  ZRE4J: Big,
  ZVBEZJ:Big,
  FVB: Big,
  ALTE: Big,
  JLFREIB: Big,
  JLHINZU: Big,
}

export const MRE4ABZ = ({ ZRE4J, ZVBEZJ, FVB, ALTE, JLFREIB, JLHINZU, ENTSCH}:MRE4ABZ_INPUT, CONFIG: ICONFIGURATION) => {
  let ZRE4:Big;     // Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen) nach Abzug der Freibeträge nach § 39b Absatz 2 Satz 3 und 4 EStG
  let ZRE4VP:Big;   // Auf einen Jahreslohn hochgerechnetes RE4, ggf. nach Abzug der Entschädigungen i.S.d. § 24 Nummer 1 EStG in Euro, Cent (2 Dezimalstellen)
  let ZVBEZ:Big;    // Auf einen Jahreslohn hochgerechnetes VBEZ abzüglich FVB in Euro, Cent (2 Dezimalstellen)

  const { KENNVMT } = CONFIG;

  // ZRE4 = ZRE4J - FVB - ALTE - JLFREIB + JLHINZU
  ZRE4 = (ZRE4J.minus(FVB).minus(ALTE).minus(JLFREIB).add(JLHINZU)).round(2, Big.roundDown);

  // ZRE4 < 0
  if(ZRE4.lt(0)) {
    ZRE4 = new Big(0);
  }

  // ZRE4VP = ZRE4J
  ZRE4VP = ZRE4J;

  // KENNVMT = 2 ?
  // JA ->
  // ZRE4VP = ZRE4VP - ENTSCH /100
  if (KENNVMT === 2) {
    ZRE4VP = ZRE4VP.minus(ENTSCH.div(100)).round(2, Big.roundDown);
  }

  // ZVBEZ = ZVBEZJ - FVB
  ZVBEZ = ZVBEZJ.minus(FVB);

  // ZVBEZ < 0 ?
  if (ZVBEZ.lt(0)) {
    ZVBEZ = new Big(0);
  }

  return {
    ZRE4,
    ZRE4VP,
    ZVBEZ
  }
}
