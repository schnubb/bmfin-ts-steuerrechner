import "isomorphic-fetch";
import { parseStringPromise } from "xml2js";
import Big from "big.js";
import { LST2022 } from "./lst2022";

const baseURL = "https://www.bmf-steuerrechner.de/";
const year = "2022";
const version = "Version1";
const code = "2022eP";

describe("Lohnsteuerrechner", () => {
  describe.each([
    [{ LZZ: 2, RE4: 65450, STKL: 5, KVZ: 0.9, F: 1.0, ZKF: 3 }],
    [{ LZZ: 2, RE4: 533333, STKL: 4, KVZ: 0.9, F: 1.0, ZKF: 1 }],
    [{ LZZ: 2, RE4: 8333, STKL: 4, KVZ: 0.9, F: 1.0, ZKF: 1 }],
    [{ LZZ: 1, RE4: 208333, STKL: 4, KVZ: 0.9, F: 1.0, ZKF: 1 }],
    [{ LZZ: 2, RE4: 208333, STKL: 4, KVZ: 0.9, F: 1.0, ZKF: 1 }],
    [{ LZZ: 3, RE4: 208333, STKL: 4, KVZ: 0.9, F: 1.0, ZKF: 1 }],
    [{ LZZ: 4, RE4: 208333, STKL: 4, KVZ: 0.9, F: 1.0, ZKF: 1 }],
    [{ LZZ: 1, RE4: 208333, STKL: 1, KVZ: 0.9, F: 1.0, ZKF: 1 }],
  ])("when parameters are %j, then expect LSTLZZ to be %d",  (params)=>{
    test("should calculate LSTLZZ", async () => {
      const urlWithOutProps = `${baseURL}interface/${year}${version}.xhtml?code=${code}`;
      const url = `${urlWithOutProps}&${Object.entries(params).map(v => `${v[0]}=${v[1]}`).join("&")}`;
      const reqest = await fetch(url);
      const result = await reqest.text();
      const { lohnsteuer } = await parseStringPromise(result, {mergeAttrs: true});
      const { ausgaben } = lohnsteuer;
      const { ausgabe } = ausgaben.pop();
      const mappedResult: { [index: string]: Big } = {};
      ausgabe.forEach((obj:{name:string[], value:string[], type:string[]}) => {
        const { name, value } = obj;
        const [key] = name;
        const [val] = value
        mappedResult[key] = new Big(val);
      });

      const { LSTLZZ:calculatedLSTLZZ } = LST2022({
        ...params,
        F: new Big(params.F),
        ZKF: new Big(params.ZKF),
        KVZ: new Big(params.KVZ),
        RE4: new Big(params.RE4),
      })
      const { LSTLZZ:requestedLSTLZZ } = mappedResult;

      expect(requestedLSTLZZ.toNumber()).toBe(calculatedLSTLZZ);
    });
  });
});
