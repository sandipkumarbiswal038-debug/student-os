from django.core.management.base import BaseCommand

from accounts.auth_service import create_login_users


class Command(BaseCommand):

    help = "Create initial login users"

    def handle(self, *args, **kwargs):

        users = create_login_users()

        self.stdout.write(
            self.style.SUCCESS(
                f"{len(users)} users created successfully."
            )
        )