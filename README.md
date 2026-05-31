# Redes de Computadores - Guia N2

Site estatico multipagina para estudar Redes de Computadores com teoria, exercicios resolvidos, pratica de Packet Tracer e calculadoras de IPv4/VLSM.

## Como visualizar

Este projeto nao precisa de build nem instalacao de dependencias.

Para testar com servidor local:

```powershell
python -m http.server 8081 --bind 127.0.0.1
```

Depois acesse:

```text
http://127.0.0.1:8081/index.html
```

## Conteudo

- ICMP, DHCP, NAT e IPv6
- Roteamento estatico e dinamico
- Camada de enlace, Ethernet, MAC e ARP
- Sub-redes, CIDR e VLSM
- Gerenciamento de redes, FCAPS e SNMP
- Wi-Fi IEEE 802.11
- Seguranca de redes, firewall, VPN e IPSec
- Tutorial de roteamento estatico no Packet Tracer
- Exercicios resolvidos de simulado, IPv4 e VLSM

## Materiais originais

Os HTMLs enviados ficam preservados em `materiais/`:

- `redes_pos_p1_navigator.html`
- `roteamento_estatico_packettracer.html`
- `tutorial_ipv4_vlsm.html`
- `gabarito_exercicios_redes.html`

## Deploy na Vercel

Use as configuracoes padrao para um projeto estatico:

- Framework Preset: `Other`
- Build Command: vazio
- Output Directory: vazio ou raiz do projeto

