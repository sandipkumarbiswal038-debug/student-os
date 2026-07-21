from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Subject
from .serializers import SubjectSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def subject_list(request):
    subjects = Subject.objects.filter(batch=request.user.batch)
    serializer = SubjectSerializer(subjects, many=True)
    return Response(serializer.data)
import datetime
from .models import ClassSession
from .serializers import ClassSessionSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def today_sessions(request):
    today = datetime.datetime.now().strftime('%a').upper()[:3]
    user = request.user
    if user.role == 'faculty':
        sessions = ClassSession.objects.filter(faculty=user, day_of_week=today)
    else:
        sessions = ClassSession.objects.filter(subject__batch=user.batch, day_of_week=today)
    serializer = ClassSessionSerializer(sessions, many=True)
    return Response(serializer.data)