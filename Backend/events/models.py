import uuid
from django.db import models
from django.conf import settings


class Event(models.Model):
    STATUS_CHOICES = [
        ("active", "Active"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]

    event_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField()
    location = models.CharField(max_length=255)
    capacity = models.PositiveIntegerField(default=100)
    organiser = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="organised_events"
    )
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default="active"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.starts_at.date()})"


class EventSignup(models.Model):
    STATUS_CHOICES = [
        ("signed_up", "Signed Up"),
        ("waitlisted", "Waitlisted"),
        ("cancelled", "Cancelled"),
        ("attended", "Attended"),
        ("no_show", "No Show"),
    ]

    signup_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False
    )
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name="signups"
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="event_signups"
    )
    status = models.CharField(max_length=12, choices=STATUS_CHOICES)
    signed_up_at = models.DateTimeField(auto_now_add=True)
    status_changed_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["event", "user"],
                name="unique_signup_per_event_user"
            )
        ]

    def __str__(self):
        return f"{self.user} - {self.event} - {self.status}"