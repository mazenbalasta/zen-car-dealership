from django.urls import path

from .views import (
    api_list_automobile_vo,
    api_salespeople,
    api_salesperson,
    api_customers,
    api_customer,
    api_record_of_sales,
    api_record_of_sale,
)


urlpatterns = [
    path("automobiles/", api_list_automobile_vo, name="api_list_automobile_vo"),
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salespeople/<int:id>/", api_salesperson, name="api_salesperson"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:id>/", api_customer, name="api_customer"),
    path("sales/", api_record_of_sales, name="api_record_of_sales"),
    path("sales/<int:id>/", api_record_of_sale, name="api_record_of_sale"),
]
