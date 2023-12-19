from django.contrib import admin
from .models import SalesPerson, Customer, RecordOfSale, AutomobileVO


admin.site.register(SalesPerson)
admin.site.register(Customer)
admin.site.register(RecordOfSale)
admin.site.register(AutomobileVO)
