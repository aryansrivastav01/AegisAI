import re

from app.utils.validators import (
    normalize_domain,
    remove_duplicates,
    validate_ip,
)


def extract_ips(text: str) -> list[str]:
    """
    Extract valid IPv4 addresses from text.
    """

    ip_pattern = r"\b(?:\d{1,3}\.){3}\d{1,3}\b"

    ips = re.findall(ip_pattern, text)

    valid_ips = [
        ip for ip in ips
        if validate_ip(ip)
    ]

    return remove_duplicates(valid_ips)


def extract_domains(text: str) -> list[str]:
    """
    Extract domain names from text.
    """

    domain_pattern = r"\b(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,63}\b"

    domains = re.findall(domain_pattern, text)

    normalized = []
    for domain in domains:
        if validate_ip(domain):
            continue

        normalized.append(normalize_domain(domain))

    normalized += extract_url_hosts(text)

    return remove_duplicates(normalized)


def extract_urls(text: str) -> list[str]:
    """
    Extract HTTP and HTTPS URLs.
    """

    url_pattern = r"https?://[^\s]+"

    urls = re.findall(url_pattern, text)

    return remove_duplicates(urls)


def extract_hashes(text: str) -> list[str]:
    """
    Extract MD5, SHA1 and SHA256 hashes.
    """

    hash_pattern = (
        r"\b(?:"
        r"[a-fA-F0-9]{32}|"
        r"[a-fA-F0-9]{40}|"
        r"[a-fA-F0-9]{64}"
        r")\b"
    )

    hashes = re.findall(hash_pattern, text)

    return remove_duplicates(hashes)


def extract_url_hosts(text: str) -> list[str]:
    """
    Extract hostnames from discovered URLs.
    """

    from urllib.parse import urlparse

    hosts: list[str] = []
    for url in extract_urls(text):
        parsed = urlparse(url)
        if parsed.hostname:
            host = normalize_domain(parsed.hostname)
            if not validate_ip(host):
                hosts.append(host)

    return remove_duplicates(hosts)


def extract_activity(text: str) -> list[str]:
    """
    Extract suspicious activity descriptions from raw text.
    """

    normalized_text = text.lower()
    checks = [
        (r"powershell", "PowerShell execution was observed."),
        (r"scheduled task|schtasks", "Scheduled task creation was identified."),
        (r"registry.*run|run key|runkey|hkcu.*run|hklm.*run", "Registry persistence was identified via Run keys."),
        (r"failed login|failed auth|invalid login|incorrect password|authentication failure", "Failed authentication attempts were observed."),
        (r"port scan|network scan|nmap|scan detected|scanning activity", "Network scanning activity was observed."),
        (r"malicious payload|payload.*download|downloaded.*payload|wget|curl", "Malicious payload delivery was observed."),
        (r"command[- ]and[- ]control|c2|beaconing|beacon", "Possible command-and-control beaconing was observed."),
        (r"credential dump|mimikatz|password hash|lsa secrets", "Credential harvesting activity was observed."),
        (r"ingress tool transfer|download.*tool|upload.*tool", "Suspicious tool transfer activity was observed."),
    ]

    activity: list[str] = []
    for pattern, description in checks:
        if re.search(pattern, normalized_text):
            activity.append(description)

    return remove_duplicates(activity)


def extract_timeline(text: str) -> list[str]:
    """
    Extract simple timestamped timeline events from raw text.
    """

    timestamp_pattern = re.compile(
        r"\b(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}|\d{2}:\d{2}:\d{2})\b"
    )

    event_keywords = {
        "powershell": "PowerShell execution",
        "scheduled task": "Scheduled task creation",
        "schtasks": "Scheduled task creation",
        "run key": "Run key persistence",
        "registry": "Registry modification",
        "failed login": "Failed login attempt",
        "failed auth": "Failed login attempt",
        "invalid login": "Failed login attempt",
        "port scan": "Network scanning activity",
        "nmap": "Network scanning activity",
        "download": "Suspicious download activity",
        "curl": "Suspicious download activity",
        "wget": "Suspicious download activity",
        "c2": "Command-and-control activity",
        "beacon": "Command-and-control beaconing",
        "mimikatz": "Credential harvesting activity",
        "credential": "Credential harvesting activity",
    }

    timeline: list[str] = []
    for line in text.splitlines():
        match = timestamp_pattern.search(line)
        if not match:
            continue

        timestamp = match.group(1)
        normalized_line = line.lower()

        for keyword, description in event_keywords.items():
            if keyword in normalized_line:
                timeline.append(f"{timestamp} {description}")
                break

    return remove_duplicates(timeline)


def extract_iocs(text: str) -> dict:
    """
    Extract all supported IOCs.
    """

    return {
        "ips": extract_ips(text),
        "domains": extract_domains(text),
        "urls": extract_urls(text),
        "hashes": extract_hashes(text),
    }


if __name__ == "__main__":

    sample_log = """
    Connection:
    192.168.1.10

    Invalid:
    999.999.999.999

    DNS:
    8.8.8.8

    Duplicate:
    8.8.8.8

    GOOGLE.COM

    google.com

    Google.com

    https://github.com

    https://github.com

    http://evil-login.ru/update.exe

    MD5:
    44d88612fea8a8f36de82e1278abb02f

    MD5:
    44d88612fea8a8f36de82e1278abb02f
    """

    print(extract_iocs(sample_log))
