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
    },
    {
      "title": "IPv4 - Exercícios",
      "file": "materiais/IPv4 - Exercícios.pptx",
      "summary": "Slides originais com exercícios de cálculo IPv4: rede, primeiro válido, último válido, broadcast e próxima rede."
    },
    {
      "title": "Exercício VLSM",
      "file": "materiais/Exercício VLSM.pptx",
      "summary": "Slides originais com exercícios VLSM básicos e com gateway por VLAN."
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
        "sourceHtml": "WhatsApp Image 2026-05-31 at 18.28.13 (1).jpeg",
        "prompt": "O IP é um protocolo de Internet que atua na camada de rede e é responsável pelo endereçamento dos dispositivos. O IP na versão 4, que ainda é a mais utilizada, comporta 32 bits, dividindo-se em bits que apontam para a rede e bits que apontam para os dispositivos. Essa lógica é determinada pelo prefixo ou pela máscara de sub-rede. Considere uma rede cuja faixa de IP disponibilizada seja 172.31.10.0/25 e observe as seguintes afirmações:\n\nI. Essa rede possui um range de 126 endereços a serem atribuídos aos seus hosts (dispositivos).\nII. O endereço de rede é 172.31.10.0, e o endereço de broadcast é 172.31.10.127.\nIII. Sua máscara de rede é 255.255.255.128, o que equivale em binário a 11111111.11111111.11111111.10000000.\nIV. O primeiro número de IP é o 172.31.10.1, e o último número de IP é o 172.31.10.128.\n\nÉ CORRETO o que se afirma em:\nA) I e IV, apenas.\nB) II e III, apenas.\nC) III e IV, apenas.\nD) I, II e III, apenas.\nE) I, II, III e IV.",
        "answer": "D) I, II e III, apenas.",
        "solution": "O prefixo /25 deixa 7 bits para host. Logo existem 2^7 = 128 endereços totais e 126 hosts úteis. A rede é 172.31.10.0, o primeiro host é 172.31.10.1, o último host válido é 172.31.10.126 e o broadcast é 172.31.10.127. A máscara 255.255.255.128 corresponde a 11111111.11111111.11111111.10000000. A IV erra ao dizer que 172.31.10.128 é o último IP válido; esse endereço já pertence à próxima rede."
    },
    {
        "id": "simulado-estatico-dinamico",
        "category": "Simulado N2",
        "title": "Roteamento estático vs dinâmico",
        "sourceHtml": "WhatsApp Image 2026-05-31 at 18.28.13.jpeg",
        "prompt": "A equipe de TI de uma empresa de refrigerantes está configurando sua rede de computadores e conexão com a rede global (Internet). Alguns técnicos se manifestam favoráveis a montar a tabela de roteamento dinamicamente e outros preferem que a tabela de roteamento seja estática.\n\nConsiderando as alegações feitas pelos técnicos, julgue os itens a seguir.\n\nI. Caio é favorável ao roteamento dinâmico e afirma que o roteamento estático é definido de forma manual, portanto, não necessariamente levará em conta se o próximo roteador na rota está sobrecarregado.\n\nII. Pedro, adepto ao roteamento estático, afirma que, no caso de uma impossibilidade de comunicação entre os roteadores, estes ficarão desinformados sobre a topologia atual da rede. Por isso, ele defende que uma boa solução é estabelecer uma comunicação direta entre esses roteadores pela definição de rotas estáticas.\n\nIII. João, que defende uma solução mista, afirma que, uma vez que exigem um esforço de cálculo de rota, as rotas estáticas demandam mais recursos de rede do que o roteamento dinâmico.\n\nÉ correto o que se afirma em:\nA) I, II e III.\nB) I e II, apenas.\nC) II e III, apenas.\nD) I, apenas.\nE) III, apenas.",
        "answer": "B) I e II, apenas.",
        "solution": "A I está correta: rota estática é manual e não considera automaticamente carga ou mudança dinâmica na rede. A II também é correta no cenário descrito: rotas estáticas diretas podem manter caminhos definidos sem depender da troca de mensagens de um protocolo dinâmico. A III está errada porque rotas estáticas não fazem cálculo dinâmico de caminho nem trocam atualizações; protocolos dinâmicos é que consomem mais CPU, memória e banda de controle."
    },
    {
        "id": "simulado-protocolos-caracteristicas",
        "category": "Simulado N2",
        "title": "TCP, IP e UDP: relacione às características",
        "sourceHtml": "WhatsApp Image 2026-05-31 at 18.28.12 (2).jpeg",
        "prompt": "Considerando o modelo de camadas presente na Internet e o relacionamento entre os protocolos presentes em cada uma delas, analise as sentenças a seguir e relacione-as aos protocolos, usando o seguinte critério:\n\n(A) TCP\n(B) IP\n(C) UDP\n\n[ ] Provê serviço de transporte não orientado para conexão à aplicação.\n[ ] Provê à aplicação serviço de transporte orientado para conexão.\n[ ] Provê comunicação lógica entre hospedeiros, mas sem garantia de entrega.\n[ ] Provê serviço de transporte confiável à aplicação.\n[ ] Provê um modelo de serviço de entrega de melhor esforço entre hospedeiros.\n[ ] Provê serviço de transporte não confiável à aplicação.\n\nA sequência CORRETA é a seguinte:\nA) B, C, A, A, C, B\nB) C, C, A, C, B, A\nC) A, B, A, C, C, A\nD) C, A, B, A, B, C\nE) A, C, B, C, B, A",
        "answer": "D) C, A, B, A, B, C.",
        "solution": "UDP é transporte não orientado à conexão e não confiável, portanto aparece na primeira e na última lacuna. TCP é transporte orientado à conexão e confiável para a aplicação, logo ocupa a segunda e a quarta lacuna. IP fornece comunicação lógica entre hospedeiros e opera com melhor esforço, sem garantia de entrega, então ocupa a terceira e a quinta lacuna. A sequência é C, A, B, A, B, C."
    },
    {
        "id": "simulado-ipv4-64-bits",
        "category": "Simulado N2",
        "title": "IPv4 funciona como identificador de 64 bits?",
        "sourceHtml": "WhatsApp Image 2026-05-31 at 18.28.12 (2).jpeg",
        "prompt": "A respeito de arquitetura de rede TCP/IP, julgue o item a seguir.\n\nO IPv4 funciona como identificador de 64 bits utilizado para identificar dispositivos em uma rede.\n\n( ) Certo\n( ) Errado",
        "answer": "Errado.",
        "solution": "IPv4 possui 32 bits, não 64. Ele é escrito em quatro octetos decimais, como 192.168.1.10, e a separação entre rede e host depende da máscara ou prefixo CIDR. Quem possui 128 bits é o IPv6. Portanto o item deve ser marcado como Errado."
    },
    {
        "id": "ipv4-quatro-dispositivos-26",
        "category": "IPv4",
        "title": "Quatro dispositivos com /26",
        "sourceHtml": "WhatsApp Image 2026-05-31 at 18.28.12 (2).jpeg",
        "prompt": "Quatro dispositivos estão conectados à rede de uma organização e estão com os seguintes endereços IP:\n\ndispositivo A - 192.168.1.50/26;\ndispositivo B - 192.168.1.80/26;\ndispositivo C - 192.168.2.135/26; e\ndispositivo D - 192.168.2.185/26.\n\nAssinale a opção que descreve corretamente as sub-redes desses dispositivos.\n\nAlternativas:\nA) Todos os dispositivos estão na mesma sub-rede.\nB) Os dispositivos A e B estão na mesma sub-rede, enquanto os dispositivos C e D estão em sub-redes diferentes.\nC) Os dispositivos A e B estão em uma mesma sub-rede, enquanto os dispositivos C e D estão ambos em outra sub-rede.\nD) Os dispositivos A e B estão em sub-redes diferentes, enquanto os dispositivos C e D estão na mesma sub-rede.\nE) Todos os dispositivos estão em sub-redes diferentes.",
        "answer": "D) Os dispositivos A e B estão em sub-redes diferentes, enquanto C e D estão na mesma sub-rede.",
        "solution": "Com /26, o bloco é 64 endereços: .0-.63, .64-.127, .128-.191 e .192-.255 dentro de cada /24. O A 192.168.1.50 fica em 192.168.1.0/26. O B 192.168.1.80 fica em 192.168.1.64/26. Portanto A e B estão em sub-redes diferentes. O C 192.168.2.135 e o D 192.168.2.185 ficam no bloco 192.168.2.128/26, então estão na mesma sub-rede."
    },
    {
        "id": "simulado-definicao-ip",
        "category": "Simulado N2",
        "title": "Como podemos definir um endereço IP?",
        "sourceHtml": "WhatsApp Image 2026-05-31 at 18.28.12 (1).jpeg",
        "prompt": "Como podemos definir um endereço IP?\n\nAlternativas:\nA) Uma identificação criptografada única de um computador na rede local.\nB) Um código de barras utilizado para identificar dispositivos de rede.\nC) Um número que identifica um dispositivo na rede.\nD) Uma senha utilizada para autenticação em uma rede.\nE) Um dispositivo de armazenamento.",
        "answer": "C) Um número que identifica um dispositivo na rede.",
        "solution": "Um endereço IP identifica logicamente um dispositivo ou interface em uma rede IP. Ele não é senha, código de barras, armazenamento nem identificação criptografada. Em IPv4, esse número possui 32 bits e é escrito em quatro octetos decimais; em IPv6, possui 128 bits e é escrito em hexadecimal."
    },
    {
        "id": "ipv4-209-98-85-145-28",
        "category": "IPv4",
        "title": "Tendo o endereço 209.98.85.145/28 como base",
        "sourceHtml": "WhatsApp Image 2026-05-31 at 18.28.12 (1).jpeg",
        "prompt": "Endereço: 209.98.85.145/28\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 209.98.85.144, 1º IP válido 209.98.85.145, último IP válido 209.98.85.158, broadcast 209.98.85.159, próxima rede 209.98.85.160, máscara 255.255.255.240, hosts úteis 14.",
        "solution": "O prefixo /28 deixa 4 bits para host. A máscara decimal é 255.255.255.240 e o bloco tem 16 endereços. O endereço 209.98.85.145 cai na rede 209.98.85.144/28. A faixa válida começa em 209.98.85.145 e termina em 209.98.85.158. O broadcast é 209.98.85.159; o próximo bloco começa em 209.98.85.160."
    },
    {
        "id": "ipv4-172-16-20-0-16",
        "category": "IPv4",
        "title": "Tendo o endereço 172.16.20.0/16 como base",
        "sourceHtml": "WhatsApp Image 2026-05-31 at 18.28.12 (1).jpeg",
        "prompt": "Endereço: 172.16.20.0/16\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 172.16.0.0, 1º IP válido 172.16.0.1, último IP válido 172.16.255.254, broadcast 172.16.255.255, próxima rede 172.17.0.0, máscara 255.255.0.0, hosts úteis 65534.",
        "solution": "O prefixo /16 deixa 16 bits para host. A máscara decimal é 255.255.0.0 e o bloco tem 65536 endereços. O endereço 172.16.20.0 cai na rede 172.16.0.0/16. A faixa válida começa em 172.16.0.1 e termina em 172.16.255.254. O broadcast é 172.16.255.255; o próximo bloco começa em 172.17.0.0."
    },
    {
        "id": "questao-aberta-rotas-estaticas-dinamicas",
        "category": "Simulado N2",
        "title": "Vantagens e desvantagens de rotas estáticas e dinâmicas",
        "sourceHtml": "WhatsApp Image 2026-05-31 at 18.28.12.jpeg",
        "prompt": "Imagine que você é um administrador de rede responsável por configurar a infraestrutura de rede de uma empresa de médio porte. A rede da empresa é composta por vários sub-redes que precisam se comunicar entre si de maneira eficiente e segura. Você tem a opção de configurar rotas estáticas ou implementar um protocolo de roteamento dinâmico para gerenciar o tráfego de dados entre essas sub-redes.\n\nRotas estáticas são configuradas manualmente e permanecem fixas, a menos que sejam alteradas manualmente. Por outro lado, protocolos de roteamento dinâmico, como OSPF (Open Shortest Path First) ou RIP (Routing Information Protocol), ajustam automaticamente as rotas com base nas condições atuais da rede, como mudanças na topologia ou falhas de rede.\n\nConsiderando esse cenário, quais são as vantagens e desvantagens de usar rotas estáticas e rotas dinâmicas para gerenciar o tráfego de rede em sua empresa?",
        "answer": "Rotas estáticas são simples e previsíveis; rotas dinâmicas se adaptam melhor a mudanças, mas consomem mais recursos e exigem configuração cuidadosa.",
        "solution": "Rotas estáticas têm como vantagens simplicidade, previsibilidade, baixo consumo de CPU/banda e controle explícito do caminho. Como desvantagens, não se adaptam automaticamente a falhas e exigem manutenção manual em redes maiores. Rotas dinâmicas, como OSPF e RIP, aprendem caminhos e reagem a mudanças de topologia, sendo melhores para ambientes maiores ou mutáveis. Em troca, exigem planejamento, podem convergir com atraso, consomem recursos e precisam de segurança para evitar anúncios indevidos."
    },
    {
        "id": "ipv4-pptx-208-90-85-145-28",
        "category": "IPv4",
        "title": "Calcule 208.90.85.145/28",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 208.90.85.145/28\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 208.90.85.144, 1º IP válido 208.90.85.145, último IP válido 208.90.85.158, broadcast 208.90.85.159, próxima rede 208.90.85.160, máscara 255.255.255.240, hosts úteis 14.",
        "solution": "O prefixo /28 deixa 4 bits para host. A máscara decimal é 255.255.255.240 e o bloco tem 16 endereços. O endereço 208.90.85.145 cai na rede 208.90.85.144/28. A faixa válida começa em 208.90.85.145 e termina em 208.90.85.158. O broadcast é 208.90.85.159; o próximo bloco começa em 208.90.85.160."
    },
    {
        "id": "ipv4-pptx-188-57-121-200-26",
        "category": "IPv4",
        "title": "Calcule 188.57.121.200/26",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 188.57.121.200/26\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 188.57.121.192, 1º IP válido 188.57.121.193, último IP válido 188.57.121.254, broadcast 188.57.121.255, próxima rede 188.57.122.0, máscara 255.255.255.192, hosts úteis 62.",
        "solution": "O prefixo /26 deixa 6 bits para host. A máscara decimal é 255.255.255.192 e o bloco tem 64 endereços. O endereço 188.57.121.200 cai na rede 188.57.121.192/26. A faixa válida começa em 188.57.121.193 e termina em 188.57.121.254. O broadcast é 188.57.121.255; o próximo bloco começa em 188.57.122.0."
    },
    {
        "id": "ipv4-pptx-177-89-100-205-27",
        "category": "IPv4",
        "title": "Calcule 177.89.100.205/27",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 177.89.100.205/27\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 177.89.100.192, 1º IP válido 177.89.100.193, último IP válido 177.89.100.222, broadcast 177.89.100.223, próxima rede 177.89.100.224, máscara 255.255.255.224, hosts úteis 30.",
        "solution": "O prefixo /27 deixa 5 bits para host. A máscara decimal é 255.255.255.224 e o bloco tem 32 endereços. O endereço 177.89.100.205 cai na rede 177.89.100.192/27. A faixa válida começa em 177.89.100.193 e termina em 177.89.100.222. O broadcast é 177.89.100.223; o próximo bloco começa em 177.89.100.224."
    },
    {
        "id": "ipv4-pptx-215-180-23-140-25",
        "category": "IPv4",
        "title": "Calcule 215.180.23.140/25",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 215.180.23.140/25\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 215.180.23.128, 1º IP válido 215.180.23.129, último IP válido 215.180.23.254, broadcast 215.180.23.255, próxima rede 215.180.24.0, máscara 255.255.255.128, hosts úteis 126.",
        "solution": "O prefixo /25 deixa 7 bits para host. A máscara decimal é 255.255.255.128 e o bloco tem 128 endereços. O endereço 215.180.23.140 cai na rede 215.180.23.128/25. A faixa válida começa em 215.180.23.129 e termina em 215.180.23.254. O broadcast é 215.180.23.255; o próximo bloco começa em 215.180.24.0."
    },
    {
        "id": "ipv4-pptx-200-98-178-100-19",
        "category": "IPv4",
        "title": "Calcule 200.98.178.100/19",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 200.98.178.100/19\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 200.98.160.0, 1º IP válido 200.98.160.1, último IP válido 200.98.191.254, broadcast 200.98.191.255, próxima rede 200.98.192.0, máscara 255.255.224.0, hosts úteis 8190.",
        "solution": "O prefixo /19 deixa 13 bits para host. A máscara decimal é 255.255.224.0 e o bloco tem 8192 endereços. O endereço 200.98.178.100 cai na rede 200.98.160.0/19. A faixa válida começa em 200.98.160.1 e termina em 200.98.191.254. O broadcast é 200.98.191.255; o próximo bloco começa em 200.98.192.0."
    },
    {
        "id": "ipv4-pptx-201-50-79-157-24",
        "category": "IPv4",
        "title": "Calcule 201.50.79.157/24",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 201.50.79.157/24\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 201.50.79.0, 1º IP válido 201.50.79.1, último IP válido 201.50.79.254, broadcast 201.50.79.255, próxima rede 201.50.80.0, máscara 255.255.255.0, hosts úteis 254.",
        "solution": "O prefixo /24 deixa 8 bits para host. A máscara decimal é 255.255.255.0 e o bloco tem 256 endereços. O endereço 201.50.79.157 cai na rede 201.50.79.0/24. A faixa válida começa em 201.50.79.1 e termina em 201.50.79.254. O broadcast é 201.50.79.255; o próximo bloco começa em 201.50.80.0."
    },
    {
        "id": "ipv4-pptx-178-87-148-135-25",
        "category": "IPv4",
        "title": "Calcule 178.87.148.135/25",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 178.87.148.135/25\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 178.87.148.128, 1º IP válido 178.87.148.129, último IP válido 178.87.148.254, broadcast 178.87.148.255, próxima rede 178.87.149.0, máscara 255.255.255.128, hosts úteis 126.",
        "solution": "O prefixo /25 deixa 7 bits para host. A máscara decimal é 255.255.255.128 e o bloco tem 128 endereços. O endereço 178.87.148.135 cai na rede 178.87.148.128/25. A faixa válida começa em 178.87.148.129 e termina em 178.87.148.254. O broadcast é 178.87.148.255; o próximo bloco começa em 178.87.149.0."
    },
    {
        "id": "ipv4-pptx-189-251-75-89-26",
        "category": "IPv4",
        "title": "Calcule 189.251.75.89/26",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 189.251.75.89/26\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 189.251.75.64, 1º IP válido 189.251.75.65, último IP válido 189.251.75.126, broadcast 189.251.75.127, próxima rede 189.251.75.128, máscara 255.255.255.192, hosts úteis 62.",
        "solution": "O prefixo /26 deixa 6 bits para host. A máscara decimal é 255.255.255.192 e o bloco tem 64 endereços. O endereço 189.251.75.89 cai na rede 189.251.75.64/26. A faixa válida começa em 189.251.75.65 e termina em 189.251.75.126. O broadcast é 189.251.75.127; o próximo bloco começa em 189.251.75.128."
    },
    {
        "id": "ipv4-pptx-168-125-97-110-27",
        "category": "IPv4",
        "title": "Calcule 168.125.97.110/27",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 168.125.97.110/27\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 168.125.97.96, 1º IP válido 168.125.97.97, último IP válido 168.125.97.126, broadcast 168.125.97.127, próxima rede 168.125.97.128, máscara 255.255.255.224, hosts úteis 30.",
        "solution": "O prefixo /27 deixa 5 bits para host. A máscara decimal é 255.255.255.224 e o bloco tem 32 endereços. O endereço 168.125.97.110 cai na rede 168.125.97.96/27. A faixa válida começa em 168.125.97.97 e termina em 168.125.97.126. O broadcast é 168.125.97.127; o próximo bloco começa em 168.125.97.128."
    },
    {
        "id": "ipv4-pptx-154-241-87-203-28",
        "category": "IPv4",
        "title": "Calcule 154.241.87.203/28",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 154.241.87.203/28\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 154.241.87.192, 1º IP válido 154.241.87.193, último IP válido 154.241.87.206, broadcast 154.241.87.207, próxima rede 154.241.87.208, máscara 255.255.255.240, hosts úteis 14.",
        "solution": "O prefixo /28 deixa 4 bits para host. A máscara decimal é 255.255.255.240 e o bloco tem 16 endereços. O endereço 154.241.87.203 cai na rede 154.241.87.192/28. A faixa válida começa em 154.241.87.193 e termina em 154.241.87.206. O broadcast é 154.241.87.207; o próximo bloco começa em 154.241.87.208."
    },
    {
        "id": "ipv4-pptx-225-46-72-149-29",
        "category": "IPv4",
        "title": "Calcule 225.46.72.149/29",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 225.46.72.149/29\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 225.46.72.144, 1º IP válido 225.46.72.145, último IP válido 225.46.72.150, broadcast 225.46.72.151, próxima rede 225.46.72.152, máscara 255.255.255.248, hosts úteis 6.",
        "solution": "O prefixo /29 deixa 3 bits para host. A máscara decimal é 255.255.255.248 e o bloco tem 8 endereços. O endereço 225.46.72.149 cai na rede 225.46.72.144/29. A faixa válida começa em 225.46.72.145 e termina em 225.46.72.150. O broadcast é 225.46.72.151; o próximo bloco começa em 225.46.72.152."
    },
    {
        "id": "ipv4-pptx-177-225-78-81-30",
        "category": "IPv4",
        "title": "Calcule 177.225.78.81/30",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 177.225.78.81/30\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 177.225.78.80, 1º IP válido 177.225.78.81, último IP válido 177.225.78.82, broadcast 177.225.78.83, próxima rede 177.225.78.84, máscara 255.255.255.252, hosts úteis 2.",
        "solution": "O prefixo /30 deixa 2 bits para host. A máscara decimal é 255.255.255.252 e o bloco tem 4 endereços. O endereço 177.225.78.81 cai na rede 177.225.78.80/30. A faixa válida começa em 177.225.78.81 e termina em 177.225.78.82. O broadcast é 177.225.78.83; o próximo bloco começa em 177.225.78.84."
    },
    {
        "id": "ipv4-pptx-128-174-200-189-23",
        "category": "IPv4",
        "title": "Calcule 128.174.200.189/23",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 128.174.200.189/23\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 128.174.200.0, 1º IP válido 128.174.200.1, último IP válido 128.174.201.254, broadcast 128.174.201.255, próxima rede 128.174.202.0, máscara 255.255.254.0, hosts úteis 510.",
        "solution": "O prefixo /23 deixa 9 bits para host. A máscara decimal é 255.255.254.0 e o bloco tem 512 endereços. O endereço 128.174.200.189 cai na rede 128.174.200.0/23. A faixa válida começa em 128.174.200.1 e termina em 128.174.201.254. O broadcast é 128.174.201.255; o próximo bloco começa em 128.174.202.0."
    },
    {
        "id": "ipv4-pptx-203-81-223-78-20",
        "category": "IPv4",
        "title": "Calcule 203.81.223.78/20",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 203.81.223.78/20\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 203.81.208.0, 1º IP válido 203.81.208.1, último IP válido 203.81.223.254, broadcast 203.81.223.255, próxima rede 203.81.224.0, máscara 255.255.240.0, hosts úteis 4094.",
        "solution": "O prefixo /20 deixa 12 bits para host. A máscara decimal é 255.255.240.0 e o bloco tem 4096 endereços. O endereço 203.81.223.78 cai na rede 203.81.208.0/20. A faixa válida começa em 203.81.208.1 e termina em 203.81.223.254. O broadcast é 203.81.223.255; o próximo bloco começa em 203.81.224.0."
    },
    {
        "id": "ipv4-pptx-148-95-123-58-14",
        "category": "IPv4",
        "title": "Calcule 148.95.123.58/14",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 148.95.123.58/14\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 148.92.0.0, 1º IP válido 148.92.0.1, último IP válido 148.95.255.254, broadcast 148.95.255.255, próxima rede 148.96.0.0, máscara 255.252.0.0, hosts úteis 262142.",
        "solution": "O prefixo /14 deixa 18 bits para host. A máscara decimal é 255.252.0.0 e o bloco tem 262144 endereços. O endereço 148.95.123.58 cai na rede 148.92.0.0/14. A faixa válida começa em 148.92.0.1 e termina em 148.95.255.254. O broadcast é 148.95.255.255; o próximo bloco começa em 148.96.0.0."
    },
    {
        "id": "ipv4-pptx-167-201-47-85-10",
        "category": "IPv4",
        "title": "Calcule 167.201.47.85/10",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 167.201.47.85/10\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 167.192.0.0, 1º IP válido 167.192.0.1, último IP válido 167.255.255.254, broadcast 167.255.255.255, próxima rede 168.0.0.0, máscara 255.192.0.0, hosts úteis 4194302.",
        "solution": "O prefixo /10 deixa 22 bits para host. A máscara decimal é 255.192.0.0 e o bloco tem 4194304 endereços. O endereço 167.201.47.85 cai na rede 167.192.0.0/10. A faixa válida começa em 167.192.0.1 e termina em 167.255.255.254. O broadcast é 167.255.255.255; o próximo bloco começa em 168.0.0.0."
    },
    {
        "id": "ipv4-pptx-225-91-158-98-7",
        "category": "IPv4",
        "title": "Calcule 225.91.158.98/7",
        "sourceHtml": "IPv4 - Exercícios.pptx",
        "prompt": "Endereço: 225.91.158.98/7\nPreencha os campos solicitados no exercício:\nRede:\n1º IP válido:\nÚltimo IP válido:\nBroadcast:\nPróxima rede:\nTambém confira a máscara decimal e a quantidade de hosts úteis do prefixo.",
        "answer": "Rede 224.0.0.0, 1º IP válido 224.0.0.1, último IP válido 225.255.255.254, broadcast 225.255.255.255, próxima rede 226.0.0.0, máscara 254.0.0.0, hosts úteis 33554430.",
        "solution": "O prefixo /7 deixa 25 bits para host. A máscara decimal é 254.0.0.0 e o bloco tem 33554432 endereços. O endereço 225.91.158.98 cai na rede 224.0.0.0/7. A faixa válida começa em 224.0.0.1 e termina em 225.255.255.254. O broadcast é 225.255.255.255; o próximo bloco começa em 226.0.0.0."
    },
    {
        "id": "vlsm-pptx-a1000-b200-c50-d10-e2",
        "category": "VLSM básico",
        "title": "VLANs A=1000, B=200, C=50, D=10, E=2",
        "sourceHtml": "Exercício VLSM.pptx",
        "prompt": "Rede base: 10.0.0.0/8\nComplete a tabela do exercício com Endereço de Rede / Máscara para cada rede, usando VLSM de forma otimizada.\n\nRede | Hosts | Endereço de Rede / Máscara\nVLAN A: 1000 hosts\nVLAN B: 200 hosts\nVLAN C: 50 hosts\nVLAN D: 10 hosts\nVLAN E: 2 hosts",
        "answer": "VLAN A: 10.0.0.0/22 | máscara 255.255.252.0 | broadcast 10.0.3.255 | hosts úteis 1022\nVLAN B: 10.0.4.0/24 | máscara 255.255.255.0 | broadcast 10.0.4.255 | hosts úteis 254\nVLAN C: 10.0.5.0/26 | máscara 255.255.255.192 | broadcast 10.0.5.63 | hosts úteis 62\nVLAN D: 10.0.5.64/28 | máscara 255.255.255.240 | broadcast 10.0.5.79 | hosts úteis 14\nVLAN E: 10.0.5.80/30 | máscara 255.255.255.252 | broadcast 10.0.5.83 | hosts úteis 2",
        "solution": "Ordene as redes da maior demanda para a menor e escolha o menor prefixo que comporta hosts + 2 endereços. Depois aloque blocos contíguos sem sobreposição a partir de 10.0.0.0/8. Resultado:\nVLAN A: 10.0.0.0/22 | máscara 255.255.252.0 | broadcast 10.0.3.255 | hosts úteis 1022\nVLAN B: 10.0.4.0/24 | máscara 255.255.255.0 | broadcast 10.0.4.255 | hosts úteis 254\nVLAN C: 10.0.5.0/26 | máscara 255.255.255.192 | broadcast 10.0.5.63 | hosts úteis 62\nVLAN D: 10.0.5.64/28 | máscara 255.255.255.240 | broadcast 10.0.5.79 | hosts úteis 14\nVLAN E: 10.0.5.80/30 | máscara 255.255.255.252 | broadcast 10.0.5.83 | hosts úteis 2"
    },
    {
        "id": "vlsm-pptx-a30000-b2000-c500-d100-e25",
        "category": "VLSM básico",
        "title": "VLANs A=30000, B=2000, C=500, D=100, E=25",
        "sourceHtml": "Exercício VLSM.pptx",
        "prompt": "Rede base: 172.16.0.0/16\nComplete a tabela do exercício com Endereço de Rede / Máscara para cada rede, usando VLSM de forma otimizada.\n\nRede | Hosts | Endereço de Rede / Máscara\nVLAN A: 30000 hosts\nVLAN B: 2000 hosts\nVLAN C: 500 hosts\nVLAN D: 100 hosts\nVLAN E: 25 hosts",
        "answer": "VLAN A: 172.16.0.0/17 | máscara 255.255.128.0 | broadcast 172.16.127.255 | hosts úteis 32766\nVLAN B: 172.16.128.0/21 | máscara 255.255.248.0 | broadcast 172.16.135.255 | hosts úteis 2046\nVLAN C: 172.16.136.0/23 | máscara 255.255.254.0 | broadcast 172.16.137.255 | hosts úteis 510\nVLAN D: 172.16.138.0/25 | máscara 255.255.255.128 | broadcast 172.16.138.127 | hosts úteis 126\nVLAN E: 172.16.138.128/27 | máscara 255.255.255.224 | broadcast 172.16.138.159 | hosts úteis 30",
        "solution": "Ordene as redes da maior demanda para a menor e escolha o menor prefixo que comporta hosts + 2 endereços. Depois aloque blocos contíguos sem sobreposição a partir de 172.16.0.0/16. Resultado:\nVLAN A: 172.16.0.0/17 | máscara 255.255.128.0 | broadcast 172.16.127.255 | hosts úteis 32766\nVLAN B: 172.16.128.0/21 | máscara 255.255.248.0 | broadcast 172.16.135.255 | hosts úteis 2046\nVLAN C: 172.16.136.0/23 | máscara 255.255.254.0 | broadcast 172.16.137.255 | hosts úteis 510\nVLAN D: 172.16.138.0/25 | máscara 255.255.255.128 | broadcast 172.16.138.127 | hosts úteis 126\nVLAN E: 172.16.138.128/27 | máscara 255.255.255.224 | broadcast 172.16.138.159 | hosts úteis 30"
    },
    {
        "id": "vlsm-pptx-a1800-b450-c180-d38-e12",
        "category": "VLSM básico",
        "title": "VLANs A=1800, B=450, C=180, D=38, E=12",
        "sourceHtml": "Exercício VLSM.pptx",
        "prompt": "Rede base: 192.168.0.0/16\nComplete a tabela do exercício com Endereço de Rede / Máscara para cada rede, usando VLSM de forma otimizada.\n\nRede | Hosts | Endereço de Rede / Máscara\nVLAN A: 1800 hosts\nVLAN B: 450 hosts\nVLAN C: 180 hosts\nVLAN D: 38 hosts\nVLAN E: 12 hosts",
        "answer": "VLAN A: 192.168.0.0/21 | máscara 255.255.248.0 | broadcast 192.168.7.255 | hosts úteis 2046\nVLAN B: 192.168.8.0/23 | máscara 255.255.254.0 | broadcast 192.168.9.255 | hosts úteis 510\nVLAN C: 192.168.10.0/24 | máscara 255.255.255.0 | broadcast 192.168.10.255 | hosts úteis 254\nVLAN D: 192.168.11.0/26 | máscara 255.255.255.192 | broadcast 192.168.11.63 | hosts úteis 62\nVLAN E: 192.168.11.64/28 | máscara 255.255.255.240 | broadcast 192.168.11.79 | hosts úteis 14",
        "solution": "Ordene as redes da maior demanda para a menor e escolha o menor prefixo que comporta hosts + 2 endereços. Depois aloque blocos contíguos sem sobreposição a partir de 192.168.0.0/16. Resultado:\nVLAN A: 192.168.0.0/21 | máscara 255.255.248.0 | broadcast 192.168.7.255 | hosts úteis 2046\nVLAN B: 192.168.8.0/23 | máscara 255.255.254.0 | broadcast 192.168.9.255 | hosts úteis 510\nVLAN C: 192.168.10.0/24 | máscara 255.255.255.0 | broadcast 192.168.10.255 | hosts úteis 254\nVLAN D: 192.168.11.0/26 | máscara 255.255.255.192 | broadcast 192.168.11.63 | hosts úteis 62\nVLAN E: 192.168.11.64/28 | máscara 255.255.255.240 | broadcast 192.168.11.79 | hosts úteis 14"
    },
    {
        "id": "vlsm-pptx-a600-b220-c100-d55-e4",
        "category": "VLSM básico",
        "title": "VLANs A=600, B=220, C=100, D=55, E=4",
        "sourceHtml": "Exercício VLSM.pptx",
        "prompt": "Rede base: 192.168.0.0/16\nComplete a tabela do exercício com Endereço de Rede / Máscara para cada rede, usando VLSM de forma otimizada.\n\nRede | Hosts | Endereço de Rede / Máscara\nVLAN A: 600 hosts\nVLAN B: 220 hosts\nVLAN C: 100 hosts\nVLAN D: 55 hosts\nVLAN E: 4 hosts",
        "answer": "VLAN A: 192.168.0.0/22 | máscara 255.255.252.0 | broadcast 192.168.3.255 | hosts úteis 1022\nVLAN B: 192.168.4.0/24 | máscara 255.255.255.0 | broadcast 192.168.4.255 | hosts úteis 254\nVLAN C: 192.168.5.0/25 | máscara 255.255.255.128 | broadcast 192.168.5.127 | hosts úteis 126\nVLAN D: 192.168.5.128/26 | máscara 255.255.255.192 | broadcast 192.168.5.191 | hosts úteis 62\nVLAN E: 192.168.5.192/29 | máscara 255.255.255.248 | broadcast 192.168.5.199 | hosts úteis 6",
        "solution": "Ordene as redes da maior demanda para a menor e escolha o menor prefixo que comporta hosts + 2 endereços. Depois aloque blocos contíguos sem sobreposição a partir de 192.168.0.0/16. Resultado:\nVLAN A: 192.168.0.0/22 | máscara 255.255.252.0 | broadcast 192.168.3.255 | hosts úteis 1022\nVLAN B: 192.168.4.0/24 | máscara 255.255.255.0 | broadcast 192.168.4.255 | hosts úteis 254\nVLAN C: 192.168.5.0/25 | máscara 255.255.255.128 | broadcast 192.168.5.127 | hosts úteis 126\nVLAN D: 192.168.5.128/26 | máscara 255.255.255.192 | broadcast 192.168.5.191 | hosts úteis 62\nVLAN E: 192.168.5.192/29 | máscara 255.255.255.248 | broadcast 192.168.5.199 | hosts úteis 6"
    },
    {
        "id": "vlsm-gateway-pptx-5500-1100-500-100",
        "category": "VLSM com gateway",
        "title": "RT_BORDER VLANs 10=5500, 20=1100, 30=500, 40=100",
        "sourceHtml": "Exercício VLSM.pptx",
        "prompt": "De acordo com a topologia, realize o cálculo de sub-rede para endereçar as VLANs conforme o número de hosts. Defina o último endereço válido para Gateway de cada VLAN conforme sua sub-rede. Utilize endereçamento base classe A privado.\n\nRede base: 10.0.0.0/8\nComplete a tabela com Endereço de Rede/Máscara, Endereço IP do Gateway e Máscara em decimal.",
        "answer": "VLAN 10: 10.0.0.0/19, gateway 10.0.31.254, máscara 255.255.224.0, broadcast 10.0.31.255\nVLAN 20: 10.0.32.0/21, gateway 10.0.39.254, máscara 255.255.248.0, broadcast 10.0.39.255\nVLAN 30: 10.0.40.0/23, gateway 10.0.41.254, máscara 255.255.254.0, broadcast 10.0.41.255\nVLAN 40: 10.0.42.0/25, gateway 10.0.42.126, máscara 255.255.255.128, broadcast 10.0.42.127",
        "solution": "Como o gateway pedido é o último endereço válido, use o endereço imediatamente anterior ao broadcast de cada sub-rede. As VLANs são alocadas da maior para a menor, respeitando o tamanho de bloco exigido pelo prefixo. A tabela preenchida abaixo mostra a rede, o gateway, a máscara decimal e o broadcast de cada VLAN.",
        "promptTable": {
            "headers": [
                "Interface",
                "Rede",
                "Hosts",
                "Endereço de Rede/Máscara",
                "Endereço IP do Gateway",
                "Máscara em decimal"
            ],
            "rows": [
                [
                    "g0/0.10",
                    "VLAN 10",
                    "5500 hosts",
                    "",
                    "",
                    ""
                ],
                [
                    "g0/0.20",
                    "VLAN 20",
                    "1100 hosts",
                    "",
                    "",
                    ""
                ],
                [
                    "g0/0.30",
                    "VLAN 30",
                    "500 hosts",
                    "",
                    "",
                    ""
                ],
                [
                    "g0/0.40",
                    "VLAN 40",
                    "100 hosts",
                    "",
                    "",
                    ""
                ]
            ]
        },
        "answerTable": {
            "headers": [
                "Interface",
                "Rede",
                "Hosts",
                "Endereço de Rede/Máscara",
                "Gateway",
                "Máscara decimal",
                "Broadcast"
            ],
            "rows": [
                [
                    "g0/0.10",
                    "VLAN 10",
                    "5500",
                    "10.0.0.0/19",
                    "10.0.31.254",
                    "255.255.224.0",
                    "10.0.31.255"
                ],
                [
                    "g0/0.20",
                    "VLAN 20",
                    "1100",
                    "10.0.32.0/21",
                    "10.0.39.254",
                    "255.255.248.0",
                    "10.0.39.255"
                ],
                [
                    "g0/0.30",
                    "VLAN 30",
                    "500",
                    "10.0.40.0/23",
                    "10.0.41.254",
                    "255.255.254.0",
                    "10.0.41.255"
                ],
                [
                    "g0/0.40",
                    "VLAN 40",
                    "100",
                    "10.0.42.0/25",
                    "10.0.42.126",
                    "255.255.255.128",
                    "10.0.42.127"
                ]
            ]
        }
    },
    {
        "id": "vlsm-gateway-pptx-300-200-50-20",
        "category": "VLSM com gateway",
        "title": "RT_BORDER VLANs 10=300, 20=200, 30=50, 40=20",
        "sourceHtml": "Exercício VLSM.pptx",
        "prompt": "De acordo com a topologia, realize o cálculo de sub-rede para endereçar as VLANs conforme o número de hosts. Defina o último endereço válido para Gateway de cada VLAN conforme sua sub-rede. Utilize endereçamento base classe A privado.\n\nRede base: 10.0.0.0/8\nComplete a tabela com Endereço de Rede/Máscara, Endereço IP do Gateway e Máscara em decimal.",
        "answer": "VLAN 10: 10.0.0.0/23, gateway 10.0.1.254, máscara 255.255.254.0, broadcast 10.0.1.255\nVLAN 20: 10.0.2.0/24, gateway 10.0.2.254, máscara 255.255.255.0, broadcast 10.0.2.255\nVLAN 30: 10.0.3.0/26, gateway 10.0.3.62, máscara 255.255.255.192, broadcast 10.0.3.63\nVLAN 40: 10.0.3.64/27, gateway 10.0.3.94, máscara 255.255.255.224, broadcast 10.0.3.95",
        "solution": "Como o gateway pedido é o último endereço válido, use o endereço imediatamente anterior ao broadcast de cada sub-rede. As VLANs são alocadas da maior para a menor, respeitando o tamanho de bloco exigido pelo prefixo. A tabela preenchida abaixo mostra a rede, o gateway, a máscara decimal e o broadcast de cada VLAN.",
        "promptTable": {
            "headers": [
                "Interface",
                "Rede",
                "Hosts",
                "Endereço de Rede/Máscara",
                "Endereço IP do Gateway",
                "Máscara em decimal"
            ],
            "rows": [
                [
                    "g0/0.10",
                    "VLAN 10",
                    "300 hosts",
                    "",
                    "",
                    ""
                ],
                [
                    "g0/0.20",
                    "VLAN 20",
                    "200 hosts",
                    "",
                    "",
                    ""
                ],
                [
                    "g0/0.30",
                    "VLAN 30",
                    "50 hosts",
                    "",
                    "",
                    ""
                ],
                [
                    "g0/0.40",
                    "VLAN 40",
                    "20 hosts",
                    "",
                    "",
                    ""
                ]
            ]
        },
        "answerTable": {
            "headers": [
                "Interface",
                "Rede",
                "Hosts",
                "Endereço de Rede/Máscara",
                "Gateway",
                "Máscara decimal",
                "Broadcast"
            ],
            "rows": [
                [
                    "g0/0.10",
                    "VLAN 10",
                    "300",
                    "10.0.0.0/23",
                    "10.0.1.254",
                    "255.255.254.0",
                    "10.0.1.255"
                ],
                [
                    "g0/0.20",
                    "VLAN 20",
                    "200",
                    "10.0.2.0/24",
                    "10.0.2.254",
                    "255.255.255.0",
                    "10.0.2.255"
                ],
                [
                    "g0/0.30",
                    "VLAN 30",
                    "50",
                    "10.0.3.0/26",
                    "10.0.3.62",
                    "255.255.255.192",
                    "10.0.3.63"
                ],
                [
                    "g0/0.40",
                    "VLAN 40",
                    "20",
                    "10.0.3.64/27",
                    "10.0.3.94",
                    "255.255.255.224",
                    "10.0.3.95"
                ]
            ]
        }
    },
    {
        "id": "vlsm-gateway-pptx-8100-4050-220-60",
        "category": "VLSM com gateway",
        "title": "RT_BORDER VLANs 10=8100, 20=4050, 30=220, 40=60",
        "sourceHtml": "Exercício VLSM.pptx",
        "prompt": "De acordo com a topologia, realize o cálculo de sub-rede para endereçar as VLANs conforme o número de hosts. Defina o último endereço válido para Gateway de cada VLAN conforme sua sub-rede. Utilize endereçamento base classe A privado.\n\nRede base: 10.0.0.0/8\nComplete a tabela com Endereço de Rede/Máscara, Endereço IP do Gateway e Máscara em decimal.",
        "answer": "VLAN 10: 10.0.0.0/19, gateway 10.0.31.254, máscara 255.255.224.0, broadcast 10.0.31.255\nVLAN 20: 10.0.32.0/20, gateway 10.0.47.254, máscara 255.255.240.0, broadcast 10.0.47.255\nVLAN 30: 10.0.48.0/24, gateway 10.0.48.254, máscara 255.255.255.0, broadcast 10.0.48.255\nVLAN 40: 10.0.49.0/26, gateway 10.0.49.62, máscara 255.255.255.192, broadcast 10.0.49.63",
        "solution": "Como o gateway pedido é o último endereço válido, use o endereço imediatamente anterior ao broadcast de cada sub-rede. As VLANs são alocadas da maior para a menor, respeitando o tamanho de bloco exigido pelo prefixo. A tabela preenchida abaixo mostra a rede, o gateway, a máscara decimal e o broadcast de cada VLAN.",
        "promptTable": {
            "headers": [
                "Interface",
                "Rede",
                "Hosts",
                "Endereço de Rede/Máscara",
                "Endereço IP do Gateway",
                "Máscara em decimal"
            ],
            "rows": [
                [
                    "g0/0.10",
                    "VLAN 10",
                    "8100 hosts",
                    "",
                    "",
                    ""
                ],
                [
                    "g0/0.20",
                    "VLAN 20",
                    "4050 hosts",
                    "",
                    "",
                    ""
                ],
                [
                    "g0/0.30",
                    "VLAN 30",
                    "220 hosts",
                    "",
                    "",
                    ""
                ],
                [
                    "g0/0.40",
                    "VLAN 40",
                    "60 hosts",
                    "",
                    "",
                    ""
                ]
            ]
        },
        "answerTable": {
            "headers": [
                "Interface",
                "Rede",
                "Hosts",
                "Endereço de Rede/Máscara",
                "Gateway",
                "Máscara decimal",
                "Broadcast"
            ],
            "rows": [
                [
                    "g0/0.10",
                    "VLAN 10",
                    "8100",
                    "10.0.0.0/19",
                    "10.0.31.254",
                    "255.255.224.0",
                    "10.0.31.255"
                ],
                [
                    "g0/0.20",
                    "VLAN 20",
                    "4050",
                    "10.0.32.0/20",
                    "10.0.47.254",
                    "255.255.240.0",
                    "10.0.47.255"
                ],
                [
                    "g0/0.30",
                    "VLAN 30",
                    "220",
                    "10.0.48.0/24",
                    "10.0.48.254",
                    "255.255.255.0",
                    "10.0.48.255"
                ],
                [
                    "g0/0.40",
                    "VLAN 40",
                    "60",
                    "10.0.49.0/26",
                    "10.0.49.62",
                    "255.255.255.192",
                    "10.0.49.63"
                ]
            ]
        }
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
