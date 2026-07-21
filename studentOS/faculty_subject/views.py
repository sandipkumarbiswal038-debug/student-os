from rest_framework import generics
from .models import FacultySubject
from .serializers import FacultySubjectSerializer

class FacultySubjectListView(generics.ListAPIView):
    queryset = FacultySubject.objects.all()
    serializer_class = FacultySubjectSerializer


