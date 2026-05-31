window.NETWORK_SITE_DATA = {
  "materials": [
    {
      "title": "Teoria pós-P1",
      "file": "materiais/redes_pos_p1_navigator.html",
      "summary": "Resumo navegável com ICMP, DHCP, NAT, IPv6, roteamento, enlace, VLSM, gerência, Wi-Fi e segurança."
    },
    {
      "title": "Roteamento estático no Packet Tracer",
      "file": "materiais/roteamento_estatico_packettracer.html",
      "summary": "Tutorial original com topologia RT1-RT2-RT3, comandos de interface, rotas estáticas e testes."
    },
    {
      "title": "Tutorial IPv4 e VLSM",
      "file": "materiais/tutorial_ipv4_vlsm.html",
      "summary": "Método passo a passo para calcular rede, broadcast, intervalo válido, prefixo e VLSM."
    },
    {
      "title": "Gabarito de exercícios",
      "file": "materiais/gabarito_exercicios_redes.html",
      "summary": "Resoluções do simulado, exercícios IPv4, VLSM básico e VLSM com gateway."
    }
  ],
  "theoryTopics": [
    {
      "slug": "icmp-dhcp-nat-ipv6",
      "title": "ICMP, DHCP, NAT e IPv6",
      "sourceHtml": "redes_pos_p1_navigator.html",
      "summary": "Bloco de camada de Internet para revisar protocolos auxiliares do IP: diagnóstico com ICMP, configuração automática com DHCP, tradução de endereços com NAT e os fundamentos de IPv6.",
      "diagram": ["Cliente", "DHCP Discover", "Servidor DHCP", "Offer/Request/Ack", "Cliente configurado"],
      "sections": [
        {
          "heading": "ICMP e diagnóstico",
          "body": "ICMP é um protocolo auxiliar do IP usado para mensagens de erro e diagnóstico. Ele não carrega dados de aplicação como HTTP ou DNS; sua função é avisar que algo aconteceu no caminho. O ping usa Echo Request e Echo Reply para testar conectividade. O traceroute explora o TTL: quando o TTL chega a zero, o roteador descarta o pacote e responde com Time Exceeded, revelando o salto do caminho."
        },
        {
          "heading": "DHCP e processo DORA",
          "body": "DHCP entrega automaticamente endereço IP, máscara, gateway padrão, DNS e tempo de concessão. O processo DORA segue Discover, Offer, Request e Acknowledge. O cliente começa sem IP e usa broadcast; por isso o Discover e parte do processo não atravessam roteadores sem ajuda. Em redes segmentadas, um DHCP Relay Agent encaminha a solicitação para o servidor correto."
        },
        {
          "heading": "NAT no limite da rede",
          "body": "NAT traduz endereços privados para endereços públicos quando os pacotes saem para a Internet. O caso mais comum é PAT, ou NAT overload, em que vários hosts internos compartilham um IP público usando portas diferentes. A tabela NAT mantém a associação entre IP interno, porta interna, IP externo e porta externa para permitir a volta correta da resposta."
        },
        {
          "heading": "IPv6 essencial",
          "body": "IPv6 usa endereços de 128 bits escritos em hexadecimal, separados por dois-pontos. A simplificação remove zeros à esquerda e permite uma única sequência :: para comprimir grupos de zeros. Endereços globais começam tipicamente com 2000::/3, link-local usam fe80::/10 e multicast começa com ff00::/8. A prova costuma cobrar leitura, simplificação e diferença em relação ao IPv4."
        }
      ]
    },
    {
      "slug": "roteamento-estatico-dinamico",
      "title": "Roteamento estático e dinâmico",
      "sourceHtml": "redes_pos_p1_navigator.html",
      "summary": "Comparação entre rotas configuradas manualmente e protocolos que aprendem caminhos automaticamente, com foco em tabela de roteamento, métrica, próximo salto e escolha de rota.",
      "diagram": ["Origem", "Tabela de roteamento", "Próximo salto", "Destino"],
      "sections": [
        {
          "heading": "Tabela de roteamento",
          "body": "A tabela de roteamento decide para onde um pacote deve ser encaminhado. Cada linha indica uma rede de destino, uma máscara ou prefixo, o próximo salto ou interface de saída e uma métrica. O roteador procura a rota de prefixo mais específico primeiro; se não houver uma rota específica, pode usar uma rota padrão 0.0.0.0/0."
        },
        {
          "heading": "Rota estática",
          "body": "Rota estática é configurada manualmente com comandos como ip route rede mascara proximo-salto. Ela é previsível, simples e não gera tráfego de atualização, mas não se adapta sozinha a falhas. Em topologias pequenas, laboratórios de Packet Tracer e cenários de prova, costuma ser a forma mais direta de demonstrar domínio de redes e gateways."
        },
        {
          "heading": "Rota dinâmica",
          "body": "Roteamento dinâmico usa protocolos que trocam informações de topologia. OSPF, RIP e EIGRP são exemplos clássicos. Esses protocolos calculam caminhos usando métrica e reagem a mudanças, mas consomem CPU, memória e banda de controle. A prova pode comparar isso com rota estática, que depende de manutenção manual."
        },
        {
          "heading": "Como responder na prova",
          "body": "Quando uma questão contrasta roteamento estático e dinâmico, procure palavras como manual, automático, métrica, carga, convergência e troca de mensagens. Rotas estáticas não escolhem caminho por carga do roteador vizinho. Protocolos dinâmicos conhecem a topologia por anúncios, mas podem ficar sem informação se a comunicação de roteamento falhar."
        }
      ]
    },
    {
      "slug": "camada-enlace-ethernet-arp",
      "title": "Camada de Enlace, Ethernet e ARP",
      "sourceHtml": "redes_pos_p1_navigator.html",
      "summary": "Fundamentos da comunicação local: controle de acesso ao meio, Ethernet, endereço MAC, quadro de enlace e ARP para descobrir o MAC associado a um IP no mesmo domínio local.",
      "diagram": ["IP destino", "ARP Request", "MAC destino", "Frame Ethernet"],
      "sections": [
        {
          "heading": "Acesso ao meio",
          "body": "A camada de enlace organiza a transmissão no enlace físico. Em Ethernet clássica, CSMA/CD detectava colisões no meio compartilhado. Em Wi-Fi, CSMA/CA tenta evitar colisões porque a estação sem fio nem sempre consegue detectar uma colisão enquanto transmite. Essa diferença é um ponto recorrente: fio detecta colisão; rádio tenta evitar."
        },
        {
          "heading": "Frame Ethernet",
          "body": "Ethernet encapsula o pacote IP dentro de um frame com MAC de destino, MAC de origem, tipo e verificação de erro. O endereço MAC identifica a interface na rede local, não a rede remota. Quando o pacote precisa atravessar roteadores, os endereços IP de origem e destino permanecem, mas o MAC muda a cada enlace."
        },
        {
          "heading": "ARP",
          "body": "ARP resolve um endereço IP para um endereço MAC dentro da rede local. Se o host precisa enviar para outro IP da mesma sub-rede, pergunta por broadcast quem tem aquele IP. Se o destino está em outra rede, ele não pergunta pelo MAC remoto; pergunta pelo MAC do gateway padrão, porque o roteador será o próximo salto."
        },
        {
          "heading": "Fluxo completo",
          "body": "Em uma comunicação entre redes diferentes, o PC verifica a máscara para saber se o destino é local. Se não for, envia o pacote IP ao gateway. Para montar o frame Ethernet, usa ARP para descobrir o MAC da interface do gateway. O roteador remove o frame, consulta sua tabela de roteamento e cria um novo frame no próximo enlace."
        }
      ]
    },
    {
      "slug": "subredes-cidr-vlsm",
      "title": "Sub-redes, CIDR e VLSM",
      "sourceHtml": "tutorial_ipv4_vlsm.html",
      "summary": "Método prático para calcular rede, broadcast, primeiro e último IP válido, quantidade de hosts úteis e divisão eficiente com VLSM em cenários com VLANs.",
      "diagram": ["IP/prefixo", "Bloco", "Rede", "Broadcast", "Hosts válidos"],
      "sections": [
        {
          "heading": "Prefixo e bits de host",
          "body": "CIDR representa a máscara pelo prefixo, como /25 ou /28. Para IPv4, bits de host são 32 menos o prefixo. A quantidade total de endereços é 2 elevado aos bits de host; hosts úteis normalmente são esse total menos 2, descontando endereço de rede e broadcast. Em /30, por exemplo, há 4 endereços e 2 hosts úteis."
        },
        {
          "heading": "Bloco e rede",
          "body": "Para encontrar a rede, identifique o octeto onde o prefixo corta e calcule o tamanho do bloco. Em /26, o bloco no quarto octeto é 64, formando redes .0, .64, .128 e .192. O endereço de rede é o múltiplo do bloco que contém o IP analisado. O broadcast é o endereço anterior ao próximo bloco."
        },
        {
          "heading": "VLSM",
          "body": "VLSM usa máscaras de tamanhos diferentes para aproveitar melhor o espaço. A regra prática é ordenar as necessidades da maior para a menor, escolher o menor prefixo que suporta cada quantidade de hosts e alocar em sequência sem sobrepor intervalos. Isso evita desperdiçar endereços em redes pequenas."
        },
        {
          "heading": "Gateway",
          "body": "Em exercícios com gateway, a rede continua sendo definida por prefixo, bloco e broadcast. O gateway é apenas um IP válido reservado para a interface do roteador ou SVI daquela VLAN. Muitas resoluções usam o primeiro IP válido como gateway; outras usam o último. O importante é não usar rede nem broadcast."
        }
      ]
    },
    {
      "slug": "gerenciamento-snmp-fcaps",
      "title": "Gerenciamento de redes, FCAPS e SNMP",
      "sourceHtml": "redes_pos_p1_navigator.html",
      "summary": "Modelo de gerenciamento de redes com FCAPS e SNMP, incluindo gerente, agente, MIB, OID e operações usadas para monitorar dispositivos.",
      "diagram": ["Gerente SNMP", "Get/Set", "Agente", "MIB/OID", "Trap"],
      "sections": [
        {
          "heading": "FCAPS",
          "body": "FCAPS é um modelo da ISO para lembrar as cinco áreas de gerência: Fault, Configuration, Accounting, Performance e Security. Em português, falhas, configuração, contabilização, desempenho e segurança. Ele ajuda a classificar tarefas como detectar indisponibilidade, alterar parâmetros, medir uso, acompanhar latência e controlar acesso."
        },
        {
          "heading": "SNMP",
          "body": "SNMP, Simple Network Management Protocol, permite monitorar e gerenciar dispositivos de rede. A arquitetura envolve um gerente, agentes instalados nos equipamentos e uma base de informações chamada MIB. Cada variável monitorável é identificada por um OID, que funciona como um caminho numérico para um dado específico."
        },
        {
          "heading": "Operações",
          "body": "As operações principais são Get, para ler uma variável, Set, para alterar quando permitido, Response, para responder ao gerente, e Trap ou Inform, para notificar eventos. Em prova, Get e Trap aparecem muito: Get é consulta ativa; Trap é alerta enviado pelo agente sem esperar uma consulta."
        },
        {
          "heading": "Ferramentas próximas",
          "body": "Gerência também envolve syslog, NetFlow, NTP, inventário, monitoramento de disponibilidade e coleta de métricas. A ideia comum é transformar eventos e medições em visibilidade operacional. Sem isso, a rede pode até funcionar, mas fica difícil provar desempenho, detectar falhas e auditar comportamento."
        }
      ]
    },
    {
      "slug": "wifi-ieee-80211",
      "title": "Wi-Fi IEEE 802.11",
      "sourceHtml": "redes_pos_p1_navigator.html",
      "summary": "Revisão dos padrões IEEE 802.11, arquitetura de redes sem fio, SSID, BSS, ESS, ponto de acesso e segurança WPA2/WPA3.",
      "diagram": ["Cliente", "SSID", "Access Point", "BSS", "Rede cabeada"],
      "sections": [
        {
          "heading": "Padrões 802.11",
          "body": "Wi-Fi segue a família IEEE 802.11. Cada geração define características de frequência, modulação, largura de canal e taxa nominal. O ponto central para a prova é entender que Wi-Fi é enlace sem fio, sujeito a interferência, alcance, compartilhamento de meio e variações de desempenho muito maiores que em Ethernet cabeada."
        },
        {
          "heading": "BSS, ESS e SSID",
          "body": "BSS é a célula básica formada por um ponto de acesso e seus clientes. ESS é o conjunto de múltiplos BSS conectados para formar uma rede maior, geralmente com o mesmo SSID. SSID é o nome lógico da rede anunciado aos clientes. O roaming acontece quando o cliente muda de ponto de acesso dentro do ESS."
        },
        {
          "heading": "CSMA/CA",
          "body": "Como o rádio não consegue detectar colisões do mesmo modo que um cabo compartilhado, Wi-Fi usa CSMA/CA para evitar colisões. A estação escuta o canal, espera intervalos aleatórios e tenta reduzir a chance de duas transmissões ocorrerem ao mesmo tempo. Isso explica por que o desempenho real é menor que a taxa nominal."
        },
        {
          "heading": "Segurança Wi-Fi",
          "body": "WPA2 e WPA3 são mecanismos de proteção para redes sem fio. WPA2 com AES ainda aparece muito em ambientes reais, enquanto WPA3 melhora a autenticação e resistência a ataques de senha. WEP é antigo e inseguro. Uma rede aberta sem criptografia expõe tráfego local e facilita ataques de interceptação."
        }
      ]
    },
    {
      "slug": "seguranca-redes",
      "title": "Segurança em redes",
      "sourceHtml": "redes_pos_p1_navigator.html",
      "summary": "Princípios de segurança aplicados a redes, principais ataques e mecanismos de defesa como firewall, VPN, IPSec, segmentação e controle de acesso.",
      "diagram": ["Ameaça", "Firewall", "VPN/IPSec", "Rede interna"],
      "sections": [
        {
          "heading": "Tríade CIA",
          "body": "Segurança da informação costuma começar pela tríade CIA: confidencialidade, integridade e disponibilidade. Confidencialidade impede acesso indevido. Integridade impede alteração não autorizada. Disponibilidade garante que o serviço continue acessível. Ataques de rede normalmente afetam um ou mais desses três pilares."
        },
        {
          "heading": "Ataques comuns",
          "body": "Entre ataques de redes estão DoS e DDoS contra disponibilidade, spoofing contra identidade, sniffing contra confidencialidade, man-in-the-middle contra integridade e confidencialidade, além de ataques a senhas e exploração de serviços expostos. A prova tende a pedir a associação entre ataque e impacto."
        },
        {
          "heading": "Defesas",
          "body": "Firewall filtra tráfego por regras. Pode operar como filtro de pacotes, stateful firewall ou proxy, dependendo do nível de inspeção. Segmentação reduz o alcance de incidentes, IDS e IPS detectam ou bloqueiam eventos, e ACLs controlam quem pode falar com quem. Boa defesa é uma combinação, não um produto isolado."
        },
        {
          "heading": "VPN e IPSec",
          "body": "VPN cria um canal protegido sobre uma rede não confiável. IPSec pode operar em modo transporte, protegendo a carga do pacote IP, ou em modo túnel, encapsulando o pacote inteiro dentro de outro pacote. Em redes corporativas, modo túnel é comum para ligar sites e proteger tráfego entre redes."
        }
      ]
    },
    {
      "slug": "packet-tracer-roteamento-estatico",
      "title": "Packet Tracer: roteamento estático",
      "sourceHtml": "roteamento_estatico_packettracer.html",
      "summary": "Tutorial prático com três roteadores em série, LANs locais, interfaces WAN, comandos Cisco IOS, rotas ip route, show ip route, ping e traceroute.",
      "diagram": ["PC1", "RT1", "RT2", "RT3", "PC3"],
      "sections": [
        {
          "heading": "Topologia",
          "body": "A prática usa três roteadores conectados em série: RT1, RT2 e RT3. Cada roteador possui uma LAN local e enlaces WAN entre vizinhos. O objetivo é fazer PC1 alcançar PC3 atravessando todos os roteadores. Isso força a criação de rotas para redes remotas e valida a tabela de roteamento."
        },
        {
          "heading": "Interfaces",
          "body": "Cada roteador precisa de hostname, endereços nas interfaces corretas e comando no shutdown. No RT2, a atenção dobra porque ele tem três interfaces: uma LAN, uma WAN para RT1 e outra WAN para RT3. Sem IP correto ou sem interface ativa, a rota pode até existir, mas o enlace não encaminha pacotes."
        },
        {
          "heading": "Rotas estáticas",
          "body": "O comando central é ip route rede mascara proximo-salto. RT1 precisa saber chegar à LAN de RT2 e à LAN de RT3 pelo próximo salto em direção ao RT2. RT3 faz o espelho em direção ao RT2. RT2 precisa conhecer as LANs das pontas. Rotas específicas deixam claro o caminho esperado."
        },
        {
          "heading": "Verificação",
          "body": "Use show ip interface brief para conferir interfaces, show ip route para conferir rotas, ping para testar conectividade e traceroute para observar o caminho. Se o ping falhar, verifique gateway dos PCs, máscara, IP das interfaces, status up/up, próximo salto e se existe rota de ida e rota de volta."
        }
      ]
    }
  ],
  "exercises": [
    {
      "id": "simulado-rede-172-31-10-25",
      "category": "Simulado N2",
      "title": "Rede 172.31.10.0/25",
      "sourceHtml": "gabarito_exercicios_redes.html",
      "prompt": "Para a rede 172.31.10.0/25, avalie as afirmações sobre quantidade de hosts úteis, endereço de rede, broadcast, máscara em binário e último IP válido.",
      "answer": "D) I, II e III, apenas.",
      "solution": "O prefixo /25 deixa 7 bits para host. Logo existem 2^7 = 128 endereços totais e 126 hosts úteis. A máscara é 255.255.255.128, com último octeto 10000000 em binário. A rede começa em 172.31.10.0 e o broadcast é 172.31.10.127. O último IP válido é 172.31.10.126, portanto qualquer afirmação dizendo que .128 é válido está errada."
    },
    {
      "id": "simulado-estatico-dinamico",
      "category": "Simulado N2",
      "title": "Roteamento estático vs dinâmico",
      "sourceHtml": "gabarito_exercicios_redes.html",
      "prompt": "Em uma empresa, três afirmações comparam roteamento estático e dinâmico. Identifique quais estão corretas considerando manutenção manual, topologia e consumo de recursos.",
      "answer": "B) I e II, apenas.",
      "solution": "Roteamento estático é configurado manualmente e não considera carga dos roteadores vizinhos, então a primeira afirmação está correta. Rotas estáticas diretas podem manter comunicação mesmo sem troca dinâmica de informações, então a segunda também está correta no cenário proposto. A terceira está errada porque quem consome mais recursos de rede e CPU é o roteamento dinâmico, por causa das mensagens de atualização e cálculo de rotas."
    },
    {
      "id": "simulado-protocolos-caracteristicas",
      "category": "Simulado N2",
      "title": "Relacionar protocolos às características",
      "sourceHtml": "gabarito_exercicios_redes.html",
      "prompt": "Relacione protocolos e conceitos de redes, como DHCP, ICMP, ARP, NAT, SNMP e roteamento, às suas funções principais.",
      "answer": "Conferir pares pela função: DHCP configura, ICMP diagnostica, ARP resolve MAC, NAT traduz, SNMP gerencia.",
      "solution": "O caminho seguro é associar cada protocolo à sua função operacional. DHCP entrega IP, máscara, gateway e DNS automaticamente. ICMP comunica erros e permite ping/traceroute. ARP descobre o endereço MAC correspondente a um IP local. NAT traduz endereços privados para públicos, muitas vezes com portas. SNMP coleta ou altera informações de gerenciamento via agente, gerente, MIB e OID."
    },
    {
      "id": "simulado-ipv4-64-bits",
      "category": "Simulado N2",
      "title": "IPv4 tem 64 bits?",
      "sourceHtml": "gabarito_exercicios_redes.html",
      "prompt": "Analise a afirmação: IPv4 funciona como identificador de 64 bits e identifica redes e hosts em uma estrutura hexadecimal.",
      "answer": "Afirmação falsa.",
      "solution": "IPv4 possui 32 bits, normalmente escritos em quatro octetos decimais, como 192.168.1.10. Quem usa 128 bits e escrita hexadecimal é o IPv6. IPv4 identifica rede e host por meio da máscara ou prefixo CIDR. Portanto a afirmação mistura características de IPv4 e IPv6 e deve ser marcada como falsa."
    },
    {
      "id": "ipv4-quatro-dispositivos-26",
      "category": "IPv4",
      "title": "Quatro dispositivos com /26",
      "sourceHtml": "gabarito_exercicios_redes.html",
      "prompt": "Dado um conjunto de quatro dispositivos com máscara /26, determine em quais sub-redes eles estão e quais são os intervalos válidos.",
      "answer": "Use blocos de 64 endereços no quarto octeto.",
      "solution": "Em /26, o bloco é 64 porque a máscara é 255.255.255.192. As redes dentro de um /24 aparecem em .0, .64, .128 e .192. Para cada IP, encontre o múltiplo de 64 imediatamente menor ou igual ao último octeto. O broadcast é o fim do bloco e os hosts válidos ficam entre rede + 1 e broadcast - 1."
    },
    {
      "id": "ipv4-209-98-85-145-28",
      "category": "IPv4",
      "title": "Calcule 209.98.85.145/28",
      "sourceHtml": "gabarito_exercicios_redes.html",
      "prompt": "Calcule rede, broadcast, primeiro IP válido, último IP válido, máscara e quantidade de hosts úteis para 209.98.85.145/28.",
      "answer": "Rede 209.98.85.144, broadcast 209.98.85.159, hosts úteis 14.",
      "solution": "O prefixo /28 deixa 4 bits de host, então há 16 endereços por bloco e 14 hosts úteis. A máscara é 255.255.255.240. Os blocos no quarto octeto são múltiplos de 16: 0, 16, 32 e assim por diante. O IP 145 cai no bloco que começa em 144. Logo a rede é 209.98.85.144, o broadcast é 209.98.85.159, o primeiro válido é .145 e o último válido é .158."
    },
    {
      "id": "ipv4-172-16-20-0-16",
      "category": "IPv4",
      "title": "Calcule 172.16.20.0/16",
      "sourceHtml": "gabarito_exercicios_redes.html",
      "prompt": "Para 172.16.20.0/16, calcule a rede real, broadcast, faixa de hosts e quantidade de hosts úteis.",
      "answer": "Rede 172.16.0.0, broadcast 172.16.255.255.",
      "solution": "Com /16, os dois primeiros octetos pertencem à rede e os dois últimos pertencem ao host. Portanto 172.16.20.0 não é a rede do bloco; é apenas um endereço dentro da rede 172.16.0.0/16. O broadcast é 172.16.255.255, o primeiro host válido é 172.16.0.1, o último é 172.16.255.254 e os hosts úteis são 2^16 - 2 = 65534."
    },
    {
      "id": "vlsm-base-10-0-0-0",
      "category": "VLSM básico",
      "title": "VLSM para VLANs com base 10.0.0.0/8",
      "sourceHtml": "gabarito_exercicios_redes.html",
      "prompt": "Calcule VLSM para uma lista de VLANs usando a rede base 10.0.0.0/8, alocando da maior necessidade de hosts para a menor.",
      "answer": "Ordene por hosts, escolha prefixos mínimos e aloque sequencialmente.",
      "solution": "A estratégia é ordenar as VLANs da maior para a menor. Para cada quantidade de hosts, encontre o menor número de bits de host que comporta hosts + 2 endereços. Depois converta para prefixo: 32 menos bits de host. A primeira rede começa em 10.0.0.0 e as próximas começam no endereço seguinte ao broadcast anterior, sempre respeitando o tamanho do bloco."
    },
    {
      "id": "vlsm-a1000-b200-c50-d10-e2",
      "category": "VLSM básico",
      "title": "VLANs A=1000, B=200, C=50, D=10, E=2",
      "sourceHtml": "gabarito_exercicios_redes.html",
      "prompt": "Divida uma rede para VLANs com 1000, 200, 50, 10 e 2 hosts, usando VLSM sem desperdiçar grandes blocos.",
      "answer": "A /22, B /24, C /26, D /28, E /30.",
      "solution": "Para 1000 hosts, 10 bits de host dão 1024 endereços e 1022 úteis, então o prefixo é /22. Para 200 hosts, /24 fornece 254 úteis. Para 50, /26 fornece 62 úteis. Para 10, /28 fornece 14 úteis. Para 2, /30 fornece exatamente 2 úteis. A alocação deve seguir essa ordem para impedir que uma rede grande fique sem espaço contíguo."
    },
    {
      "id": "vlsm-30000-2000-500-100-25",
      "category": "VLSM básico",
      "title": "VLANs A=30000, B=2000, C=500, D=100, E=25",
      "sourceHtml": "gabarito_exercicios_redes.html",
      "prompt": "Escolha prefixos adequados para VLANs de 30000, 2000, 500, 100 e 25 hosts e explique a lógica.",
      "answer": "A /17, B /21, C /23, D /25, E /27.",
      "solution": "Para 30000 hosts, 15 bits de host geram 32766 úteis, então /17. Para 2000, 11 bits geram 2046 úteis, então /21. Para 500, 9 bits geram 510 úteis, então /23. Para 100, 7 bits geram 126 úteis, então /25. Para 25, 5 bits geram 30 úteis, então /27. A lógica é sempre escolher o menor bloco que ainda comporta a demanda."
    },
    {
      "id": "vlsm-gateway-5500-1100-500-100",
      "category": "VLSM com gateway",
      "title": "VLANs 10=5500, 20=1100, 30=500, 40=100",
      "sourceHtml": "gabarito_exercicios_redes.html",
      "prompt": "Calcule VLSM para VLANs 10, 20, 30 e 40 e reserve um gateway válido para cada sub-rede.",
      "answer": "Use /19, /21, /23 e /25; gateway deve ser IP válido.",
      "solution": "Para 5500 hosts, /19 oferece 8190 úteis. Para 1100, /21 oferece 2046 úteis. Para 500, /23 oferece 510 úteis. Para 100, /25 oferece 126 úteis. Depois de definir cada rede e broadcast, escolha um gateway dentro da faixa válida, normalmente o primeiro IP de host. Nunca use o endereço de rede nem o broadcast como gateway."
    },
    {
      "id": "vlsm-gateway-300-200-50-20",
      "category": "VLSM com gateway",
      "title": "VLANs 10=300, 20=200, 30=50, 40=20",
      "sourceHtml": "gabarito_exercicios_redes.html",
      "prompt": "Faça o planejamento VLSM para quatro VLANs com gateway, preservando ordem por tamanho e evitando sobreposição.",
      "answer": "Use /23, /24, /26 e /27.",
      "solution": "A VLAN de 300 hosts precisa de /23 porque /24 só comporta 254 úteis. A VLAN de 200 hosts cabe em /24. A de 50 cabe em /26 e a de 20 cabe em /27. A alocação começa pela maior e cada próxima rede começa logo após o broadcast da anterior. O gateway pode ser o primeiro IP válido de cada bloco, desde que a regra seja mantida consistentemente."
    }
  ],
  "practiceGuides": [
    {
      "id": "packet-tracer",
      "title": "Packet Tracer: RT1-RT2-RT3",
      "sourceHtml": "roteamento_estatico_packettracer.html",
      "summary": "Configure interfaces, rotas estáticas e testes para fazer PC1 alcançar PC3 em uma topologia de três roteadores.",
      "steps": [
        {"title": "Planeje a topologia", "body": "Desenhe as três LANs, os enlaces WAN e anote IP, máscara e gateway de cada segmento antes de configurar."},
        {"title": "Configure interfaces", "body": "Em cada roteador, entre no modo de configuração, aplique ip address nas interfaces e finalize com no shutdown."},
        {"title": "Adicione rotas", "body": "Use ip route rede mascara proximo-salto para todas as redes remotas necessárias em RT1, RT2 e RT3."},
        {"title": "Teste ida e volta", "body": "Valide show ip route, ping entre PCs e traceroute para conferir se os saltos atravessam RT1, RT2 e RT3."}
      ],
      "commands": "enable\nconfigure terminal\nhostname RT1\ninterface gig0/0\n ip address 192.168.1.1 255.255.255.0\n no shutdown\nexit\nip route 192.168.3.0 255.255.255.0 10.0.12.2\nend\nshow ip route\nping 192.168.3.10"
    },
    {
      "id": "ipv4-method",
      "title": "Método IPv4 em 4 passos",
      "sourceHtml": "tutorial_ipv4_vlsm.html",
      "summary": "Use prefixo, bits de host, bloco e próximo bloco para calcular qualquer questão IPv4 comum.",
      "steps": [
        {"title": "Leia o prefixo", "body": "Calcule bits de host como 32 menos o prefixo e derive hosts úteis com 2^bits - 2."},
        {"title": "Ache o octeto relevante", "body": "Veja em qual octeto a máscara deixa de ser 255 e calcule o tamanho do bloco."},
        {"title": "Encontre a rede", "body": "Use o múltiplo do bloco que contém o IP analisado."},
        {"title": "Preencha o resto", "body": "Broadcast é o endereço anterior ao próximo bloco; faixa válida vai de rede + 1 até broadcast - 1."}
      ],
      "commands": "Exemplo: 209.98.85.145/28\nbits de host = 4\nbloco = 16\nrede = 209.98.85.144\nbroadcast = 209.98.85.159"
    },
    {
      "id": "vlsm-method",
      "title": "Método VLSM",
      "sourceHtml": "tutorial_ipv4_vlsm.html",
      "summary": "Ordene demandas por tamanho, escolha prefixos mínimos e distribua blocos contíguos sem sobreposição.",
      "steps": [
        {"title": "Ordene por hosts", "body": "Comece pela maior VLAN para garantir espaço contíguo."},
        {"title": "Escolha prefixo", "body": "Para cada VLAN, encontre o menor bloco que suporta hosts + 2 endereços."},
        {"title": "Alinhe blocos", "body": "Cada rede deve começar em um limite compatível com seu tamanho."},
        {"title": "Reserve gateway", "body": "Escolha um IP válido dentro da faixa, nunca rede ou broadcast."}
      ],
      "commands": "1000 hosts -> /22\n200 hosts -> /24\n50 hosts -> /26\n10 hosts -> /28\n2 hosts -> /30"
    }
  ],
  "tools": [
    {
      "id": "ipv4-subnet-calculator",
      "title": "Calculadora IPv4",
      "summary": "Calcule rede, broadcast, hosts úteis e intervalo válido a partir de IP e prefixo."
    },
    {
      "id": "vlsm-prefix-calculator",
      "title": "Calculadora de prefixo VLSM",
      "summary": "Descubra o menor prefixo que suporta uma quantidade de hosts."
    }
  ]
};
