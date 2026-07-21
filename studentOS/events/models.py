
from django.db import models
from users.models import User
from student.models import Student


class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    venue = models.CharField(max_length=200)
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="events"
    )

    participants = models.ManyToManyField(
        Student,
        related_name="events",
        blank=True
    )

    def __str__(self):
        return self.title

# Create your models here.
