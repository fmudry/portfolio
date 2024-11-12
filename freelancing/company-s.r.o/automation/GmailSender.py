import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

from dotenv import load_dotenv
import os

load_dotenv()


class GmailSender:

    def __init__(self, email: str = None):
        self.email = email or os.getenv("EMAIL")
        self.app_password = os.getenv("APP_PASSWORD")
        self.smtp_server = os.getenv("SMTP_SERVER")
        self.smtp_port = os.getenv("SMTP_PORT")

    def send_email(self, to_email: str, subject: str, body: str, attachment_path: str = None) -> None:
        message = MIMEMultipart()
        message["From"] = self.email
        message["To"] = to_email
        message["Subject"] = subject

        message.attach(MIMEText(body, "plain"))

        if attachment_path:
            with open(attachment_path, "rb") as attachment:
                mime_base = MIMEBase("application", "octet-stream")
                mime_base.set_payload(attachment.read())
                encoders.encode_base64(mime_base)
                mime_base.add_header("Content-Disposition", f"attachment; filename={attachment_path}")
                message.attach(mime_base)

        try:
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.email, self.app_password)
                server.send_message(message)
                print(f"Email sent to {to_email}")
        except Exception as e:
            print(f"Failed to send an email. To: {to_email}, subject: {subject}, body: {body}")
