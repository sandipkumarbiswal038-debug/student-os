from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import FacultySubject
from .serializers import FacultySubjectSerializer

class FacultySubjectListCreateView(generics.ListCreateAPIView):
    queryset = FacultySubject.objects.all()
    serializer_class = FacultySubjectSerializer


class FacultySubjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FacultySubject.objects.all()
    serializer_class = FacultySubjectSerializer

class MyClassesView(generics.ListAPIView):
    serializer_class = FacultySubjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FacultySubject.objects.filter(
            faculty=self.request.user
        ).select_related("subject")


