# Generated for attendance PRD support.
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("classes", "0002_classsession_course_classsession_section_and_more")]

    operations = [
        migrations.AddField(
            model_name="classsession",
            name="happened",
            field=models.BooleanField(default=True),
        ),
    ]
