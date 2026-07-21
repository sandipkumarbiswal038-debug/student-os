from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.utils import timezone
from .models import Assignment, Submission
from .serializers import AssignmentSerializer, SubmissionSerializer
from notifications.services import create_notification

# Custom permission to check if user is Faculty
class IsFaculty(permissions.BasePermission):
    def has_permission(self, request, view):
        # Ensure the user is logged in and their role is exactly "FACULTY"
        return request.user.is_authenticated and getattr(request.user, 'role', None) == 'FACULTY'

# 1. Faculty creates an assignment
class AssignmentCreateView(generics.CreateAPIView):
    serializer_class = AssignmentSerializer
    # Removed 'IsAuthenticated' because IsFaculty already checks for authentication
    permission_classes = [permissions.IsAuthenticated] 

    def perform_create(self, serializer):
        # Explicitly pass the faculty, but tell DRF it's read-only for the body
        serializer.save(faculty=self.request.user)

# 2. Student lists assignments
class AssignmentListView(generics.ListAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Students only see assignments for their own batch
        return Assignment.objects.filter(subject__batch=self.request.user.batch).order_by('deadline')

# 3. Student submits an assignment
class SubmitAssignmentView(generics.CreateAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, assignment_id):
        try:
            assignment = Assignment.objects.get(id=assignment_id)
        except Assignment.DoesNotExist:
            return Response({"error": "Assignment not found"}, status=404)

        # Check for duplicates
        if Submission.objects.filter(assignment=assignment, student=request.user).exists():
            if not assignment.allow_resubmit:
                return Response({"error": "Already submitted and resubmission not allowed"}, status=400)

        is_late = timezone.now() > assignment.deadline
        file_url = request.data.get('file_url') # Assume frontend uploads file and sends URL

        submission = Submission.objects.create(
            assignment=assignment,
            student=request.user,
            file_url=file_url,
            is_late=is_late
        )
        
        # Trigger notification
        create_notification(request.user, "Assignment Submitted", f"Submitted {assignment.title}")
        
        return Response(SubmissionSerializer(submission).data, status=status.HTTP_201_CREATED)

# 4. Faculty grades a submission
class GradeSubmissionView(generics.UpdateAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
    permission_classes = [IsFaculty]

    def patch(self, request, *args, **kwargs):
        submission = self.get_object()
        submission.grade_value = request.data.get('grade_value')
        submission.feedback = request.data.get('feedback')
        submission.graded_at = timezone.now()
        submission.graded_by = request.user
        submission.save()

        # Trigger notification
        create_notification(submission.student, "Assignment Graded", f"Your assignment '{submission.assignment.title}' received: {submission.grade_value}")
        
        return Response(self.get_serializer(submission).data)