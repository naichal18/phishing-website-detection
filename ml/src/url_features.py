import re
import ipaddress
from urllib.parse import urlparse


MODEL_FEATURES = [
    "URLLength",
    "IsHTTPS",
    "DomainLength",
    "NoOfOtherSpecialCharsInURL",
    "NoOfSubDomain",
    "NoOfDegitsInURL",
]


def extract_url_features(url):
    """
    Extract URL-based features used by the phishing detection model.
    """

    if not isinstance(url, str):
        url = str(url)

    url = url.strip()

    # Add scheme if missing
    if not re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*://", url):
        url = "http://" + url

    parsed = urlparse(url)

    # Extract domain
    domain = parsed.netloc.split("@")[-1].split(":")[0]

    # URL without scheme
    url_without_scheme = re.sub(
        r"^[a-zA-Z][a-zA-Z0-9+.-]*://",
        "",
        url
    )

    # Check whether domain is an IP address
    try:
        ipaddress.ip_address(domain)
        is_domain_ip = 1
    except ValueError:
        is_domain_ip = 0

    # URL length
    url_length = len(url)

    # Domain length
    domain_length = len(domain)

    # Number of subdomains
    no_of_subdomain = max(
        len(domain.split(".")) - 2,
        0
    )

    # Number of letters
    no_of_letters = sum(
        character.isalpha()
        for character in url
    )

    # Number of digits
    no_of_digits = sum(
        character.isdigit()
        for character in url
    )

    # Special characters
    special_chars = re.findall(
        r"[^a-zA-Z0-9]",
        url_without_scheme
    )

    no_of_other_special_chars = len(
        special_chars
    )

    # HTTPS
    is_https = int(
        parsed.scheme.lower() == "https"
    )

    return {
        "URLLength": url_length,
        "IsHTTPS": is_https,
        "DomainLength": domain_length,
        "NoOfOtherSpecialCharsInURL": no_of_other_special_chars,
        "NoOfSubDomain": no_of_subdomain,
        "NoOfDegitsInURL": no_of_digits,
    }