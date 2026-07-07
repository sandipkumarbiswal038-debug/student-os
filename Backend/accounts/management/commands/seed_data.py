from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import time
from accounts.models import User
from core.models import Subject, FacultySubject, ClassSession


class Command(BaseCommand):
    help = "Seed the database with MCA students, subjects, faculty, and a placeholder timetable."

    def handle(self, *args, **options):
        self.stdout.write("Seeding students...")

        students = [
            ("Hitesh Lenka", "sip26.hiteshlenka@niisgroup.org", "26"),
            ("Bishnu Priya", "sip26.bishnupriyasahoo@niisgroup.org", "19"),
            ("Chandan Jena", "sip26.chandanjena@niisgroup.org", "20"),
            ("Om Palai", "sip26.ompalai@niisgroup.org", "41"),
            ("Arpita Panda", "sip26.arpitapanda@niisgroup.org", "08"),
            ("Saninee Priyadarshini", "sip26.saninee@niisgroup.org", "51"),
            ("Subhalaxmi Biswal", "sip26.subhalaxmibiswal@niisgroup.org", "69"),
            ("Anish Mohanty", "sip26.anishmohanty@niisgroup.org", "03"),
            ("Damodar Mandal", "sip26.damodar@niisgroup.org", "21"),
        ]

        for name, email, roll in students:
            email = email.lower()
            user, created = User.objects.get_or_create(
                college_email=email,
                defaults={
                    "name": name,
                    "roll_number": roll,
                    "batch": "MCA",
                    "role": "student",
                },
            )
            if created:
                user.set_unusable_password()
                user.save()
                self.stdout.write(f"  Created student: {name}")
            else:
                self.stdout.write(f"  Skipped (already exists): {name}")

        self.stdout.write("Seeding faculty...")

        faculty_list = [
            ("Dr. Pravakar Mishra", "pravakar@niisgroup.org", "F001"),
            ("Dr. Sradhanjali Nayak", "sradha@niisgroup.org", "F002"),
        ]

        faculty_objs = []
        for name, email, roll in faculty_list:
            email = email.lower()
            user, created = User.objects.get_or_create(
                college_email=email,
                defaults={
                    "name": name,
                    "roll_number": roll,
                    "batch": "MCA",
                    "role": "faculty",
                },
            )
            if created:
                user.set_unusable_password()
                user.save()
                self.stdout.write(f"  Created faculty: {name}")
            else:
                self.stdout.write(f"  Skipped (already exists): {name}")
            faculty_objs.append(user)

        self.stdout.write("Seeding subjects...")

        subject_list = [
            ("Data Structures", "MCA101"),
            ("Database Management Systems", "MCA102"),
            ("Operating Systems", "MCA103"),
            ("Computer Networks", "MCA104"),
            ("Software Engineering", "MCA105"),
        ]

        subject_objs = []
        for name, code in subject_list:
            subject, created = Subject.objects.get_or_create(
                code=code,
                defaults={"name": name, "batch": "MCA", "semester": 1},
            )
            if created:
                self.stdout.write(f"  Created subject: {name}")
            else:
                self.stdout.write(f"  Skipped (already exists): {name}")
            subject_objs.append(subject)

        self.stdout.write("Linking faculty to subjects...")

        for i, subject in enumerate(subject_objs):
            faculty = faculty_objs[i % len(faculty_objs)]
            FacultySubject.objects.get_or_create(faculty=faculty, subject=subject)

        self.stdout.write("Seeding timetable...")

        days = ["MON", "TUE", "WED", "THU", "FRI"]
        start_hour = 9

        for i, subject in enumerate(subject_objs):
            faculty = faculty_objs[i % len(faculty_objs)]
            day = days[i % len(days)]
            start = time(hour=start_hour + i, minute=0)
            end = time(hour=start_hour + i + 1, minute=0)

            ClassSession.objects.get_or_create(
                subject=subject,
                faculty=faculty,
                day_of_week=day,
                start_time=start,
                end_time=end,
                defaults={"room": f"Room {100 + i}"},
            )
            self.stdout.write(f"  Scheduled: {subject.code} on {day} {start}-{end}")

        self.stdout.write(self.style.SUCCESS("Seeding complete."))