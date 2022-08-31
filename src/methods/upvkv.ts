import {PKV} from "../constants";
import Big from "big.js";

export interface UPVKV_INPUT {
  PKV: PKV,
  VSP2: Big,
  VSP3: Big,
}

export const UPVKV = ({ PKV, VSP2, VSP3 }:UPVKV_INPUT) => {
  let VKV: Big; // Jahreswert der berücksichtigten Beiträge zur privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf. auch die Mindestvorsorgepauschale) in Cent

  if (PKV > 0) {
    if (VSP2.gt(VSP3)) {
      VKV = VSP2.mul(100);
    } else {
      VKV = VSP3.mul(100);
    }
  } else {
    VKV = new Big(0);
  }

  return { VKV };
}
