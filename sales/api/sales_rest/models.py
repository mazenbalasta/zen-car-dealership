from django.db import models
from django.urls import reverse

# Create your models here.


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200)
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


class SalesPerson(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name


class Customer(models.Model):
    name = models.CharField(max_length=200)
    street = models.CharField(max_length=200)
    apartment = models.CharField(max_length=100, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=2)
    zip_code = models.PositiveIntegerField()
    phone_number = models.CharField(max_length=12)

    @property
    def address(self):
        if self.apartment is None or self.apartment == "":
            return f"{self.street}, {self.city}, {self.state} {self.zip_code}"
        return (
            f"{self.street} {self.apartment}, "
            f"{self.city}, {self.state} {self.zip_code}"
        )

    def __str__(self):
        return self.name


class Sale(models.Model):
    price = models.PositiveIntegerField()
    automobile = models.OneToOneField(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.PROTECT,
    )

    def get_api_url(self):
        return reverse("api_show_sale", kwargs={"id": self.id})

    def __str__(self):
        return f"{self.automobile} - {self.customer}"
