from django.db import models


class Subject(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=20, unique=True)
    batch = models.CharField(max_length=20)
    semester = models.PositiveSmallIntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.code} - {self.name}"


class FacultySubject(models.Model):
    faculty = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='faculty_subjects')
    subject = models.ForeignKey('core.Subject', on_delete=models.CASCADE, related_name='faculty_links')

    class Meta:
        unique_together = ('faculty', 'subject')

    def __str__(self):
        return f"{self.faculty.name} - {self.subject.code}"


class ClassSession(models.Model):
    subject = models.ForeignKey('core.Subject', on_delete=models.CASCADE, related_name='sessions')
    faculty = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='class_sessions')
    day_of_week = models.CharField(max_length=10)
    start_time = models.TimeField()
    end_time = models.TimeField()
    room = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"{self.subject.code} - {self.day_of_week} {self.start_time}"
