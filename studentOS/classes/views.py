

from datetime import date

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import ClassSession
from .serializers import ClassSessionSerializer

class ClassSessionListView(generics.ListAPIView):
    serializer_class = ClassSessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ClassSession.objects.filter(date=date.today()).select_related('subject')

# Create your views here.
