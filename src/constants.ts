import Big from "big.js";

export enum KRV {        // Merker für die Vorsorgepauschale
  BBGW = 0,       // 0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung oder einer berufsständischen Versorgungseinrichtung pflichtversichert oder bei Befreiung von der Versicherungspflicht freiwillig versichert; es gilt die allgemeine Beitragsbemessungsgrenze (BBG West)
  BBGO = 1,       // 1 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung oder einer berufsständischen Versorgungseinrichtung pflichtversichert oder bei Befreiung von der Versicherungspflicht freiwillig versichert; es gilt die Beitragsbemessungsgrenze Ost (BBG Ost)
  NONE = 2,       // 2 = wenn nicht 0 oder 1
}

export enum LZZ {        // Lohnzahlungszeitraum:
  JAHR = 1,       // 1 = Jahr
  MONAT = 2,      // 2 = Monat
  WOCHE = 3,      // 3 = Woche
  TAG = 4,        // 4 = Tag
}

export enum PKV {
  GKA = 0,      // 0 = gesetzlich krankenversicherte Arbeitnehmer
  PKAO = 1,     // 1 = ausschließlich privat krankenversicherte Arbeitnehmer ohne Arbeitgeberzuschuss
  PKAM = 2      // 2 = ausschließlich privat krankenversicherte Arbeitnehmer mit Arbeitgeberzuschuss
}

export enum STKL {       // Steuerklasse:
  I = 1,          // 1 = I
  II = 2,         // 2 = II
  III = 3,        // 3 = III
  IV = 4,         // 4 = IV
  V = 5,          // 5 = V
  VI = 6,         // 6 = VI
}

export enum KZTAB {      // Kennzahl für die Einkommensteuer-Tarifarten:
  "GRUND" = 1,    // 1 = Grundtarif
  "SPLIT" = 2,    // 2 = Splittingverfahren
}

export enum KENNVMT {    // Merker für Berechnung Lohnsteuer für mehrjährige Tätigkeit
  "NORMAL" = 0,    // 0 = normale Steuerberechnung
  "MJTAT" = 1,     // 1 = Steuerberechnung für mehrjährige Tätigkeit
  "VORPAU" = 2,    // 2 = Ermittlung der Vorsorgepauschale ohne Entschädigungen i.S.d. § 24 Nummer 1 EStG
}

