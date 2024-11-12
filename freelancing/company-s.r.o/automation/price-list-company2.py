from dotenv import load_dotenv
import os

load_dotenv()


EMAIL = os.getenv("PRICE-LIST-COMPANY2-EMAIL")
PASSWORD = os.getenv("PRICE-LIST-COMPANY2-PASSWORD")
DOWNLOAD_PATH = r'C:\invoice2.csv'


#### Rest of the script

import requests
from bs4 import BeautifulSoup
from time import sleep
from utils import Logger, VersionsManager

CSV_ENDPOINT = 'https://eshop.some-company.cz/prices-csv'
LOGIN_URL = 'https://eshop.some-company.cz/uvodni-strana?gclid=Cj0KCQiAiJSeBhCCARIsAHnAzT818a8BTQ1pSB72gwsmX8v8-yr43Trgi7BZbVgZRDy06iRAH0EaZrIaArr0EALw_wcB&ajax_form=1&_wrapper_format=drupal_ajax'
logger = Logger()

login_payload = {
    'name': EMAIL, 
    'pass': PASSWORD, 
    'form_build_id': 'form-U25RcXoVUXovKVvoY_8s0GiYUvSiD77lnbvfhamksOI',
    'form_id': 'fancy_login_user_login_form',
    '_triggering_element_name': 'op',
    '_triggering_element_value': 'Přihlásit se',
    '_drupal_ajax': '1',
    'ajax_page_state[theme]': 'kraken_theme',
    'ajax_page_state[theme_token]': '',
    'ajax_page_state[libraries]': 'ajax_loader/ajax_loader.throbber,anchor_link/drupal.anchor_link,better_exposed_filters/general,bootstrap/popover,bootstrap/tooltip,core/drupal.autocomplete,core/html5shiv,core/jquery.form,eshop_some-company/eshop_product_category_form,eshop_some-company/eshop_search_autocomplete,extlink/drupal.extlink,fancy_login/popup,formtips/formtips,formtips/hoverintent,google_analytics/google_analytics,kraken_theme/bootstrap-scripts,kraken_theme/global-styling,kraken_ui/jquery.form-validator,system/base,views/views.module,views_autocomplete_filters/drupal.views-autocomplete-filters'
}
headers = requests.utils.default_headers()
headers.update({"User-Agent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"})

def can_download_csv(s: requests.Session) -> bool:
    r = s.get('https://eshop.some-company.cz/user', headers=headers)
    soup = BeautifulSoup(r.content, 'html.parser')

    try:
        save_button = soup.find('a', href='/prices-csv')
        return 'vygenerovat' not in save_button.get_text().lower()
    except:
        return False


versions_manager = VersionsManager('some-company')

if versions_manager.downloaded_already():
    exit(0)

with requests.session() as s:
    s.post(LOGIN_URL, data=login_payload, headers=headers)
    
    if not can_download_csv(s):
        logger.write('[some-company] Sending request to generate csv.')

        s.post(CSV_ENDPOINT, headers=headers)

        logger.write('[some-company] Waiting for the csv to be generated.')
        sleep(60)
        while not can_download_csv(s):
            sleep(20)
    
    logger.write(f"[some-company] Downloading csv to: {DOWNLOAD_PATH}")
    r = s.get(CSV_ENDPOINT, headers=headers)
    
    if r.status_code == 200:
        with open(DOWNLOAD_PATH, "wb") as file:
            file.write(r.content)
            versions_manager.save_download_date()
            logger.write("[some-company] File downloaded successfully.")
    else:
        logger.write("[some-company] Failed to download the file.")
