


from django.db import models

class User(models.Model):
    ROLE_CHOICES = [
        ("Student", "Student"),
        ("Faculty", "Faculty"),
        ("Admin", "Admin"),
    ]

    registration_no = models.CharField(max_length=10, blank=True)
    name = models.CharField(max_length=100)
    college_email = models.EmailField(unique=True)
    contact_no = models.CharField(max_length=15)

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="Student"
    )

    department = models.CharField(max_length=100, blank=True)

    course = models.CharField(max_length=50, blank=True)
    semester = models.IntegerField(null=True, blank=True)
    section = models.CharField(max_length=10, blank=True)
    grade = models.CharField(max_length=5, blank=True)
    batch = models.CharField(max_length=10, blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return self.name