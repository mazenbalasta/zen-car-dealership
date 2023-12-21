from django.urls import path
from .views import (
    list_technicians,
    show_technician,
    list_appointments,
    show_appointment,
    cancel_appointment,
    finish_appointment,
    list_automobile
)

urlpatterns = [
    path(
        "technicians/",
         list_technicians,
         name="list_technicians"
    ),
    path("technicians/<int:id>/",
         show_technician,
         name="show_technician"
    ),
    path(
        "appointments/",
         list_appointments,
         name="list_appointments"
    ),
    path(
        "appointments/<int:id>/",
        show_appointment,
        name="show_appointment"
    ),
    path(
        "appointments/<int:id>/cancel/",
        cancel_appointment,
        name="cancel_appointment"
    ),
    path(
        "appointments/<int:id>/finish/",
         finish_appointment,
         name="finish_appointment"
    ),
    path(
        "automobiles/",
        list_automobile,
        name="list_automobile"
    ),
]
