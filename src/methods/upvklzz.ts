import {LZZ, PKV} from "../constants";
import {UPVKV} from "./upvkv";
import Big from "big.js";
import {UPANTEIL} from "./upanteil";

export interface UPVKLZZ_INPUT {
  LZZ:LZZ,
  PKV: PKV,
  VSP2: Big,
  VSP3: Big,
}

export const UPVKLZZ = ({ LZZ, PKV, VSP2, VSP3 }:UPVKLZZ_INPUT) => {
  // UPVKV
  // |
  // JW = VKV
  const { VKV:JW } = UPVKV({PKV, VSP2, VSP3});
  // UPANTEIL
  // |
  // VKVLZZ = ANTEIL1
  const { ANTEIL1:VKVLZZ } = UPANTEIL({JW, LZZ});

  return { VKVLZZ };
}
