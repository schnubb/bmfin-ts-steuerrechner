# JS/TS Lohnsteuer Rechner 2022

**Achtung**

Der Scope dieses Packages ist lediglich eine Referenz auf den Ursprung dieser Software.
Dieses Package wurde weder vom BMF entwickelt, noch in Auftrag gegeben. 
Lediglich der [PAP2022](/documentation/2021-11-05-PAP-2022-anlage-1.pdf) wurde als Grundlage für diese Software genutzt.
Zusätzlich wurden Änderung aus der [Lohnsteuer2022.xml](/documentation/Lohnsteuer2022.xml) ergänzt.

**Achtung**

## Usage

```js
import { LST2022 } from "@bmfin/steuerrechner";
import Big from "big.js";

const baseFinData = {LZZ: 1, STKL: 1, RE4: new Big(1000000)};
const { LSTLZZ } = LST2022(baseFinData);
```

### Eingabe Informationen

| Eigenschaft |      Typ      | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|:------------|:-------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| LZZ         | number / LZZ  | **Lohnzahlungszeitraum** <br/>1 = Jahr,<br/> 2 = Monat,<br/> 3 = Woche,<br/> 4 = Tag                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| STKL        | number / STKL | **Steuerklasse**<br/> 1 = I,<br/> 2 = II,<br/> 3 = III,<br/> 4 = IV,<br/> 5 = V,<br/> 6 = VI                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| RE4         |      Big      | Steuerpflichtiger **Arbeitslohn für den Lohnzahlungszeitraum** vor Berücksichtigung des Versorgungsfreibetrags und des Zuschlags zum Versorgungsfreibetrag, des Altersentlastungsbetrags und des als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in der Bescheinigung für den Lohnsteuerabzug 2022 für den Lohnzahlungszeitraum eingetragenen Freibetrags bzw. Hinzurechnungsbetrags in Cent (z.B. 5000€ = 500000)                                                                                                                                                                                                        |
| ...         |      ...      | **Optionale Parameter**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| AJAHR       | 0 / DateTime  | Auf die Vollendung des 64. Lebensjahres folgendes Kalenderjahr (erforderlich, wenn ALTER1=1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| VJAHR       | 0 / DateTime  | Jahr, in dem der Versorgungsbezug erstmalig gewährt wurde; werden mehrere Versorgungsbezüge gezahlt, wird aus Vereinfachungsgründen für die Berechnung das Jahr des ältesten erstmaligen Bezugs herangezogen; auf die Möglichkeit der getrennten Abrechnung verschiedenartiger Bezüge (§ 39e Absatz 5a EStG) wird im Übrigen verwiesen                                                                                                                                                                                                                                                                                                   |
| KRV         | number / KRV  | Merker für die Vorsorgepauschale <br/> BBGW = 0 (der Arbeitnehmer ist in der gesetzlichen Rentenversicherung oder einer berufsständischen Versorgungseinrichtung pflichtversichert oder bei Befreiung von der Versicherungspflicht freiwillig versichert; es gilt die allgemeine Beitragsbemessungsgrenze (BBG West)) <br/>  BBGO = 1 (der Arbeitnehmer ist in der gesetzlichen Rentenversicherung oder einer berufsständischen Versorgungseinrichtung pflichtversichert oder bei Befreiung von der Versicherungspflicht freiwillig versichert; es gilt die Beitragsbemessungsgrenze Ost (BBG Ost)) <br/> NONE = 2 (wenn nicht 0 oder 1) |
| PKV         | number / PKV  | GKA = 0 (gesetzlich krankenversicherte Arbeitnehmer)<br/> PKAO = 1 (ausschließlich privat krankenversicherte Arbeitnehmer ohne Arbeitgeberzuschuss)<br/> PKAM = 2 (ausschließlich privat krankenversicherte Arbeitnehmer mit Arbeitgeberzuschuss)                                                                                                                                                                                                                                                                                                                                                                                        |
| ZMVB        |    number     | Zahl der Monate, für die im Kalenderjahr Versorgungsbezüge gezahlt werden (nur erforderlich bei Jahresberechnung (LZZ = 1))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| R           |    number     | Religionsgemeinschaft des Arbeitnehmers lt. elektronischer Lohnsteuerabzugsmerkmale oder der Bescheinigung für den Lohnsteuerabzug 2022 (bei keiner Religionszugehörigkeit = 0)                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| PVZ         |    boolean    | `true`, wenn der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung zu zahlen hat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| PVS         |    boolean    | `true`, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw. zu berücksichtigen wären                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ALTER1      |    boolean    | `true`, wenn das 64. Lebensjahr vor Beginn des Kalenderjahres vollendet wurde, in dem der Lohnzahlungszeitraum endet (§ 24a EStG), sonst = `false`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|             |               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| KVZ         |     Big       | Kassenindividueller Zusatzbeitragssatz bei einem gesetzlich krankenversicherten Arbeitnehmer in Prozent (bspw. 1,30 für 1,30 %) mit 2 Dezimalstellen. Es ist der volle Zusatzbeitragssatz anzugeben. Die Aufteilung in Arbeitnehmer- und Arbeitgeberanteil erfolgt im Programmablauf.                                                                                                                                                                                                                                                                                                                                                    |
| F           |     Big       | eingetragener Faktor mit drei Nachkommastellen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| LZZHINZU    |     Big       | Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte oder in der Bescheinigung für den Lohnsteuerabzug 2022 eingetragene Hinzurechnungsbetrag für den Lohnzahlungszeitraum in Cent (z.B. 5000€ = 500000)                                                                                                                                                                                                                                                                                                                                                                                     |
| LZZFREIB    |     Big       | Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte oder in der Bescheinigung für den Lohnsteuerabzug 2022 eingetragene Freibetrag für den Lohnzahlungszeitraum in Cent (z.B. 5000€ = 500000)                                                                                                                                                                                                                                                                                                                                                                                               |
| JRE4        |     Big       | Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge (d.h. auch ohne Vergütung für mehrjährige Tätigkeit und ohne die zu besteuernden Vorteile bei Vermögensbeteiligungen, § 19a Absatz 4 EStG) in Cent (z.B. 5000€ = 500000). Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingaben zu sonstigen Bezügen (Felder SONSTB, VMT oder VKAPA).                                                                                                                                                                                                                                                                     |
| VBEZ        |     Big       | In RE4 enthaltene Versorgungsbezüge in Cent (ggf. 0 z.B.: 5000€ = 500000) ggf. unter Berücksichtigung einer geänderten Bemessungsgrundlage nach § 19 Absatz 2 Satz 10 und 11 EStG                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| JVBEZ       |     Big       | In JRE4 enthaltene Versorgungsbezüge in Cent (ggf. 0)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| JRE4ENT     |     Big       | In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG und zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG in Cent                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| JFREIB      |     Big       | Jahresfreibetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der Bescheinigung für den Lohnsteuerabzug 2022 in Cent (ggf. 0)                                                                                                                                                                                                                                                                                                                             |
| JHINZU      |     Big       | Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der Bescheinigung für den Lohnsteuerabzug 2022 in Cent (ggf. 0)                                                                                                                                                                                                                                                                                                                   |
| ENTSCH      |     Big       | In VKAPA und VMT enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG) in Cent                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| MBV         |     Big       | Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) in Cent                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| PKPV        |     Big       | Dem Arbeitgeber mitgeteilte Beiträge des Arbeitnehmers für eine private Basiskranken- bzw. Pflege-Pflichtversicherung im Sinne des § 10 Absatz 1 Nummer 3 EStG in Cent; der Wert ist unabhängig vom Lohnzahlungszeitraum immer als Monatsbetrag anzugeben                                                                                                                                                                                                                                                                                                                                                                                |
| STERBE      |     Big       | Sterbegeld bei Versorgungsbezügen sowie Kapitalauszahlungen/Abfindungen, soweit es sich nicht um Bezüge für mehrere Jahre handelt (in SONSTB enthalten), in Cent                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ZKF         |     Big       | Zahl der Freibeträge für Kinder (eine Dezimalstelle, nur bei Steuerklassen I, II, III und IV)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| VBEZS       |     Big       | Voraussichtliche Sonderzahlungen von Versorgungsbezügen im Kalenderjahr des Versorgungsbeginns bei Versorgungsempfängern ohne Sterbegeld, Kapitalauszahlungen/Abfindungen in Cent                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| VBEZM       |     Big       | Versorgungsbezug im Januar 2005 bzw. für den ersten vollen Monat, wenn der Versorgungsbezug erstmalig nach Januar 2005 gewährt wurde, in Cent                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| VKAPA       |     Big       | Entschädigungen/Kapitalauszahlungen/Abfindungen/ Nachzahlungen bei Versorgungsbezügen für mehrere Jahre in Cent (ggf. 0)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| VMT         |     Big       | Entschädigungen und Vergütung für mehrjährige Tätigkeit sowie tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 Satz 2 EStG) ohne Kapitalauszahlungen und ohne Abfindungen bei Versorgungsbezügen in Cent (ggf. 0)                                                                                                                                                                                                                                                                                                                                                                                        |
| SONSTB      |     Big       | Sonstige Bezüge (ohne Vergütung aus mehrjähriger Tätigkeit) einschließlich nicht tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen und Sterbegeld bei Versorgungsbezügen sowie Kapitalauszahlungen/Abfindungen, soweit es sich nicht um Bezüge für mehrere Jahre handelt, in Cent (ggf. 0)                                                                                                                                                                                                                                                                                                                                |
| SONSTENT    |     Big       | In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie nicht tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen in Cent                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| VBS         |     Big       | In SONSTB enthaltene Versorgungsbezüge einschließlich Sterbegeld in Cent (ggf. 0)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
