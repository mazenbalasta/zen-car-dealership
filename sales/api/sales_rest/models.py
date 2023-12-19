from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


class SalesPerson(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    employee_id = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Customer(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=12, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class RecordOfSale(models.Model):
    price = models.PositiveIntegerField()
    automobile = models.ForeignKey("AutomobileVO", related_name="automobile", on_delete=models.CASCADE)
    sales_person = models.ForeignKey("SalesPerson", related_name="sales_person", on_delete=models.PROTECT)
    customer = models.ForeignKey("Customer", related_name="customer", on_delete=models.PROTECT)







# from django.db import models
# from django.urls import reverse

# # Create your models here.


# class AutomobileVO(models.Model):
#     import_href = models.CharField(max_length=200, unique=True)
#     color = models.CharField(max_length=50, null=True)
#     year = models.PositiveSmallIntegerField(null=True)
#     vin = models.CharField(max_length=17, unique=True)
#     available = models.BooleanField(default=True)

#     def __str__(self):
#         return self.vin


# class SalesPerson(models.Model):
#     name = models.CharField(max_length=50)
#     employee_number = models.PositiveSmallIntegerField(unique=True)

#     def get_api_url(self):
#         return reverse("api_list_sales_people", kwargs={"pk": self.pk})

#     def __str__(self):
#         return self.name


# class Customer(models.Model):
#     name = models.CharField(max_length=50)
#     address = models.CharField(max_length=200)
#     phone_number = models.CharField(max_length=10)

#     def get_api_url(self):
#         return reverse("api_show_customer", kwargs={"pk": self.pk})

#     def __str__(self):
#         return self.name


# class SalesRecord(models.Model):
#     automobile = models.ForeignKey(
#         AutomobileVO,
#         related_name="sales",
#         on_delete=models.CASCADE,
#     )
#     sales_person = models.ForeignKey(
#         SalesPerson,
#         related_name="sales",
#         on_delete=models.CASCADE,
#     )
#     customer = models.ForeignKey(
#         Customer,
#         related_name="sales",
#         on_delete=models.CASCADE,
#     )
#     price = models.CharField(max_length=200)

#     def get_api_url(self):
#         return reverse("api_show_salesrecord", kwargs={"pk": self.pk})

#     def __str__(self):
#         return f"Car: {self.automobile} | Customer: {self.customer} "
