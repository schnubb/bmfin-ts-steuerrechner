import Big from "big.js";
import { UPEVP, UPEVP_INPUT } from "./upevp";
import { UPMLST } from "./upmlst";
import {ICONFIGURATION} from "../config";
import {KZTAB} from "../constants";

export interface MLSTJAHR_INPUT extends UPEVP_INPUT {
  VKAPA: Big,
  VMT: Big,
  ZTABFB:Big,
  ZRE4:Big,
  KZTAB: KZTAB,
}

export const MLSTJAHR = (PARAMS: MLSTJAHR_INPUT, CONFIG:ICONFIGURATION) => {
  const { VKAPA, VMT, ZTABFB, ZRE4, STKL, KZTAB,...UPEVP_INPUT } = PARAMS;
  let ZVE: Big;                         // Zu versteuerndes Einkommen in Euro, Cent (2 Dezimalstellen)
  let vmt100 = VMT.div(100);
  let vkapa100 = VKAPA.div(100);
  let ST: Big;                          // Tarifliche Einkommensteuer in Euro
  let STOVMT = new Big(0);        // Zwischenfeld zur Ermittlung der Steuer auf Vergütungen für mehrjährige Tätigkeit in Euro

  const { KENNVMT } = CONFIG;

  const { VSP, VSP2, VSP3 } = UPEVP({
    STKL,
    ...UPEVP_INPUT
  }, CONFIG);

  // KENNVMT <> 1 ?
  if (KENNVMT !== 1) {
    // | Ja
    // ZVE = ZRE4 - ZTABFB - VSP
    ZVE = (ZRE4.minus(ZTABFB).minus(VSP)).round(2, Big.roundDown);

    // UPMLST
    ST = UPMLST({ZVE, STKL, KZTAB}, CONFIG);
  } else {
    // | Nein
    // ZVE = ZRE4 - ZTABFB - VSP - VMT / 100 - VKAPA / 100
    ZVE = (ZRE4.minus(ZTABFB).minus(VSP).minus(vmt100).minus(vkapa100)).round(2, Big.roundDown);

    if (ZVE.lt(0)) {
      // ZVE = (ZVE + VMT / 100 + VKAPA / 100) / 5
      ZVE = ZVE.add(vmt100).add(vkapa100).div(5).round(2, Big.roundDown);

      const tempST = UPMLST({ STKL, KZTAB, ZVE }, CONFIG);

      ST = (tempST.mul(5)).round(0, Big.roundDown);
    } else {
      // UPMLST
      // |
      // STOVMT = ST
      STOVMT = UPMLST({ STKL, KZTAB, ZVE }, CONFIG);

      // ZVE = ZVE + (VMT + VKAPA) / 500
      ZVE = (ZVE.add((VMT.add(VKAPA)).div(500))).round(2, Big.roundDown);

      // UPMLST
      // |
      // ST = (ST - STOVMT) * 5 + STOVMT
      // (((ST.subtract (STOVMT)).multiply (ZAHL5)).add (STOVMT)).setScale (0, BigDecimal.ROUND_DOWN)
      ST = (((UPMLST({ ZVE, STKL, KZTAB}, CONFIG).minus(STOVMT)).mul(5)).add(STOVMT)).round(0, Big.roundDown);
    }
  }

  return {
    ST,
    VSP2,
    VSP3,
    ZVE,
  }
};
