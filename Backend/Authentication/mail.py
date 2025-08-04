import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_reminder_mail(
    mail_subject="Reminder: Please select your ASMP mentor | SARC IIT Bombay",
    emailid="",
    name="User",
    sender_email="sarc@iitb.ac.in",
    sender_name="SARC",
    reply_name="SARC",
    reply_to="support@iitb.ac.in",
):
    strFrom = sender_email
    strTo = emailid

    msgRoot = MIMEMultipart("related")
    msgRoot["Subject"] = mail_subject
    msgRoot["From"] = f"{sender_name} <{sender_email}>"
    msgRoot["To"] = strTo
    msgRoot["Reply-To"] = f"{reply_name} <{reply_to}>"

    msgAlternative = MIMEMultipart("alternative")
    msgRoot.attach(msgAlternative)
    msghtml = f'''
<!DOCTYPE html>
<html>
  <head>
    <title>{mail_subject}</title>
  </head>
  <body>
    <div style="font-family: Arial, sans-serif; line-height: 1.5; background-color: #f8f8f8; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <h1 style="font-size: 20px; color: #333333; margin-top: 0; margin-bottom: 20px;">
          Reminder: Please select your ASMP mentor
        </h1>
        <p style="color: #555555; margin-bottom: 10px;">Hi {name},</p>
        <p style="color: #555555; margin-bottom: 10px;">
          You registered for ASMP IITB but haven’t selected a mentor yet.
          Please log in to your dashboard and choose mentors before the deadline.
        </p>
        <p style="color: #555555; margin-bottom: 10px;">
          Regards,<br>
          SARC Team
        </p>
      </div>
    </div>
  </body>
</html>
'''

    msgText = MIMEText(msghtml, "html")
    msgAlternative.attach(msgText)

    try:
        smtp = smtplib.SMTP("smtp-auth.iitb.ac.in", 587)
        smtp.starttls()
        smtp.login("sarc@iitb.ac.in", "c1a90a1351390958f742b8097d9feaab")
        response = smtp.sendmail(strFrom, strTo, msgRoot.as_string())
        smtp.quit()
        return response
    except Exception as e:
        print(f"❌ Email error (reminder): {e}")
        return None