import Big from "big.js";
import {IINPUT} from "../input";

export const MRE4JL = ({AF, F, LZZ, RE4, VBEZ, LZZFREIB, LZZHINZU }:IINPUT) => {
  const jahr = (input: Big) => input.div(100);
  const monat = (input: Big) => input.mul(12).div(100);
  const woche = (input: Big) => input.mul(360).div(7).div(100);
  const tag = (input: Big) => input.mul(360).div(100);

  let ZRE4J = new Big(0);    // Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen)
  let ZVBEZJ = new Big(0);   // Auf einen Jahreslohn hochgerechnetes VBEZ in Euro, Cent (2 Dezimalstellen)
  let JLFREIB = new Big(0);  // Auf einen Jahreslohn hochgerechneter LZZFREIB in Euro, Cent (2 Dezimalstellen)
  let JLHINZU = new Big(0);  // Auf einen Jahreslohn hochgerechneter LZZHINZU in Euro, Cent (2 Dezimalstellen)
  let f = F;
  let re4 = RE4 || new Big(0);
  let vbez = VBEZ || new Big(0);
  let lzzfreib = LZZFREIB || new Big(0);
  let lzzhinzu = LZZHINZU || new Big(0);

  if (LZZ === 1) {
    // JAHR
    ZRE4J = jahr(re4);
    ZVBEZJ = jahr(vbez);
    JLFREIB = jahr(lzzfreib);
    JLHINZU = jahr(lzzhinzu);
  }
  if (LZZ === 2) {
    // MONAT
    ZRE4J = monat(re4);
    ZVBEZJ = monat(vbez);
    JLFREIB = monat(lzzfreib);
    JLHINZU = monat(lzzhinzu);
  }
  if (LZZ === 3) {
    // WOCHE
    ZRE4J = woche(re4);
    ZVBEZJ = woche(vbez);
    JLFREIB = woche(lzzfreib);
    JLHINZU = woche(lzzhinzu);
  }
  if (LZZ === 4) {
    // TAG
    ZRE4J = tag(re4)
    ZVBEZJ = tag(vbez);
    JLFREIB = tag(lzzfreib);
    JLHINZU = tag(lzzhinzu);
  }

  // AF = 0 ? => AF === false => AF !== true =>
  if (!AF) {
    f = new Big(1);
  }

  return {
    ZRE4J,
    ZVBEZJ,
    JLFREIB,
    JLHINZU,
    F:f,
  }
}
