import os
from datetime import datetime
from time import sleep
from typing import Optional


DOWNLOAD_DATE_ARCHIVE = 'last-downloads.txt'
LOG_FILE_PATH = 'log.txt'

class Logger():

    def __init__(self) -> None:
        os.chdir(os.path.dirname(os.path.abspath(__file__)))

    def write(self, message) -> None:
        while True:
            try:
                with open(LOG_FILE_PATH, 'a' if os.path.exists(LOG_FILE_PATH) else 'w') as log_file:
                    print(f'[{datetime.now().strftime("%d.%m %H:%M:%S")}] - {message}', file=log_file)
                    break
            except PermissionError:
                print("[LOGGER] Permission error, close the log.txt file", file=log_file)
                sleep(10)
        

class VersionsManager():

    def __init__(self, name) -> None:
        self.date_today = datetime.today().strftime('%d.%m.%Y')
        self.name = name
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
        self.logger = Logger()

    def downloaded_already(self) -> bool:
        last_download_date = self.__read_last_download_date()
        if last_download_date is not None and last_download_date == self.date_today:
            self.logger.write("The file has already been downloaded today.")
            return True

        return False
    
    def save_download_date(self) -> None:
        self.__write_last_download_date()

    def __read_last_download_date(self) -> Optional[str]:
        if os.path.exists(DOWNLOAD_DATE_ARCHIVE):
            with open(DOWNLOAD_DATE_ARCHIVE, 'r') as f:
                for line in f:
                    entry_name, entry_date = line.strip().split(',')
                    if entry_name == self.name:
                        return entry_date
        return None

    def __write_last_download_date(self) -> None:
        lines = []
        entry_exists = False
        
        # Read existing entries
        if os.path.exists(DOWNLOAD_DATE_ARCHIVE):
            with open(DOWNLOAD_DATE_ARCHIVE, 'r') as f:
                lines = f.readlines()
        
        # Update the entry if it exists
        with open(DOWNLOAD_DATE_ARCHIVE, 'w') as f:
            for line in lines:
                entry_name, _ = line.strip().split(',')
                if entry_name == self.name:
                    f.write(f"{self.name},{self.date_today}\n")
                    entry_exists = True
                else:
                    f.write(line)
            
            # Add new entry if it doesn't exist
            if not entry_exists:
                f.write(f"{self.name},{self.date_today}\n")
