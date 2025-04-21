import requests
from bs4 import BeautifulSoup
from time import sleep

SEARCH_URL = 'https://www.pohodafestival.sk/sk/artists/hudba'
TARGET_LINK = "https://www.instagram.com/biggypop/?hl=en"

def get_title_links(url):
    try:
        response = s.get(url, headers=headers)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching the URL: {e}")
        return set()

    soup = BeautifulSoup(response.text, 'html.parser')
    links = {
        a['href'] for a in soup.find_all('a', class_='title') if a.get('href')
    }

    return links

def find_target_link_text(sub_url, target_link):
    try:
        response = s.get(f"https://www.pohodafestival.sk{sub_url}", headers=headers)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching {sub_url}: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    matching_texts = [a.get_text(strip=True) for a in soup.find_all('a', href=target_link)]
    return matching_texts

headers = requests.utils.default_headers()
headers.update({"User-Agent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"})

with requests.session() as s:
    title_links = get_title_links(SEARCH_URL)
    final_words = []
    
    for link in title_links:
        texts = find_target_link_text(link, TARGET_LINK)
        if texts:
            final_words.extend(texts)
            print(f"Found on {link}: {texts}")
        sleep(2)
    
    print("\nFinal words:")
    print(final_words)