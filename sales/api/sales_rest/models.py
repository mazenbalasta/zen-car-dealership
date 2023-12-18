from django.db import models

# Create your models here.


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200)
    vin = models.CharField(max_length=17)

    def __str__(self):
        return self.vin
