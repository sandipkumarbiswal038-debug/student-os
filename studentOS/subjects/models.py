
from django.db import models

class Subject(models.Model):
  
    
    subject_code = models.CharField(max_length=20, unique=True)
    subject_name = models.CharField(max_length=100, unique=True)
    semester = models.PositiveIntegerField()
    batch = models.CharField(max_length=20)

    def __str__(self):
        return self.subject_name


