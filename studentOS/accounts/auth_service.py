from django.contrib.auth import get_user_model
from users.models import User as StudentProfile


AuthUser = get_user_model()


def create_login_users():

    students = StudentProfile.objects.all()

    created_users = []

    for student in students:

        auth_user, created = AuthUser.objects.get_or_create(
            email=student.college_email,
            defaults={
                "username": student.college_email,
                "first_name": student.name,
            }
        )

        auth_user.set_password("Student@123")
        auth_user.save()

        created_users.append(auth_user)

    return created_users


def login_user(email, password):

    auth_user = AuthUser.objects.filter(
        email__iexact=email
    ).first()

    if auth_user is None:
        return None

    if auth_user.check_password(password):
        return auth_user

    return None