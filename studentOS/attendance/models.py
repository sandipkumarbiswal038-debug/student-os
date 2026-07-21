
from django.db import models
from student.models import Student
from classes.models import ClassSession

class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    class_session = models.ForeignKey(ClassSession, on_delete=models.CASCADE)
    status = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.student} - {self.status}"

# Create your models here.
