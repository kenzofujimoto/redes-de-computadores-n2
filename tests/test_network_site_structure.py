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
    assert len(exercises) >= 12

    for exercise in exercises:
        assert exercise["title"]
        assert exercise["sourceHtml"].endswith(".html")
        assert len(exercise["prompt"]) >= 60
        assert len(exercise["solution"]) >= 120
        assert exercise["answer"]


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
