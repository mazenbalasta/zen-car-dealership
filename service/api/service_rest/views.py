from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .models import AutomobileVO, Technician, Appointment
from .encoders import (
    TechnicianListEncoder,
    TechnicianDetailEncoder,
    AppointmentListEncoder,
    AppointmentDetailEncoder,
    AutomobileVOListEncoder
)


@require_http_methods(["GET", "POST"])
def list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(technician, encoder=TechnicianListEncoder, safe=False)


@require_http_methods(["GET", "DELETE"])
def show_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician ID, please ensure url has an existing technician id"},
                status=400
            )
        return JsonResponse(technician, encoder=TechnicianDetailEncoder, safe=False)
    else:
        count, _ = Technician.objects.filter(id=id).delete()
        if count > 0:
            return JsonResponse({
                "deleted": True,
                "message": "Technician deleted successfully"
            })
        else:
            return JsonResponse({
                "deleted": False,
                "message": "Technician not found"
                },
                status=400
            )


@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id, please ensure the technician key has an existing value"},
                status=400,
            )
        appointment = Appointment.create(**content)
        return JsonResponse(appointment, encoder=AppointmentListEncoder, safe=False)


@require_http_methods(["GET", "DELETE"])
def show_appointment(request, id):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(appointment, encoder=AppointmentDetailEncoder, safe=False)
    else:
        count, _ = Appointment.objects.filter(id=id).delete()
        if count > 0:
            return JsonResponse({
                "deleted": True,
                "message": "Appointment deleted successfully"
            })
        else:
            return JsonResponse({
                "deleted": False,
                "message": "Appointment not found"
                },
                status=400
            )


@require_http_methods(["PUT"])
def cancel_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid appointment id, please ensure the url contains an existing appointment id"},
                status=400,
            )

        appointment = Appointment.objects.get(id=id)
        appointment.cancel()
        return JsonResponse(appointment, encoder=AppointmentDetailEncoder, safe=False)


@require_http_methods(["PUT"])
def finish_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid appointment id, please ensure the url contains an existing appointment id"},
                status=400,
            )

        appointment = Appointment.objects.get(id=id)
        appointment.finish()
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False
        )

@require_http_methods(["GET"])
def list_automobile(request):
    if request.method == "GET":
        autos = AutomobileVO.objects.all()
        return JsonResponse(
            {"autos": autos},
            encoder=AutomobileVOListEncoder,
        )
