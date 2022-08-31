import Big from "big.js";
import {DateTime} from "luxon";
import {KRV, LZZ, PKV, STKL} from "./constants";

export interface LST_INPUT {
  STKL:STKL,
  RE4:Big,
  LZZ:LZZ,

  KRV?: KRV,
  PKV?: PKV,
  ZMVB?: number,
  KVZ?: Big,
  PVZ?: boolean,
  AF?: boolean,
  F?: Big,
  R?: number,
  AJAHR?: 0 | DateTime,
  VJAHR?: 0 | DateTime,
  ALTER1?: boolean,
  LZZHINZU?: Big,
  LZZFREIB?: Big,
  PVS?: boolean,
  JRE4?: Big,
  VBEZ?: Big,
  JVBEZ?: Big,
  JRE4ENT?: Big,
  JFREIB?: Big,
  JHINZU?: Big,
  ENTSCH?: Big,
  MBV?: Big,
  PKPV?: Big,
  STERBE?: Big,
  ZKF?: Big,
  VBEZS?: Big,
  VBEZM?: Big,
  VKAPA?: Big,
  VMT?: Big,
  SONSTB?: Big,
  SONSTENT?: Big,
  VBS?: Big,
}

export interface IINPUT {
  KRV: KRV,
  PKV: PKV,
  ZMVB: number,       // Zahl der Monate, für die im Kalenderjahr Versorgungsbezüge gezahlt werden [nur erforderlich bei Jahresberechnung (LZZ = 1)]
  KVZ: Big,           // Kassenindividueller Zusatzbeitragssatz bei einem gesetzlich krankenversicherten Arbeitnehmer in Prozent (bspw. 1,30 für 1,30 %) mit 2 Dezimalstellen. Es ist der volle Zusatzbeitragssatz anzugeben. Die Aufteilung in Arbeitnehmer- und Arbeitgeberanteil erfolgt im Programmablauf. || Siehe i.Ü. auch Erläuterungen unter Pkt. 2.4.
  STKL: STKL,
  PVZ: boolean,       // 1, wenn der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung zu zahlen hat
  AF: boolean,         // 1, wenn die Anwendung des Faktorverfahrens gewählt wurde (nur in Steuerklasse IV)
  F: Big,             // eingetragener Faktor mit drei Nachkommastellen
  R: number,          // Religionsgemeinschaft des Arbeitnehmers lt. elektronischer Lohnsteuerabzugsmerkmale oder der Bescheinigung für den Lohnsteuerabzug 2022 (bei keiner Religionszugehörigkeit = 0)
  AJAHR: 0 | DateTime,// Auf die Vollendung des 64. Lebensjahres folgendes Kalenderjahr (erforderlich, wenn ALTER1=1)
  VJAHR: 0 | DateTime,// Jahr, in dem der Versorgungsbezug erstmalig gewährt wurde; werden mehrere Versorgungsbezüge gezahlt, wird aus Vereinfachungsgründen für die Berechnung das Jahr des ältesten erstmaligen Bezugs herangezogen; auf die Möglichkeit der getrennten Abrechnung verschiedenartiger Bezüge (§ 39e Absatz 5a EStG) wird im Übrigen verwiesen
  ALTER1: boolean,    // 1, wenn das 64. Lebensjahr vor Beginn des Kalenderjahres vollendet wurde, in dem der Lohnzahlungszeitraum endet (§ 24a EStG), sonst = 0

  LZZ:LZZ,
  LZZHINZU: Big,      // Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte oder in der Bescheinigung für den Lohnsteuerabzug 2022 eingetragene Hinzurechnungsbetrag für den Lohnzahlungszeitraum in Cent
  LZZFREIB: Big,      // Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte oder in der Bescheinigung für den Lohnsteuerabzug 2022 eingetragene Freibetrag für den Lohnzahlungszeitraum in Cent
  PVS: boolean,       // 1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw. zu berücksichtigen wären

  RE4: Big,           // Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum vor Berücksichtigung des Versorgungsfreibetrags und des Zuschlags zum Versorgungsfreibetrag, des Altersentlastungsbetrags und des als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in der Bescheinigung für den Lohnsteuerabzug 2022 für den Lohnzahlungszeitraum eingetragenen Freibetrags bzw. Hinzurechnungsbetrags in Cent
  JRE4: Big,          // Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge (d.h. auch ohne Vergütung für mehrjährige Tätigkeit und ohne die zu besteuernden Vorteile bei Vermögensbeteiligungen, § 19a Absatz 4 EStG) in Cent. Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingaben zu sonstigen Bezügen (Felder SONSTB, VMT oder VKAPA).

