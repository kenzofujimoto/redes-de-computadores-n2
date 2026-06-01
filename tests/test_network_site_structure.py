import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "assets" / "js" / "site-data.js"
CSS_FILE = ROOT / "assets" / "css" / "site.css"
JS_FILE = ROOT / "assets" / "js" / "site.js"


def load_site_data() -> dict:
    text = DATA_FILE.read_text(encoding="utf-8")
    match = re.search(r"window\.NETWORK_SITE_DATA\s*=\s*(\{.*\});\s*$", text, re.S)
    assert match, "site-data.js must assign JSON to window.NETWORK_SITE_DATA"
    return json.loads(match.group(1))


def test_static_site_shell_exists_for_vercel():
    required_files = [
        "index.html",
        "teoria/index.html",
        "exercicios/index.html",
        "pratica/index.html",
        "assets/css/site.css",
        "assets/js/site-data.js",
        "assets/js/site.js",
        "README.md",
        "vercel.json",
    ]

    for relative_path in required_files:
        assert (ROOT / relative_path).exists(), f"Missing {relative_path}"


def test_legacy_html_materials_are_preserved():
    expected = [
        "materiais/redes_pos_p1_navigator.html",
        "materiais/roteamento_estatico_packettracer.html",
        "materiais/tutorial_ipv4_vlsm.html",
        "materiais/gabarito_exercicios_redes.html",
    ]

    for relative_path in expected:
        file_path = ROOT / relative_path
        assert file_path.exists(), f"Missing legacy material: {relative_path}"
        assert file_path.stat().st_size > 10_000, f"Legacy material seems truncated: {relative_path}"


def test_legacy_pptx_exercise_materials_are_preserved():
    expected = [
        "materiais/IPv4 - Exercícios.pptx",
        "materiais/Exercício VLSM.pptx",
    ]

    for relative_path in expected:
        file_path = ROOT / relative_path
        assert file_path.exists(), f"Missing legacy material: {relative_path}"
        assert file_path.stat().st_size > 100_000, f"Legacy PPTX seems truncated: {relative_path}"


def test_home_and_pages_are_rebranded_to_networks():
    html_files = [
        ROOT / "index.html",
        ROOT / "teoria" / "index.html",
        ROOT / "exercicios" / "index.html",
        ROOT / "pratica" / "index.html",
    ]

    for file_path in html_files:
        text = file_path.read_text(encoding="utf-8")
        assert "Redes" in text
        assert "Grafos" not in text
        assert "teoria_grafos" not in text


def test_theory_topics_cover_supplied_network_content():
    data = load_site_data()
    topics = data["theoryTopics"]
    slugs = {topic["slug"] for topic in topics}
    expected_slugs = {
        "icmp-dhcp-nat-ipv6",
        "roteamento-estatico-dinamico",
        "camada-enlace-ethernet-arp",
        "subredes-cidr-vlsm",
        "gerenciamento-snmp-fcaps",
        "wifi-ieee-80211",
        "seguranca-redes",
        "packet-tracer-roteamento-estatico",
    }

    assert expected_slugs <= slugs
    assert len(topics) >= len(expected_slugs)

    for topic in topics:
        assert topic["sourceHtml"].endswith(".html")
        assert len(topic["summary"]) >= 80
        assert len(topic["sections"]) >= 3
        assert sum(len(section["body"]) for section in topic["sections"]) >= 550


def test_required_network_terms_are_present_in_theory():
    data = load_site_data()
    topics = {topic["slug"]: topic for topic in data["theoryTopics"]}
    required_terms = {
        "icmp-dhcp-nat-ipv6": ["ICMP", "ping", "traceroute", "DHCP", "DORA", "NAT", "IPv6", "link-local"],
        "roteamento-estatico-dinamico": ["tabela de roteamento", "rota estática", "rota dinâmica", "OSPF", "métrica"],
        "camada-enlace-ethernet-arp": ["CSMA/CD", "CSMA/CA", "Ethernet", "endereço MAC", "ARP"],
        "subredes-cidr-vlsm": ["CIDR", "prefixo", "broadcast", "hosts úteis", "VLSM", "gateway"],
        "gerenciamento-snmp-fcaps": ["FCAPS", "SNMP", "MIB", "OID", "Get", "Trap"],
        "wifi-ieee-80211": ["802.11", "BSS", "ESS", "SSID", "WPA2", "WPA3"],
        "seguranca-redes": ["confidencialidade", "integridade", "disponibilidade", "firewall", "VPN", "IPSec"],
        "packet-tracer-roteamento-estatico": ["RT1", "RT2", "RT3", "ip route", "show ip route", "traceroute"],
    }

    for slug, terms in required_terms.items():
        topic = topics[slug]
        text = " ".join(
            [topic["title"], topic["summary"]]
            + [f"{section['heading']} {section['body']}" for section in topic["sections"]]
        )
        for term in terms:
            assert term.lower() in text.lower(), f"{slug} missing term: {term}"


def test_exercises_cover_simulado_ipv4_and_vlsm():
    data = load_site_data()
    exercises = data["exercises"]
    categories = {exercise["category"] for exercise in exercises}

    assert {"Simulado N2", "IPv4", "VLSM básico", "VLSM com gateway"} <= categories
    assert len(exercises) >= 28

    for exercise in exercises:
        assert exercise["title"]
        assert exercise["sourceHtml"].endswith((".html", ".pptx", ".jpeg"))
        assert len(exercise["prompt"]) >= 60
        assert len(exercise["solution"]) >= 120
        assert exercise["answer"]


