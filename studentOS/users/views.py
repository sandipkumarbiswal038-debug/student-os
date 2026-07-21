from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import UserSerializer


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = User.objects.filter(
            college_email__iexact=request.user.email
        ).first()

        if not user:
            return Response(
                {"detail": "User profile not found."},
                status=404
            )

        serializer = UserSerializer(user)
        return Response(serializer.data)

