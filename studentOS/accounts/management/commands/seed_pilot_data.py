from datetime import time, timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from classes.models import ClassSession
from faculty_subject.models import FacultySubject
from subjects.models import Subject
from users.models import User


class Command(BaseCommand):
    help = 'Create repeat-safe sample MCA pilot users, subjects, faculty mappings, and class sessions.'

    def handle(self, *args, **options):
        batch = 'MCA-2025'
        students = [
            ('Aarav Sharma', 'aarav.sharma@niisgroup.org', 'MCA25001'),
            ('Diya Patel', 'diya.patel@niisgroup.org', 'MCA25002'),
            ('Rohan Das', 'rohan.das@niisgroup.org', 'MCA25003'),
        ]
        faculty_members = [
            ('Dr. Ananya Sen', 'ananya.sen@niisgroup.org', 'FAC001'),
            ('Prof. Rahul Verma', 'rahul.verma@niisgroup.org', 'FAC002'),
        ]
        subjects = [
            ('MCA301', 'Database Management Systems'),
            ('MCA302', 'Operating Systems'),
            ('MCA303', 'Computer Networks'),
        ]

        for name, email, roll_number in students:
            User.objects.update_or_create(
                college_email=email,
                defaults={
                    'name': name,
                    'roll_number': roll_number,
                    'batch': batch,
                    'role': 'student',
                },
            )

        created_faculty = []
        for name, email, roll_number in faculty_members:
            faculty, _ = User.objects.update_or_create(
                college_email=email,
                defaults={
                    'name': name,
                    'roll_number': roll_number,
                    'batch': batch,
                    'role': 'faculty',
                },
            )
            created_faculty.append(faculty)

        created_subjects = []
        for subject_code, subject_name in subjects:
            subject, _ = Subject.objects.update_or_create(
                subject_code=subject_code,
                defaults={
                    'subject_name': subject_name,
                    'semester': 3,
                    'batch': batch,
                },
            )
            created_subjects.append(subject)

        for index, subject in enumerate(created_subjects):
            FacultySubject.objects.get_or_create(
                faculty=created_faculty[index % len(created_faculty)],
                subject=subject,
            )
            session_date = timezone.localdate() + timedelta(days=index)
            ClassSession.objects.get_or_create(
                subject=subject,
                date=session_date,
                start_time=time(10 + index, 0),
                end_time=time(11 + index, 0),
            )

        self.stdout.write(self.style.SUCCESS(
            'Pilot data ready: 3 students, 2 faculty members, 3 subjects, and 3 class sessions.'
        ))