def test_ipv4_pptx_exercises_include_full_prompt_fields_and_answers():
    data = load_site_data()
    exercises = {exercise["id"]: exercise for exercise in data["exercises"]}
    expected = {
        "ipv4-pptx-208-90-85-145-28": {
            "network": "208.90.85.144",
            "broadcast": "208.90.85.159",
            "next": "208.90.85.160",
        },
        "ipv4-pptx-177-89-100-205-27": {
            "network": "177.89.100.192",
            "broadcast": "177.89.100.223",
            "next": "177.89.100.224",
        },
        "ipv4-pptx-200-98-178-100-19": {
            "network": "200.98.160.0",
            "broadcast": "200.98.191.255",
            "next": "200.98.192.0",
        },
        "ipv4-pptx-225-91-158-98-7": {
            "network": "224.0.0.0",
            "broadcast": "225.255.255.255",
            "next": "226.0.0.0",
        },
    }

    pptx_exercises = [
        exercise for exercise in data["exercises"]
        if exercise["sourceHtml"] == "IPv4 - Exercícios.pptx"
    ]
    assert len(pptx_exercises) >= 17

    for exercise_id, fields in expected.items():
        exercise = exercises[exercise_id]
        prompt = exercise["prompt"]
        solution_text = " ".join([exercise["answer"], exercise["solution"]])
        for label in ["Rede:", "1º IP válido:", "Último IP válido:", "Broadcast:", "Próxima rede:"]:
            assert label in prompt
        for value in fields.values():
            assert value in solution_text


def test_vlsm_pptx_exercises_include_network_gateway_and_decimal_mask():
    data = load_site_data()
    exercises = {exercise["id"]: exercise for exercise in data["exercises"]}
    expected = {
        "vlsm-pptx-a30000-b2000-c500-d100-e25": ["172.16.0.0/17", "172.16.128.0/21", "172.16.138.128/27"],
        "vlsm-pptx-a1800-b450-c180-d38-e12": ["192.168.0.0/21", "192.168.8.0/23", "192.168.11.64/28"],
        "vlsm-gateway-pptx-5500-1100-500-100": ["10.0.0.0/19", "10.0.31.254", "255.255.224.0"],
        "vlsm-gateway-pptx-8100-4050-220-60": ["10.0.32.0/20", "10.0.47.254", "255.255.240.0"],
    }

    pptx_exercises = [
        exercise for exercise in data["exercises"]
        if exercise["sourceHtml"] == "Exercício VLSM.pptx"
    ]
    assert len(pptx_exercises) >= 7

    for exercise_id, expected_values in expected.items():
        exercise = exercises[exercise_id]
        text = " ".join([exercise["prompt"], exercise["answer"], exercise["solution"]])
        assert "Endereço de Rede" in exercise["prompt"]
        for value in expected_values:
            assert value in text


def test_simulado_photo_prompts_keep_full_statements_and_alternatives():
    data = load_site_data()
    exercises = {exercise["id"]: exercise for exercise in data["exercises"]}

    q1 = exercises["simulado-rede-172-31-10-25"]["prompt"]
    for expected in ["I.", "II.", "III.", "IV.", "A)", "B)", "C)", "D)", "E)", "172.31.10.128"]:
        assert expected in q1

    q2 = exercises["simulado-estatico-dinamico"]["prompt"]
    for expected in ["Caio", "Pedro", "João", "A) I, II e III", "B) I e II, apenas"]:
        assert expected in q2

    q5 = exercises["ipv4-quatro-dispositivos-26"]["prompt"]
    for expected in ["dispositivo A - 192.168.1.50/26", "dispositivo D - 192.168.2.185/26", "E) Todos"]:
        assert expected in q5


def test_exercise_answers_are_hidden_until_solution_is_expanded():
    js = JS_FILE.read_text(encoding="utf-8")

    assert "body.append(text('div', `Resposta:" not in js
    assert "solution.append(text('div', `Resposta:" in js
    assert "solution.hidden = true" in js


def test_ipv4_and_vlsm_calculators_are_available():
    data = load_site_data()
    tools = {tool["id"]: tool for tool in data["tools"]}

    assert "ipv4-subnet-calculator" in tools
    assert "vlsm-prefix-calculator" in tools

    js = JS_FILE.read_text(encoding="utf-8")
    for expected in ["calculateSubnet", "calculatePrefixForHosts", "networkAddress", "broadcastAddress"]:
        assert expected in js


def test_sidebar_navigation_and_solution_toggles_exist():
    js = JS_FILE.read_text(encoding="utf-8")
    css = CSS_FILE.read_text(encoding="utf-8")

    for expected in ["initRailToggle", "rail-collapsed", "renderTheory", "renderExercises", "renderPractice"]:
        assert expected in js

    assert "Mostrar resolução" in js
    assert "Ocultar resolução" in js
    assert ".rail-toggle" in css
    assert ".command-block" in css


def test_vercel_rewrite_points_to_static_home():
    config = json.loads((ROOT / "vercel.json").read_text(encoding="utf-8"))
    assert config["rewrites"] == [{"source": "/", "destination": "/index.html"}]
