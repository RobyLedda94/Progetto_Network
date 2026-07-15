Laboratorio Active Directory in GNS3 con Firewall Fortigate in Alta Affidabilità


Panoramica del progetto

Questo repository documenta la progettazione e la realizazzione di un laboratorio di rete completo, costruito interamente in ambiente virtualizzato (GNS3 + VMWare Workstation Pro), che replica l'infrastruttura tipica di una piccola/media impresa con più sedi fisiche.

L'obbiettivo è dimostrare, in modo pratico e interamente documentato, come progettare e implementare da zero una rete aziendale segmentata per VLAN, protetta da una coppia di firewall FortiGate in cluster ad alta affidabilità (Active - Passive), instradata attraverso uno strato gerarchico di switch Cisco (Distribuzione e Accesso), con protocolli VTP 'Vlan Trunking Protocol', STP 'Spanning Tree Protocol' e LCAP 'Link Aggregation Conltroll Protocol'. 
La rete sarà completata da un dominio in Active Directory su Windows Server con relativi client Windows 11 uniti al dominio.

Questo progetto nasce con finalità didattiche e dimostrative : ogni fase - della progettazione teorica (topologia, piano di indirizzamento VLSM 'Variable Lenght Subnet Mask' inventario Assets), alla configurazione pratica di ciascun dispositivo - è tracciata passo dopo passo, saranno inclusi anche i problemi incontrati durante il lavoro.

L'obbiettivo è rendere l'intero percorso replicabile anche a chi si avvicina per la prima volta a questo tipo di laboratorio.

La rete simula tre sedi/reparti distinti (Guest, Admin, Management) collegati ad una zona server (Server_Net) che ospita il domain controller, il tutto instradato da un cluster ridondato di firewall che garantisce continuità di servizio anche in caso di guasto di uno dei 2 nodi.


Obiettivi :

0.Progettazione della rete
  
  - 0.1 Definizione della topologia logica
  - 0.2 Piano di indirizzamento (VLSM)
  - 0.3 Asset inventory

1.Configurazione switch

  - 1.1 Hardening - AAA, SSH, Gestione porte non utilizzate, Port Security
  - 1.2 Configurazione VTP + Port Channel
  - 1.3 Configurazione STP
  - 1.4 Verifica configurazione Ethernet Channel (LACP)


2.Configurazione firewall (FortiGate)

  - 2.1 Routing (subinterface VLAN, routing inter VLAN)
  - 2.2 Firewall Policy (regole di traffico tra i segmenti)
  - 2.3 DHCP sul firewall
  - 2.4 Alta Affidabilità (cluster HA Active-Passive, unicast heartbeat)


3.Configurazione Windows Server

  - 3.1 Definizione Active Directory (foresta/dominio)
  - 3.2 Domain Controller (DNS integrato)
  - 3.3 GPO 'Group Policy Object' - criteri applicati ai client di dominio


4.Deployment client

  - 4.1 Creazione VM Master Windows 11 Enterprice
  - 4.2 Clonazione e generalizazzione (Sysprep) per i 3 endpoint
  - 4.3 Join al dominio e verifica GPO applicate


5.Validazione e collaudo

  - 5.1 Test connettività
  - 5.2 Verifica risoluzione DNS interna
  - 5.3 Verifica lease DHCP attivi per VLAN
  - 5.4 Test failover HA (Simulazione guasto nodo primario)
  - 5.5 Verifica autenticazione dominio da più client


6.Documentazione

  - 6.1 Readme.md panoramica progetto
  - 6.2 Documento HTML/CSS tracciamento dettagliato di ogni fase



Prerequisiti :

GNS3 + GNS3VM
VMWare Workstation
2 licenze Fortigate VM
ISO Windows Server 2022
ISO Windows 11 
IOS Cisco Switch 'I86bi_Linux-L2-IPBASEC9-15.1G.bin
FortiGate-VM64-KVM v7.6.7 build3704 (GA.M)