  VBEZ: Big,          // In RE4 enthaltene Versorgungsbezüge in Cent (ggf. 0) ggf. unter Berücksichtigung einer geänderten Bemessungsgrundlage nach § 19 Absatz 2 Satz 10 und 11 EStG
  JVBEZ: Big,         // In JRE4 enthaltene Versorgungsbezüge in Cent (ggf. 0)
  JRE4ENT: Big        // In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG und zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG in Cent

  JFREIB: Big,        // Jahresfreibetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der Bescheinigung für den Lohnsteuerabzug 2022 in Cent (ggf. 0)
  JHINZU: Big,        // Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der Bescheinigung für den Lohnsteuerabzug 2022 in Cent (ggf. 0)
  ENTSCH: Big,        // In VKAPA und VMT enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG) in Cent
  MBV: Big,           // Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) in Cent
  PKPV: Big;          // Dem Arbeitgeber mitgeteilte Beiträge des Arbeitnehmers für eine private Basiskranken- bzw. Pflege-Pflichtversicherung im Sinne des § 10 Absatz 1 Nummer 3 EStG in Cent; der Wert ist unabhängig vom Lohnzahlungszeitraum immer als Monatsbetrag anzugeben
                      // Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden, so sind sie dem voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Gleiches gilt für zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG). Vergütungen für mehrjährige Tätigkeit aus einem vorangegangenen Abrechnungszeitraum werden in voller Höhe hinzugerechnet.
  STERBE: Big,        // Sterbegeld bei Versorgungsbezügen sowie Kapitalauszahlungen/Abfindungen, soweit es sich nicht um Bezüge für mehrere Jahre handelt (in SONSTB enthalten), in Cent
  ZKF: Big,           // Zahl der Freibeträge für Kinder (eine Dezimalstelle, nur bei Steuerklassen I, II, III und IV)

  VBEZS: Big,         // Voraussichtliche Sonderzahlungen von Versorgungsbezügen im Kalenderjahr des Versorgungsbeginns bei Versorgungsempfängern ohne Sterbegeld, Kapitalauszahlungen/Abfindungen in Cent
  VBEZM: Big,         // Versorgungsbezug im Januar 2005 bzw. für den ersten vollen Monat, wenn der Versorgungsbezug erstmalig nach Januar 2005 gewährt wurde, in Cent

  VKAPA: Big,         // Entschädigungen/Kapitalauszahlungen/Abfindungen/ Nachzahlungen bei Versorgungsbezügen für mehrere Jahre in Cent (ggf. 0)
  VMT: Big,           // Entschädigungen und Vergütung für mehrjährige Tätigkeit sowie tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 Satz 2 EStG) ohne Kapitalauszahlungen und ohne Abfindungen bei Versorgungsbezügen in Cent (ggf. 0)

  SONSTB: Big,        // Sonstige Bezüge (ohne Vergütung aus mehrjähriger Tätigkeit) einschließlich nicht tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen und Sterbegeld bei Versorgungsbezügen sowie Kapitalauszahlungen/Abfindungen, soweit es sich nicht um Bezüge für mehrere Jahre handelt, in Cent (ggf. 0)
  SONSTENT: Big,      // In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie nicht tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen in Cent
  VBS: Big,           // In SONSTB enthaltene Versorgungsbezüge einschließlich Sterbegeld in Cent (ggf. 0)
}

export class INPUTS {
  AF:boolean;
  F:Big;
  R:number;
  ALTER1: boolean;
  ZMVB:number;
  PVS:boolean;
  PVZ:boolean;
  AJAHR:0 | DateTime = 0;
  VJAHR:0 | DateTime = 0;
  KRV:KRV;
  PKV:PKV;
  STKL:STKL;
  LZZ:LZZ;
  PKPV:Big;
  ZKF:Big;
  JFREIB:Big;
  JHINZU:Big;
  KVZ:Big;
  ENTSCH:Big;
  LZZHINZU:Big;
  LZZFREIB:Big;
  MBV:Big;
  RE4:Big;
  JRE4:Big;
  JRE4ENT:Big;
  VBEZ:Big;
  JVBEZ:Big;
  VBEZS:Big;
  VBEZM:Big;
  VKAPA:Big;
  VMT:Big;
  SONSTB:Big;
  SONSTENT:Big;
  VBS:Big;
  STERBE:Big;

