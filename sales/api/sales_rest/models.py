from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


class SalesPerson(models.Model):
    employee_id = models.CharField(max_length=255, unique=True, default="Unknown")
    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Customer(models.Model):
    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255, null=True)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=12, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class RecordOfSale(models.Model):
    price = models.PositiveIntegerField()
    automobile = models.ForeignKey(
        "AutomobileVO", related_name="automobile", on_delete=models.CASCADE
    )
    sales_person = models.ForeignKey(
        "SalesPerson", related_name="sales_person", on_delete=models.PROTECT
    )
    customer = models.ForeignKey(
        "Customer", related_name="customer", on_delete=models.PROTECT
    )
