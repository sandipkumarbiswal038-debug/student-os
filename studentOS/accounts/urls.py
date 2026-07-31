from django.urls import path

from .views import login_view, logout_view, login_api

urlpatterns = [
   
    






    path(
        "login/",
        login_view,
        name="login"
    ),

    path(
        "logout/",
        logout_view,
        name="logout"
    ),
    path("api-login/", login_api, name="api-login"),

]

