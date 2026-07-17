from django.urls import path
from . import views

urlpatterns = [
    path('', views.note_list, name='note-list'),
    path('upload/', views.upload_note, name='note-upload'),
    path('<uuid:note_id>/download/', views.download_note, name='note-download'),
    path('<uuid:note_id>/upvote/', views.upvote_note, name='note-upvote'),
    path('<uuid:note_id>/report/', views.report_note, name='note-report'),
]