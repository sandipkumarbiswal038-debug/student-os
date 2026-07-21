
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Subject
from .serializers import SubjectSerializer
from users.models import User

class SubjectListView(generics.ListAPIView):
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        profile = User.objects.filter(college_email__iexact=self.request.user.email).first()
        if not profile:
            return Subject.objects.none()
        return Subject.objects.filter(batch=profile.batch)
