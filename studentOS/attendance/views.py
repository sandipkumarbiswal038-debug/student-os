
from rest_framework import generics
from .models import Attendance
from .serializers import AttendanceSerializer


# View all attendance
class AttendanceListView(generics.ListAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


# Mark attendance
class AttendanceCreateView(generics.CreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


# Attendance details
class AttendanceDetailView(generics.RetrieveAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


# Update attendance
class AttendanceUpdateView(generics.UpdateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


# Delete attendance
class AttendanceDeleteView(generics.DestroyAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


# Create your views here.


class AttendanceHistoryView(generics.ListAPIView):
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        student_id = self.request.query_params.get("student")

        if student_id:
            return Attendance.objects.filter(student_id=student_id)

        return Attendance.objects.all()