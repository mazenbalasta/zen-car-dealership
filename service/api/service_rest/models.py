from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200)
    sold = models.BooleanField(default=False)

class Status(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("id",)
        verbose_name_plural = "statuses"

class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)

    def get_api_url(self):
        return reverse("show_technician", kwargs={"id": self.id})

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )
    status = models.ForeignKey(
        Status,
        related_name = "appointments",
        on_delete=models.PROTECT,
    )
    def get_api_url(self):
        return reverse("show_appointment", kwargs={"id": self.id})

    @classmethod
    def create(cls, **kwargs):
        status, _ = Status.objects.get_or_create(name="created")
        kwargs["status"] = status
        appointment = cls(**kwargs)
        appointment.save()
        return appointment

    def finish(self):
        status = Status.objects.get(name="finished")
        self.status = status
        self.save()

    def cancel(self):
        status = Status.objects.get(name="cancelled")
        self.status = status
        self.save()

    def __str__(self):
        return self.reason
