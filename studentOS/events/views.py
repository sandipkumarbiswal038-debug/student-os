
from rest_framework import generics
from .models import Event
from .serializers import EventSerializer


# Read API (GET)
class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


# Write API (POST)
class EventCreateView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

# Create your views here.
