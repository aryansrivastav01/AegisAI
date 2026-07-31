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

    domain_pattern = (
        r"\b(?:[a-zA-Z0-9-]+\.)+"
        r"(?:com|org|net|edu|gov|io|co|in|ru|xyz|info|biz)\b"
    )

    domains = re.findall(domain_pattern, text)

    normalized = [
        normalize_domain(domain)
        for domain in domains
    ]

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
