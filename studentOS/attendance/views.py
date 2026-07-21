
from rest_framework import generics
from .models import Attendance
from .serializers import AttendanceSerializer

class AttendanceListView(generics.ListAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


# Create your views here.
