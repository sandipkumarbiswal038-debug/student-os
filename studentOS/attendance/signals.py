from django.core.exceptions import PermissionDenied
from django.db.models.signals import pre_delete
from django.dispatch import receiver

from .models import Attendance


@receiver(pre_delete, sender=Attendance)
def prohibit_attendance_deletion(sender, instance, **kwargs):
    raise PermissionDenied("Attendance records cannot be deleted.")
