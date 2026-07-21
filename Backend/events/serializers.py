from rest_framework import serializers
from .models import Event, EventSignup


class EventSerializer(serializers.ModelSerializer):
    organiser_name = serializers.CharField(source='organiser.name', read_only=True)
    signed_up_count = serializers.SerializerMethodField()
    my_status = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            "event_id",
            "title",
            "description",
            "starts_at",
            "ends_at",
            "location",
            "capacity",
            "organiser",
            "organiser_name",
            "status",
            "created_at",
            "signed_up_count",
            "my_status",
        ]
        read_only_fields = ["event_id", "organiser", "status", "created_at"]

    def get_signed_up_count(self, obj):
        return obj.signups.filter(status="signed_up").count()

    def get_my_status(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return None
        signup = obj.signups.filter(user=request.user).exclude(status="cancelled").first()
        return signup.status if signup else None


class EventSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventSignup
        fields = [
            "signup_id",
            "event",
            "user",
            "status",
            "signed_up_at",
            "status_changed_at",
        ]
        read_only_fields = ["signup_id", "status_changed_at"]