  constructor(PARAMETER:LST_INPUT) {

    this.STKL = PARAMETER.STKL;
    this.LZZ = PARAMETER.LZZ;
    this.RE4 = PARAMETER.RE4;

    this.AF = undefined === PARAMETER.AF ? false : PARAMETER.AF;
    this.F = undefined === PARAMETER.F ? new Big(0) : PARAMETER.F;
    this.R = undefined === PARAMETER.R ? 0 : PARAMETER.R;
    this.ALTER1 = undefined === PARAMETER.ALTER1 ? false : PARAMETER.ALTER1;
    this.AJAHR = undefined === PARAMETER.AJAHR ? 0 : PARAMETER.AJAHR;
    this.VJAHR = undefined === PARAMETER.VJAHR ? 0 : PARAMETER.VJAHR;
    this.ZMVB = undefined === PARAMETER.ZMVB ? 0 : PARAMETER.ZMVB ;
    this.PVS = undefined === PARAMETER.PVS ? false : PARAMETER.PVS;
    this.PVZ = undefined === PARAMETER.PVZ ? false : PARAMETER.PVZ;
    this.KRV = undefined === PARAMETER.KRV ? KRV.BBGW : PARAMETER.KRV;
    this.PKV = undefined === PARAMETER.PKV ? PKV.GKA : PARAMETER.PKV;
    this.PKPV = undefined === PARAMETER.PKPV ? new Big(0) : PARAMETER.PKPV;
    this.ZKF = undefined === PARAMETER.ZKF ? new Big(0) : PARAMETER.ZKF;
    this.JFREIB = undefined === PARAMETER.JFREIB ? new Big(0) : PARAMETER.JFREIB;
    this.JHINZU = undefined === PARAMETER.JHINZU ? new Big(0) : PARAMETER.JHINZU;
    this.KVZ = undefined === PARAMETER.KVZ ? new Big(0) : PARAMETER.KVZ;
    this.ENTSCH = undefined === PARAMETER.ENTSCH ? new Big(0) : PARAMETER.ENTSCH;
    this.LZZHINZU = undefined === PARAMETER.LZZHINZU ? new Big(0) : PARAMETER.LZZHINZU;
    this.LZZFREIB = undefined === PARAMETER.LZZFREIB ? new Big(0) : PARAMETER.LZZFREIB;
    this.MBV = undefined === PARAMETER.MBV ? new Big(0) : PARAMETER.MBV;
    this.JRE4 = undefined === PARAMETER.JRE4 ? new Big(0) : PARAMETER.JRE4;
    this.JRE4ENT = undefined === PARAMETER.JRE4ENT ? new Big(0) : PARAMETER.JRE4ENT;
    this.VBEZ = undefined === PARAMETER.VBEZ ? new Big(0) : PARAMETER.VBEZ;
    this.JVBEZ = undefined === PARAMETER.JVBEZ ? new Big(0) : PARAMETER.JVBEZ;
    this.VBEZS = undefined === PARAMETER.VBEZS ? new Big(0) : PARAMETER.VBEZS;
    this.VBEZM = undefined === PARAMETER.VBEZM ? new Big(0) : PARAMETER.VBEZM;
    this.VKAPA = undefined === PARAMETER.VKAPA ? new Big(0) : PARAMETER.VKAPA;
    this.VMT = undefined === PARAMETER.VMT ? new Big(0) : PARAMETER.VMT;
    this.SONSTB = undefined === PARAMETER.SONSTB ? new Big(0) : PARAMETER.SONSTB;
    this.SONSTENT = undefined === PARAMETER.SONSTENT ? new Big(0) : PARAMETER.SONSTENT;
    this.VBS = undefined === PARAMETER.VBS ? new Big(0) : PARAMETER.VBS;
    this.STERBE = undefined === PARAMETER.STERBE ? new Big(0) : PARAMETER.STERBE;

    return this;
  }

}
