from django.db.models import F
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Note, NoteUpvote, NoteReport
from .serializers import NoteSerializer, NoteReportSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def note_list(request):
    subject_id = request.GET.get("subject")
    notes = Note.objects.filter(status="active")
    if subject_id:
        notes = notes.filter(subject_id=subject_id)
    sort = request.GET.get("sort", "recent")
    if sort == "downloaded":
        notes = notes.order_by("-download_count")
    elif sort == "upvoted":
        notes = notes.order_by("-upvote_count")
    else:
        notes = notes.order_by("-uploaded_at")
    return Response(NoteSerializer(notes, many=True).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upload_note(request):
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(uploaded_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def download_note(request, note_id):
    try:
        note = Note.objects.get(note_id=note_id)
    except Note.DoesNotExist:
        return Response({"detail": "Note not found."}, status=status.HTTP_404_NOT_FOUND)
    note.download_count = F("download_count") + 1
    note.save()
    note.refresh_from_db()
    return Response(NoteSerializer(note).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upvote_note(request, note_id):
    try:
        note = Note.objects.get(note_id=note_id)
    except Note.DoesNotExist:
        return Response({"detail": "Note not found."}, status=status.HTTP_404_NOT_FOUND)

    if NoteUpvote.objects.filter(note=note, user=request.user).exists():
        return Response({"detail": "Already upvoted."}, status=status.HTTP_409_CONFLICT)

    NoteUpvote.objects.create(note=note, user=request.user)
    note.upvote_count = F("upvote_count") + 1
    note.save()
    note.refresh_from_db()
    return Response(NoteSerializer(note).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def report_note(request, note_id):
    try:
        note = Note.objects.get(note_id=note_id)
    except Note.DoesNotExist:
        return Response({"detail": "Note not found."}, status=status.HTTP_404_NOT_FOUND)

    reason = request.data.get("reason", "")
    NoteReport.objects.create(note=note, reported_by=request.user, reason=reason)
    note.status = "reported"
    note.save()
    return Response({"detail": "Note reported."}, status=status.HTTP_201_CREATED)