export const TAB1: {[index: string]: Big } = {    // Tabelle für die Prozentsätze des Versorgungsfreibetrags
  "2005": new Big(0.400),
  "2006": new Big(0.384),
  "2007": new Big(0.368),
  "2008": new Big(0.352),
  "2009": new Big(0.336),
  "2010": new Big(0.320),
  "2011": new Big(0.304),
  "2012": new Big(0.288),
  "2013": new Big(0.272),
  "2014": new Big(0.256),
  "2015": new Big(0.240),
  "2016": new Big(0.224),
  "2017": new Big(0.208),
  "2018": new Big(0.192),
  "2019": new Big(0.176),
  "2020": new Big(0.160),
  "2021": new Big(0.152),
  "2022": new Big(0.144),
  "2023": new Big(0.136),
  "2024": new Big(0.128),
  "2025": new Big(0.120),
  "2026": new Big(0.112),
  "2027": new Big(0.104),
  "2028": new Big(0.096),
  "2029": new Big(0.088),
  "2030": new Big(0.080),
  "2031": new Big(0.072),
  "2032": new Big(0.064),
  "2033": new Big(0.056),
  "2034": new Big(0.048),
  "2035": new Big(0.040),
  "2036": new Big(0.032),
  "2037": new Big(0.024),
  "2038": new Big(0.016),
  "2039": new Big(0.008),
  "2040": new Big(0.000),
}; // Tabelle für die Prozentsätze des Versorgungsfreibetrags
export const TAB2: {[index: string]: Big } = {    // Tabelle für die Höchstbeträge des Versorgungsfreibetrags
  "2005": new Big(3000),
  "2006": new Big(2880),
  "2007": new Big(2760),
  "2008": new Big(2640),
  "2009": new Big(2520),
  "2010": new Big(2400),
  "2011": new Big(2280),
  "2012": new Big(2160),
  "2013": new Big(2040),
  "2014": new Big(1920),
  "2015": new Big(1800),
  "2016": new Big(1680),
  "2017": new Big(1560),
  "2018": new Big(1440),
  "2019": new Big(1320),
  "2020": new Big(1200),
  "2021": new Big(1140),
  "2022": new Big(1080),
  "2023": new Big(1020),
  "2024": new Big(960),
  "2025": new Big(900),
  "2026": new Big(840),
  "2027": new Big(780),
  "2028": new Big(720),
  "2029": new Big(660),
  "2030": new Big(600),
  "2031": new Big(540),
  "2032": new Big(480),
  "2033": new Big(420),
  "2034": new Big(360),
  "2035": new Big(300),
  "2036": new Big(240),
  "2037": new Big(180),
  "2038": new Big(120),
  "2039": new Big(60),
  "2040": new Big(0),
}; // Tabelle für die Höchstbeträge des Versorgungsfreibetrags
export const TAB3: {[index: string]: Big }  = {    // Tabelle für die Zuschläge zum Versorgungsfreibetrag
  "2005": new Big(900),
  "2006": new Big(864),
  "2007": new Big(828),
  "2008": new Big(792),
  "2009": new Big(756),
  "2010": new Big(720),
  "2011": new Big(684),
  "2012": new Big(648),
  "2013": new Big(612),
  "2014": new Big(576),
  "2015": new Big(540),
  "2016": new Big(504),
  "2017": new Big(468),
  "2018": new Big(432),
  "2019": new Big(396),
  "2020": new Big(360),
  "2021": new Big(342),
  "2022": new Big(324),
  "2023": new Big(306),
  "2024": new Big(288),
  "2025": new Big(270),
  "2026": new Big(252),
  "2027": new Big(234),
  "2028": new Big(216),
  "2029": new Big(198),
  "2030": new Big(180),
  "2031": new Big(162),
  "2032": new Big(144),
  "2033": new Big(126),
  "2034": new Big(108),
  "2035": new Big(90),
  "2036": new Big(72),
  "2037": new Big(54),
  "2038": new Big(36),
  "2039": new Big(18),
  "2040": new Big(0),
}; // Tabelle für die Zuschläge zum Versorgungsfreibetrag
export const TAB4: {[index: string]: Big } = {    // Tabelle für die Prozentsätze des Altersentlastungsbetrags
  "2005": new Big(0.400),
  "2006": new Big(0.384),
  "2007": new Big(0.368),
  "2008": new Big(0.352),
  "2009": new Big(0.336),
  "2010": new Big(0.320),
  "2011": new Big(0.304),
  "2012": new Big(0.288),
  "2013": new Big(0.272),
  "2014": new Big(0.256),
  "2015": new Big(0.240),
  "2016": new Big(0.224),
  "2017": new Big(0.208),
  "2018": new Big(0.192),
  "2019": new Big(0.176),
  "2020": new Big(0.160),
  "2021": new Big(0.152),
  "2022": new Big(0.144),
  "2023": new Big(0.136),
  "2024": new Big(0.128),
  "2025": new Big(0.120),
  "2026": new Big(0.112),
  "2027": new Big(0.104),
  "2028": new Big(0.096),
  "2029": new Big(0.088),
  "2030": new Big(0.080),
  "2031": new Big(0.072),
  "2032": new Big(0.064),
  "2033": new Big(0.056),
  "2034": new Big(0.048),
  "2035": new Big(0.040),
  "2036": new Big(0.032),
  "2037": new Big(0.024),
  "2038": new Big(0.016),
  "2039": new Big(0.008),
  "2040": new Big(0.000),
}; // Tabelle für die Prozentsätze des Altersentlastungsbetrags
export const TAB5: {[index: string]: Big } = {    // Tabelle für die Höchstbeträge des Altersentlastungsbetrags
  "2005": new Big(1900),
  "2006": new Big(1824),
  "2007": new Big(1748),
  "2008": new Big(1672),
  "2009": new Big(1596),
  "2010": new Big(1520),
  "2011": new Big(1444),
  "2012": new Big(1368),
  "2013": new Big(1292),
  "2014": new Big(1216),
  "2015": new Big(1140),
  "2016": new Big(1064),
  "2017": new Big(988),
  "2018": new Big(912),
  "2019": new Big(836),
  "2020": new Big(760),
  "2021": new Big(722),
  "2022": new Big(684),
  "2023": new Big(646),
  "2024": new Big(608),
  "2025": new Big(570),
  "2026": new Big(532),
  "2027": new Big(494),
  "2028": new Big(456),
  "2029": new Big(418),
  "2030": new Big(380),
  "2031": new Big(342),
  "2032": new Big(304),
  "2033": new Big(266),
  "2034": new Big(228),
  "2035": new Big(190),
  "2036": new Big(152),
  "2037": new Big(114),
  "2038": new Big(76),
  "2039": new Big(38),
  "2040": new Big(0),
}; // Tabelle für die Höchstbeträge des Altersentlastungsbetrags
