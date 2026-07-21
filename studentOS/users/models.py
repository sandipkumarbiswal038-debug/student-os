
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    college_email = models.EmailField(unique=True)
    roll_number = models.CharField(max_length=30, unique=True)
    batch = models.CharField(max_length=20)
    role = models.CharField(max_length=20)

    def __str__(self):
        return self.name


