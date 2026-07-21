
from django.db import models
from users.models import User

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    semester = models.PositiveIntegerField()

    def __str__(self):
        return self.user.name

# Create your models here.
