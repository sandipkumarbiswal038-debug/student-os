from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Event, EventSignup
from .serializers import EventSerializer, EventSignupSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def event_list(request):
    """
    List upcoming active events, soonest first.
    """
    events = Event.objects.filter(
        status="active",
        starts_at__gte=timezone.now()
    ).order_by("starts_at")

    serializer = EventSerializer(events, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def event_detail(request, event_id):
    """
    Get event details including signed-up count and the student's own status.
    """
    try:
        event = Event.objects.get(event_id=event_id)
    except Event.DoesNotExist:
        return Response({"detail": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = EventSerializer(event, context={"request": request})
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_event(request):
    """
    Create a new event. Organiser only (faculty for now, per PRD Week 1 decision).
    """
    if request.user.role != "faculty":
        return Response(
            {"detail": "Only organisers can create events."},
            status=status.HTTP_403_FORBIDDEN,
        )

    serializer = EventSerializer(data=request.data, context={"request": request})
    if serializer.is_valid():
        serializer.save(organiser=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def signup_for_event(request, event_id):
    """
    Sign up for an event. Server determines signed_up vs waitlisted based on capacity.
    """
    try:
        event = Event.objects.get(event_id=event_id)
    except Event.DoesNotExist:
        return Response({"detail": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    existing = EventSignup.objects.filter(event=event, user=request.user).first()
    if existing and existing.status in ("signed_up", "waitlisted"):
        return Response(
            {"detail": "Already signed up for this event."},
            status=status.HTTP_409_CONFLICT,
        )

    current_count = event.signups.filter(status="signed_up").count()
    new_status = "signed_up" if current_count < event.capacity else "waitlisted"

    if existing:
        existing.status = new_status
        existing.save()
        signup = existing
    else:
        signup = EventSignup.objects.create(event=event, user=request.user, status=new_status)

    serializer = EventSignupSerializer(signup)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def cancel_signup(request, event_id):
    """
    Cancel a signup. Auto-promotes the earliest waitlisted signup if applicable.
    """
    try:
        signup = EventSignup.objects.get(event__event_id=event_id, user=request.user)
    except EventSignup.DoesNotExist:
        return Response({"detail": "Signup not found."}, status=status.HTTP_404_NOT_FOUND)

    was_signed_up = signup.status == "signed_up"
    signup.status = "cancelled"
    signup.save()

    if was_signed_up:
        next_waitlisted = EventSignup.objects.filter(
            event=signup.event, status="waitlisted"
        ).order_by("signed_up_at").first()

        if next_waitlisted:
            next_waitlisted.status = "signed_up"
            next_waitlisted.save()
            # Notification firing hooks in here later, once Notifications integration is wired

    serializer = EventSignupSerializer(signup)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def event_signups(request, event_id):
    """
    List signups for an event. Organiser only.
    """
    try:
        event = Event.objects.get(event_id=event_id)
    except Event.DoesNotExist:
        return Response({"detail": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.user != event.organiser:
        return Response(
            {"detail": "Only the organiser can view signups."},
            status=status.HTTP_403_FORBIDDEN,
        )

    signups = event.signups.exclude(status="cancelled").order_by("signed_up_at")
    serializer = EventSignupSerializer(signups, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def mark_attendance(request, signup_id):
    """
    Mark a single signup as attended or no_show. Organiser only, after event ends.
    Body: {"status": "attended"} or {"status": "no_show"}
    """
    try:
        signup = EventSignup.objects.get(signup_id=signup_id)
    except EventSignup.DoesNotExist:
        return Response({"detail": "Signup not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.user != signup.event.organiser:
        return Response(
            {"detail": "Only the organiser can mark attendance."},
            status=status.HTTP_403_FORBIDDEN,
        )

    if signup.status != "signed_up":
        return Response(
            {"detail": "Only signed-up students can be marked present or absent."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    new_status = request.data.get("status")
    if new_status not in ("attended", "no_show"):
        return Response(
            {"detail": "status must be 'attended' or 'no_show'."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    signup.status = new_status
    signup.save()

    serializer = EventSignupSerializer(signup)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def cancel_event(request, event_id):
    """
    Cancel an event. Organiser only. Notifies all signed-up and waitlisted users.
    Two-step confirmation is a frontend concern; this endpoint just cancels.
    """
    try:
        event = Event.objects.get(event_id=event_id)
    except Event.DoesNotExist:
        return Response({"detail": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.user != event.organiser:
        return Response(
            {"detail": "Only the organiser can cancel this event."},
            status=status.HTTP_403_FORBIDDEN,
        )

    if event.status == "cancelled":
        return Response(
            {"detail": "Event is already cancelled."},
            status=status.HTTP_409_CONFLICT,
        )

    event.status = "cancelled"
    event.save()

    affected = event.signups.filter(status__in=["signed_up", "waitlisted"])
    # Notification firing hooks in here later, once Notifications integration is wired
    # for signup in affected:
    #     create_notification(user=signup.user, title="Event cancelled", message=f"{event.title} was cancelled.")

    serializer = EventSerializer(event, context={"request": request})
    return Response(serializer.data)