from django.contrib import admin
from django.urls import path, include
from Mentors import urls
from Authentication import urls
from Registrations import urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/mentors/", include("Mentors.urls")),
    path("api/authentication/", include("Authentication.urls")),
    path("api/registration/", include("Registrations.urls")),
]
