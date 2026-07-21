from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from .auth_service import login_user
from users.models import User as StudentProfile
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


def login_view(request):

    if request.method == "POST":

        email = request.POST.get("email")
        password = request.POST.get("password")

        auth_user = login_user(
            email=email,
            password=password
        )

        if auth_user is not None:

            login(
    request,
    auth_user,
    backend="django.contrib.auth.backends.ModelBackend"
)

            student = StudentProfile.objects.filter(
                college_email__iexact=email
            ).first()

            if student is not None:

                return render(
                    request,
                    "accounts/dashboard.html",
                    {
                        "student": student
                    }
                )

            return render(
                request,
                "accounts/login.html",
                {
                    "error": "Student profile not found."
                }
            )

        return render(
            request,
            "accounts/login.html",
            {
                "error": "Invalid email or password."
            }
        )

    return render(
        request,
        "accounts/login.html"
    )


def logout_view(request):

    logout(request)

    return redirect("login")

@api_view(['GET'])
@permission_classes([AllowAny])
def session_status(request):
    if not request.user.is_authenticated:
        return Response({'authenticated': False})

    user = request.user
    return Response({
        'authenticated': True,
        'user': {
            'id': user.id,
            'name': user.get_full_name() or user.email.split('@')[0],
            'email': user.email,
        },
    })


@csrf_exempt
@require_POST
@api_view(['POST'])
@permission_classes([AllowAny])
def session_logout(request):
    logout(request)
    return Response(status=204)


