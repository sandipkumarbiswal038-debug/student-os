
from rest_framework import generics
from .models import Note, NoteReport
from .serializers import NoteSerializer, NoteReportSerializer


# List all notes
class NoteListView(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


# Upload/Create note
class NoteCreateView(generics.CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


# Note details
class NoteDetailView(generics.RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


# Update note
class NoteUpdateView(generics.UpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


# Delete note
class NoteDeleteView(generics.DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


# Report note
class NoteReportCreateView(generics.CreateAPIView):
    queryset = NoteReport.objects.all()
    serializer_class = NoteReportSerializer


# View all reports
class NoteReportListView(generics.ListAPIView):
    queryset = NoteReport.objects.all()
    serializer_class = NoteReportSerializer

# Create your views here.
