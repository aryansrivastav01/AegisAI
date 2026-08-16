import smtplib
from email.message import EmailMessage
from app.core.config import settings

def send_reset_password_email(email_to: str, token: str):
    if not settings.smtp_server or not settings.emails_from_email:
        print(f"Mocking email to {email_to}: Token is {token}")
        return

    reset_link = f"{settings.frontend_url}/reset-password?token={token}"
    
    msg = EmailMessage()
    msg['Subject'] = 'Password Reset Request - ElyvexAI'
    msg['From'] = settings.emails_from_email
    msg['To'] = email_to
    
    body = f"""
    Hello,
    
    You have requested to reset your password for ElyvexAI.
    Please click the link below to set a new password:
    
    {reset_link}
    
    If you did not request a password reset, please ignore this email.
    
    Thanks,
    The ElyvexAI Team
    """
    
    msg.set_content(body)
    
    try:
        if settings.smtp_port == 465:
            with smtplib.SMTP_SSL(settings.smtp_server, settings.smtp_port) as server:
                if settings.smtp_username and settings.smtp_password:
                    server.login(settings.smtp_username, settings.smtp_password)
                server.send_message(msg)
        else:
            with smtplib.SMTP(settings.smtp_server, settings.smtp_port) as server:
                server.starttls()
                if settings.smtp_username and settings.smtp_password:
                    server.login(settings.smtp_username, settings.smtp_password)
                server.send_message(msg)
    except Exception as e:
        print(f"Error sending email: {e}")
