from dotenv import load_dotenv
import os

load_dotenv()


EMAIL = os.getenv("PRICE-LIST-COMPANY1-EMAIL")
PASSWORD = os.getenv("PRICE-LIST-COMPANY1-PASSWORD")
DOWNLOAD_PATH = r'C:\invoice1.csv'
NOTIFICATIONS_EMAIL = 'notification@email.com'

#### Rest of the script

from typing import List, Optional
import requests
from bs4 import BeautifulSoup, Tag
from time import sleep
from utils import Logger, VersionsManager
from GmailSender import GmailSender
from datetime import datetime

LOGIN_URL = 'https://www.some-some-company.cz/index.php?'
logger = Logger()
gmail_sender = GmailSender()

login_payload = {
#   "stoken": "777812ED",
  "lang": 2,
  "currency": 1,
  "fnc": "login_noredirect",
  "cl": "account_b2bpricelist",
  "pgNr": -1,
  "tpl": "",
  "CustomError": "dyn_cmp_login_right",
  "lgn_cook": 1,
  "listtype": "",
  "lgn_usr": EMAIL,
  "lgn_pwd": PASSWORD,
  "send": ""
}

headers = requests.utils.default_headers()
headers.update({"User-Agent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"})
    
def get_table(soup: BeautifulSoup) -> Optional[Tag]:
    tables: List[Tag] = soup.find_all('table')
    for table in tables:
        if not table.has_attr('aria-labelledby'):
            return table
    
    return None
    
def get_download_link() -> Optional[Tag]:
    r = s.get("https://www.some-company.cz/index.php?cl=account_b2bpricelist", headers=headers)
    soup = BeautifulSoup(r.content, 'html.parser')

    table = get_table(soup)
    if table is None:
        return None

    rows: List[Tag] = table.find_all('tr')
    for row in rows:
        date_str = row.find("td").text
        date_obj = datetime.strptime(date_str, "%d.%m.%Y %H:%M:%S").date()
        current_date = datetime.now().date()

        if date_obj == current_date:
            td: Tag = row.find_all("td")[1]
            link = td.find("a").get("href")
            return link

    return None

def download():
    r = s.post(LOGIN_URL, data=login_payload, headers=headers)

    download_link = get_download_link()
    if download_link is None:  # send download request
        logger.write("[some-company] Requesting csv file")
        s.get("https://www.some-company.cz/index.php?cl=account_b2bpricelistgenerator&fnc=csv", headers=headers)

    while download_link is None:
        download_link = get_download_link()
        if download_link is None:
            logger.write("[some-company] Sleeping, waiting for csv")
            sleep(30)

    logger.write(f"[some-company] Downloading csv to: {DOWNLOAD_PATH}")
    r = s.get(download_link, headers=headers)
    
    if r.status_code == 200:
        with open(DOWNLOAD_PATH, "wb") as file:
            file.write(r.content)
            versions_manager.save_download_date()
            logger.write("[some-company] File downloaded successfully.")
    else:
        logger.write("[some-company] Failed to download the file.")


versions_manager = VersionsManager('some-company')
if versions_manager.downloaded_already():
    exit(0)

try:
    with requests.session() as s:
        download()
except:
    gmail_sender.send_email(NOTIFICATIONS_EMAIL, "some-company invocie download failed!", "Something went wrong. Contact [REMOVED FOR PORTFOLIO].")
