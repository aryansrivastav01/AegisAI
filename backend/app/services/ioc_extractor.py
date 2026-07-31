import re


def extract_ips(text: str) -> list[str]:
    """
    Extract IPv4 addresses from text.
    """

    ip_pattern = r"\b(?:\d{1,3}\.){3}\d{1,3}\b"

    return re.findall(ip_pattern, text)


def extract_domains(text: str) -> list[str]:
    """
    Extract domain names from text.
    """

    domain_pattern = (
        r"\b(?:[a-zA-Z0-9-]+\.)+"
        r"(?:com|org|net|edu|gov|io|co|in|ru|xyz|info|biz)\b"
    )

    return re.findall(domain_pattern, text)


def extract_urls(text: str) -> list[str]:
    """
    Extract HTTP and HTTPS URLs.
    """

    url_pattern = r"https?://[^\s]+"

    return re.findall(url_pattern, text)


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

    return re.findall(hash_pattern, text)


def extract_iocs(text: str) -> dict:
    """
    Extract all supported IOCs from text.
    """

    return {
        "ips": extract_ips(text),
        "domains": extract_domains(text),
        "urls": extract_urls(text),
        "hashes": extract_hashes(text),
    }


if __name__ == "__main__":

    sample_log = """
    User connected to 192.168.1.10

    DNS Server: 8.8.8.8

    Downloaded payload:
    http://evil-login.ru/update.exe

    Login Portal:
    https://portal.microsoftonline.com/login

    Search:
    google.com

    MD5:
    44d88612fea8a8f36de82e1278abb02f

    SHA1:
    2fd4e1c67a2d28fced849ee1bb76e7391b93eb12

    SHA256:
    e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
    """

    print(extract_iocs(sample_log))
