# Generated for attendance PRD support.
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("attendance", "0002_attendance_marked_at_attendance_remarks_and_more"),
        ("classes", "0003_classsession_happened"),
        ("student", "0001_initial"),
        ("subjects", "0003_subject_course_code_subject_course_name"),
        ("users", "0007_user_department_user_role_alter_user_batch_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Enrollment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("student", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="subject_enrollments", to="student.student")),
                ("subject", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="student_enrollments", to="subjects.subject")),
            ],
        ),
        migrations.AddField(
            model_name="attendance",
            name="corrected_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="attendance",
            name="corrected_by",
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name="corrected_attendance", to="users.user"),
        ),
        migrations.AddField(
            model_name="attendance",
            name="marked_by",
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, related_name="marked_attendance", to="users.user"),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="attendance",
            name="class_session",
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="attendance_records", to="classes.classsession"),
        ),
        migrations.AlterField(
            model_name="attendance",
            name="student",
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="attendance_records", to="student.student"),
        ),
        migrations.AlterField(
            model_name="attendance",
            name="status",
            field=models.CharField(choices=[("Present", "Present"), ("Absent", "Absent")], max_length=10),
        ),
        migrations.AddConstraint(
            model_name="enrollment",
            constraint=models.UniqueConstraint(fields=("student", "subject"), name="unique_student_subject_enrollment"),
        ),
        migrations.AddConstraint(
            model_name="attendance",
            constraint=models.UniqueConstraint(fields=("student", "class_session"), name="one_attendance_per_student_session"),
        ),
    ]
