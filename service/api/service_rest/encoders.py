from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "employee_id",
        "first_name",
        "last_name",
        "id"
    ]

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "employee_id",
        "first_name",
        "last_name",
    ]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer",
        "date_time",
        "technician",
        "reason",
        "id"
    ]
    encoders = {
        "technician": TechnicianDetailEncoder(),
    }
    def get_extra_data(self, o):
        return { "status": o.status.name }

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer",
        "date_time",
        "technician",
        "reason"
    ]
    encoders = {
        "technician": TechnicianDetailEncoder(),
    }
    def get_extra_data(self, o):
        return { "status": o.status.name }

class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]
