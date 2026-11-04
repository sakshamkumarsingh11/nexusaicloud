import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import aiosmtplib
from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


async def send_enquiry_notification(
    name: str,
    email: str,
    company: str | None,
    service: str | None,
    message: str,
    source: str,
) -> bool:
    """Send email notification when a new enquiry is received."""
    if not settings.smtp_host or not settings.smtp_user:
        logger.warning("SMTP not configured — skipping email notification")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["From"] = f"{settings.smtp_from_name} <{settings.smtp_from_email}>"
        msg["To"] = settings.notification_email
        msg["Subject"] = f"New {source.title()} Enquiry from {name}"

        text_body = f"""New {source.title()} Enquiry

Name: {name}
Email: {email}
Company: {company or 'Not provided'}
Service: {service or 'Not specified'}

Message:
{message}

---
This notification was sent from nexusaicloud.com
"""

        html_body = f"""
<div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
  <div style="background: #1E2044; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
    <h1 style="margin: 0; font-size: 18px;">New {source.title()} Enquiry</h1>
  </div>
  <div style="background: #ECEDF8; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Name</td><td style="padding: 8px 0; font-weight: 600;">{name}</td></tr>
      <tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:{email}">{email}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Company</td><td style="padding: 8px 0;">{company or 'Not provided'}</td></tr>
      <tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Service</td><td style="padding: 8px 0;">{service or 'Not specified'}</td></tr>
    </table>
  </div>
  <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #E5E7EB;">
    <p style="color: #6B7280; font-size: 13px; margin: 0 0 8px 0;">Message</p>
    <p style="margin: 0; line-height: 1.6;">{message}</p>
  </div>
  <p style="color: #9CA3AF; font-size: 11px; margin-top: 24px; text-align: center;">
    Sent from nexusaicloud.com
  </p>
</div>
"""

        msg.attach(MIMEText(text_body, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        await aiosmtplib.send(
            msg,
            hostname=settings.smtp_host,
            port=settings.smtp_port,
            username=settings.smtp_user,
            password=settings.smtp_password,
            use_tls=False,
            start_tls=True,
        )

        logger.info(f"Notification email sent for enquiry from {name}")
        return True

    except Exception as e:
        logger.error(f"Failed to send email notification: {e}")
        return False

