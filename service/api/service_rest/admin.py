from django.contrib import admin
from .models import AutomobileVO, Technician, Appointment, Status
# Register your models here.

@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    pass

@admin.register(AutomobileVO)
class AutomobileVO(admin.ModelAdmin):
    pass

@admin.register(Technician)
class Technician(admin.ModelAdmin):
    pass

@admin.register(Appointment)
class Appointment(admin.ModelAdmin):
    pass
