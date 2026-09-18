Laboratorio Active Directory in GNS3 con Firewall FortiGate in Alta Affidabilità
Panoramica del progetto

Questo repository documenta la progettazione e la realizzazione di un laboratorio di rete completo, costruito interamente in ambiente virtualizzato (GNS3 + VMware Workstation Pro), che replica l'infrastruttura tipica di una piccola/media impresa con più sedi fisiche.

L'obiettivo è dimostrare, in modo pratico e interamente documentato, come progettare e implementare da zero una rete aziendale segmentata per VLAN, protetta da una coppia di firewall FortiGate in cluster ad alta affidabilità (Active-Passive), instradata attraverso uno strato gerarchico di switch Cisco (Distribuzione e Accesso) con protocolli VTP (VLAN Trunking Protocol), STP (Spanning Tree Protocol) e LACP (Link Aggregation Control Protocol), e da una coppia di router Cisco ridondati in HSRP (Hot Standby Router Protocol) responsabili del routing inter-VLAN e del servizio DHCP che varrà poi migrato sul server DC.

La rete sarà completata da un dominio Active Directory su Windows Server, con relativi client Windows 11 uniti al dominio.

Il progetto nasce con finalità didattiche e dimostrative: ogni fase — dalla progettazione teorica (topologia, piano di indirizzamento VLSM, asset inventory) alla configurazione pratica di ciascun dispositivo — è tracciata passo dopo passo, inclusi i problemi realmente incontrati durante il lavoro e le relative soluzioni. L'obiettivo è rendere l'intero percorso replicabile anche a chi si avvicina per la prima volta a questo tipo di laboratorio.

La rete simula tre sedi/reparti distinti (Guest, Admin, Management) collegati a una zona server (Server_Net) che ospita il Domain Controller, il tutto instradato da un cluster ridondato di firewall e da una coppia di router ridondati in HSRP, che garantiscono continuità di servizio anche in caso di guasto di uno dei nodi.

Nota sull'evoluzione dell'architettura: durante la configurazione del routing sul FortiGate è emerso un limite non immediatamente evidente della licenza evaluation gratuita (massimo 3 interfacce totali, fisiche e VLAN combinate) — insufficiente per ospitare le 4 subinterfacce VLAN necessarie. La rete è stata quindi ridisegnata introducendo due router Cisco dedicati al routing inter-VLAN, mantenendo sul FortiGate hardening, cluster HA e routing verso Internet. L'episodio è documentato integralmente nel tracciamento delle configurazioni, come esempio concreto di adattamento progettuale a un vincolo reale.

Nota sull'evoluzione dell'architettura (SW-TRANSIT): durante la configurazione del routing verso Internet sul FortiGate è emerso un secondo vincolo della piattaforma, distinto da quello sulle interfacce: in un cluster FortiGate in Alta Affidabilità (FGCP), la configurazione delle interfacce dati — incluso l'indirizzo IP — è sincronizzata identica su entrambi i nodi del cluster. Con la topologia originale (un collegamento punto-punto dedicato per ciascuna coppia firewall-router), questo rendeva impossibile assegnare a ciascun nodo il proprio indirizzo reale sul rispettivo segmento: qualunque IP configurato su un nodo veniva automaticamente sincronizzato anche sull'altro, lasciando uno dei due collegamenti privo di un indirizzo valido. L'analisi ha rivelato che non si trattava di un limite cosmetico, ma di un singolo punto di guasto reale sulla connettività a Internet: in caso di guasto del nodo primario, il router associato al collegamento non funzionante sarebbe rimasto privo di qualunque percorso alternativo. La rete è stata quindi aggiornata introducendo uno switch dedicato (SW-TRANSIT), su cui convergono entrambi i nodi del cluster FortiGate ed entrambi i router su un unico segmento condiviso, così l'indirizzo IP sincronizzato del cluster risulta raggiungibile da entrambi i router, ripristinando una reale ridondanza. Anche questo episodio, incluso il percorso di analisi che ha portato a scoprirlo, è documentato integralmente nel tracciamento delle configurazioni.

Obiettivi :

0. Progettazione della rete

0.1 Definizione della topologia logica
0.2 Piano di indirizzamento (VLSM)
0.3 Asset inventory

1. Configurazione switch

1.1 Hardening — AAA, SSH, gestione porte non utilizzate, Port Security
1.2 Configurazione VTP + Port Channel
1.3 Configurazione STP
1.4 Verifica configurazione EtherChannel (LACP)

2. Configurazione Router (R1/R2)

2.1 Hardening dispositivo
2.2 Configurazione subinterfacce VLAN
2.3 Routing inter-VLAN
2.4 Collegamento punto-punto R1↔R2
2.5 Configurazione HSRP
2.6 DHCP verso gli endpoint

3. Switch di transito FortiGate↔Router (SW-TRANSIT)

3.1 Hardening dispositivo
3.2 Configurazione delle porte verso FortiGate e router
3.3 Verifica finale

4. Configurazione firewall (FortiGate)

4.1 Hardening Firewall FortiGate — hostname, timeout sessione amministrativa, soglia e durata blocco account
4.2 Alta Affidabilità (cluster HA Active-Passive, unicast heartbeat)
4.3 Routing verso Internet
4.4 Firewall Policy (regole di traffico tra i segmenti, compatibili con il limite di licenza)

5. Configurazione Windows Server

5.1 Definizione Active Directory (foresta/dominio)
5.2 Domain Controller (DNS integrato)
5.3 Migrazione DHCP dai router al Domain
Controller disattivazione pool su R1 - R2
5.4 GPO (Group Policy Object) — criteri applicati ai client di dominio

6. Deployment client

6.1 Creazione VM master Windows 11 Enterprise
6.2 Clonazione e generalizzazione (Sysprep) per i 3 endpoint
6.3 Join al dominio e verifica GPO applicate

7. Validazione e collaudo

7.1 Test connettività
7.2 Verifica risoluzione DNS interna
7.3 Verifica lease DHCP attivi per VLAN
7.4 Test failover HA/HSRP (simulazione guasto nodo primario)
7.5 Verifica autenticazione dominio da più client

8. Documentazione

8.1 README.md — panoramica progetto
8.2 Documento HTML/CSS — tracciamento dettagliato di ogni fase


Prerequisiti
GNS3 + GNS3 VM
VMware Workstation Pro
2 licenze FortiGate VM
ISO Windows Server 2022
ISO Windows 11
IOS Cisco Switch — i86bi-linux-l2-ipbasek9-15.1g.bin
IOS Cisco Router — c3725-adventerprisek9-mz.124-15.T7.bin
FortiGate-VM64-KVM v7.6.7 build3704 (GA.M)
Demo

https://github.com/RobyLedda94/Progetto_Network