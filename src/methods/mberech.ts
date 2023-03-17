import Big from "big.js";
import { MZTABFB } from "./mztabfb";
import { MLSTJAHR } from "./mlstjahr";
import { UPLSTLZZ } from "./uplstlzz";
import { UPVKLZZ } from "./upvklzz";
import { MRE4ABZ } from "./mre4abz";
import { MSOLZ } from "./msolz";
import { ICONFIGURATION } from "../config";
import { IINPUT } from "../input";

interface MBERECH_INPUT extends IINPUT {
  FVB: Big;
  FVBZ: Big;
  FVBZSO: Big;
  ZRE4: Big;
  ZRE4VP: Big;
  ZRE4J: Big;
  ZVBEZ: Big;
  ZVBEZJ: Big;
  ALTE: Big;
  JLFREIB: Big;
  JLHINZU: Big;
}

export const MBERECH = (
  { FVB, FVBZ, FVBZSO, ZRE4, ZRE4VP, ZRE4J, ZVBEZ, ZVBEZJ, ALTE, JLFREIB, JLHINZU, ...INPUTDATA }: MBERECH_INPUT,
  CONFIG: ICONFIGURATION,
) => {
  let WVFRB: Big; // Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag bei der Berechnung des laufenden Arbeitslohns, in Cent
  let JBMG: Big; // Jahressteuer nach § 51a EStG, aus der Solidaritätszuschlag und Bemessungsgrundlage für die Kirchenlohnsteuer ermittelt werden, in Euro

  const { GFB, SOLZFREI } = CONFIG;

  const {
    ANP,
    KFB,
    ZTABFB,
    FVBZ: fvbz,
    KZTAB,
  } = MZTABFB(
    {
      ...INPUTDATA,
      ZRE4,
      ZVBEZ,
      FVBZ,
      FVBZSO,
    },
    CONFIG,
  );

  // Verbrauchter Freibetrag bei Berechnung des laufenden Arbeitslohns, in Cent
  const VFRB = ANP.add(FVB).add(fvbz).mul(100);

  const { ST, ZVE, VSP2, VSP3 } = MLSTJAHR({ ...INPUTDATA, ZRE4, ZRE4VP, KZTAB, ZTABFB }, CONFIG);

  // WVFRB = (ZVE - GFB) * 100
  WVFRB = ZVE.minus(GFB).mul(100);

  if (WVFRB.lt(0)) {
    WVFRB = new Big(0);
  }

  const { F, R, ZKF, LZZ, PKV } = INPUTDATA;

  // Jahreslohnsteuer in Euro
  // LSTJAHR = ST * F;
  const LSTJAHR = ST.mul(F).round(0, Big.roundDown);

  const { LSTLZZ } = UPLSTLZZ({ LSTJAHR, LZZ });

  const { VKVLZZ } = UPVKLZZ({ LZZ, PKV, VSP2, VSP3 });

  // ZKV > 0
  if (ZKF.gt(0)) {
    // | Ja
    const ztabfb = ZTABFB.add(KFB);

    // MRE4ABZ
    const { ZRE4: zre4, ZRE4VP: zre4vp } = MRE4ABZ(
      {
        ZRE4J,
        ZVBEZJ,
        FVB,
        ALTE,
        JLFREIB,
        JLHINZU,
        ...INPUTDATA,
      },
      CONFIG,
    );
    // MLSTJAHR
    const { ST } = MLSTJAHR({ ...INPUTDATA, ZRE4: zre4, ZRE4VP: zre4vp, ZTABFB: ztabfb, KZTAB }, CONFIG);

    JBMG = ST.mul(F).round(0, Big.roundDown);
  } else {
    // | Nein
    JBMG = LSTJAHR;
  }

  // MSOLZ
  const { SOLZLZZ, BK } = MSOLZ({ KZTAB, LZZ, R, JBMG, SOLZFREI });

  return {
    BK,
    JBMG,
    SOLZLZZ,
    LSTLZZ,
    VKVLZZ,
    VFRB,
    WVFRB,
    KZTAB,
    ZTABFB,
  };
};
