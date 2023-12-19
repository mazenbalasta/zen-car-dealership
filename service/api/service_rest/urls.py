from django.urls import path
from .views import list_technicians, show_technician

urlpatterns = [
    path("technicians/", list_technicians, name="list_technicians"),
    path("technicians/<int:id>/", show_technician, name="show_technician")
]
