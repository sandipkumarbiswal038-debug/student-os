from django.db import models
from subjects.models import Subject
from users.models import User

class Assignment(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    due_date = models.DateField()
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="created_assignments"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class AssignmentSubmission(models.Model):
    assignment = models.ForeignKey(
        Assignment,
        on_delete=models.CASCADE,
        related_name="submissions"
    )
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="assignment_submissions"
    )
    file = models.FileField(upload_to="assignment_submissions/")
    submitted_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default="Submitted")
    grade = models.CharField(max_length=10, blank=True)
    feedback = models.TextField(blank=True)

    def __str__(self):
        return f"{self.student.name} - {self.assignment.title}"
