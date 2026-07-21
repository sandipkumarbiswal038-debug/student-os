from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.core.exceptions import PermissionDenied

class MySocialAccountAdapter(DefaultSocialAccountAdapter):

    def pre_social_login(self, request, sociallogin):
        email = (sociallogin.user.email or "").lower()

        if not email.endswith("@niisgroup.org"):
            raise PermissionDenied("Only NIIS email addresses are allowed.")
