from django.utils import timezone
from datetime import timedelta
from Authentication.models import User
from Registrations.models import WishList
from Authentication.mail import send_reminder_mail
import logging

logger = logging.getLogger(__name__)

def send_reminder_emails_12h():
    """
    Send *once* to users who registered 12+ hours ago,
    have NOT picked a mentor, and have NOT been reminded.
    """
    # twelve_hours_ago = timezone.now() - timedelta(minutes=4) # Adjusted for testing
    twelve_hours_ago = timezone.now() - timedelta(hours=12) # For production
    users_to_remind = (
        User.objects.filter(
            is_active=True, #for active users only,meaning they have registered and verified
            date_joined__lte=twelve_hours_ago,
            reminder_sent=False,
        )
        .exclude(id__in=WishList.objects.values_list("user_id", flat=True).distinct())
    )
    for user in users_to_remind:
        try:
            send_reminder_mail(
                emailid=user.ldap, 
                name=user.fullname,
            )
            user.reminder_sent = True
            print(f"Sending 12-hour reminder to {user.ldap}")
            user.save(update_fields=["reminder_sent"])
            logger.info(f"✅ 12h reminder sent to {user.ldap}")
        except Exception as e:
            logger.error(f"❌ Failed (12h) to {user.ldap}: {e}")


def send_reminder_emails_fixed():
    """
    Send to all active users without mentors (regardless of reminder_sent flag).
    Useful for blast reminders on a specific date/time.
    """
    users_to_remind = (
        User.objects.filter(
            # is_active=True, for active users only,meaning they have registered and verified
        )
        .exclude(id__in=WishList.objects.values_list("user_id", flat=True).distinct())
    )

    for user in users_to_remind:
        try:
            send_reminder_mail(
                emailid=user.ldap,
                name=user.fullname,
            )
            logger.info(f"✅ Fixed-date reminder sent to {user.ldap}")
        except Exception as e:
            logger.error(f"❌ Failed (fixed) to {user.ldap}: {e}")