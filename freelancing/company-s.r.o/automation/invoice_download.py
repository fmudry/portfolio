from dotenv import load_dotenv
import os

load_dotenv()

# username : (password, download path)
credentials = {
    os.getenv("INVOICE-EMAIL1"): (os.getenv("INVOICE-PASS1"), r'C:\import\branch1'),
    os.getenv("INVOICE-EMAIL2"): (os.getenv("INVOICE-PASS2"), r'C:\import\branch2'),
}

import imaplib
import email
from email.header import decode_header
from email.utils import parsedate_tz, mktime_tz
import os
import datetime
from utils import VersionsManager, Logger

IMAP_SERVER = 'mail.nameserver.sk'
IMAP_PORT = 993
logger = Logger()

for username, data in credentials.items():
    password, download_folder = data

    logger.write(f'Trying {username}.')

    versions_manager = VersionsManager(f'faktura - {username}')
    if versions_manager.downloaded_already():
        continue

    mail = imaplib.IMAP4_SSL(IMAP_SERVER, IMAP_PORT)
    mail.login(username, password)
    mail.select('INBOX')

    # Find the newest invoice mail
    search_query = f'SUBJECT "Faktura E3/{datetime.datetime.now().year}/"'
    status, messages = mail.search(None, search_query)
    email_ids = messages[0].split()
    latest_email_id = email_ids[-1]

    status, msg_data = mail.fetch(latest_email_id, '(RFC822)')
    for response_part in msg_data:
        if isinstance(response_part, tuple):

            msg = email.message_from_bytes(response_part[1])

            # Check email's date
            date_sent = msg["Date"]
            parsed_date = parsedate_tz(date_sent)
            email_date = datetime.datetime.fromtimestamp(mktime_tz(parsed_date))
            today_date = datetime.datetime.now().date()
            if email_date.date() != today_date:
                logger.write(f'Invoice for "{username}" has not been sent today yet. Skipping...')
                break

            # Download invoice
            subject, encoding = decode_header(msg["Subject"])[0]
            if isinstance(subject, bytes):
                subject = subject.decode(encoding if encoding else 'utf-8')

            for part in msg.walk():
                if part.get_content_disposition() == 'attachment':
                    filename = part.get_filename()
                    
                    if not (filename and filename.endswith('.csv')):
                        continue
                        
                    # Save invoice
                    if not os.path.isdir(download_folder):
                        os.mkdir(download_folder)

                    filepath = os.path.join(download_folder, filename)
                    with open(filepath, 'wb') as f:
                        f.write(part.get_payload(decode=True))

                    versions_manager.save_download_date()
                    logger.write(f'[{username}] Downloaded successfully: {filename} to {download_folder}\n')

    mail.logout()
