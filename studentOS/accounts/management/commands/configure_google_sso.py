import os

from allauth.socialaccount.models import SocialApp
from django.contrib.sites.models import Site
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'Replace local Google Social Applications with one configured app.'

    def handle(self, *args, **options):
        client_id = os.getenv('GOOGLE_CLIENT_ID', '')
        client_secret = os.getenv('GOOGLE_CLIENT_SECRET', '')

        if not client_id or client_id == 'your-google-oauth-client-id' or not client_secret or client_secret == 'your-google-oauth-client-secret':
            raise CommandError('Set real GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET values in .env before running this command.')

        deleted_count, _ = SocialApp.objects.filter(provider='google').delete()
        site, _ = Site.objects.get_or_create(
            id=1,
            defaults={'domain': '127.0.0.1:8000', 'name': 'Student OS Local'},
        )
        site.domain = '127.0.0.1:8000'
        site.name = 'Student OS Local'
        site.save(update_fields=['domain', 'name'])

        app = SocialApp.objects.create(
            provider='google',
            name='Student OS Local Google SSO',
            client_id=client_id,
            secret=client_secret,
            key='',
        )
        app.sites.add(site)

        self.stdout.write(self.style.SUCCESS(
            f'Removed {deleted_count} Google Social Application record(s) and created one local Google SSO app for {site.domain}.'
        ))
