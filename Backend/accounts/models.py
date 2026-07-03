from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, college_email, name, roll_number, batch, password=None, **extra_fields):
        if not college_email:
            raise ValueError("Users must have a college email")
        college_email = self.normalize_email(college_email)
        user = self.model(
            college_email=college_email,
            name=name,
            roll_number=roll_number,
            batch=batch,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, college_email, name, roll_number, batch, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "admin")

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")

        return self.create_user(college_email, name, roll_number, batch, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ("student", "Student"),
        ("faculty", "Faculty"),
        ("admin", "Admin"),
    ]

    name = models.CharField(max_length=255)
    college_email = models.EmailField(unique=True)
    roll_number = models.CharField(max_length=50, unique=True)
    batch = models.CharField(max_length=20)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="student")

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "college_email"
    REQUIRED_FIELDS = ["name", "roll_number", "batch"]

    def __str__(self):
        return f"{self.name} ({self.college_email})"