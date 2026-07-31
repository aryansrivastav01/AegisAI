import ipaddress


def validate_ip(ip: str) -> bool:
    """
    Validate an IPv4 address.
    """

    try:
        ipaddress.IPv4Address(ip)
        return True
    except ValueError:
        return False


def normalize_domain(domain: str) -> str:
    """
    Normalize domain names.
    """

    return domain.lower()


def remove_duplicates(items: list[str]) -> list[str]:
    """
    Remove duplicates while preserving order.
    """

    return list(dict.fromkeys(items))
