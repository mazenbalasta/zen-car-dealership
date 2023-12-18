from django.urls import path
from .views import (
    api_list_sales_people,
    api_show_sales_person,
    api_list_customers,
    api_show_customer,
    api_list_sales,
    api_show_sale,
)


urlpatterns = [
    path("salespeople/", api_list_sales_people, name="api_list_sales_people"),
    path("salespeople/<int:id>/", api_show_sales_person, name="api_show_sales_person"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customers/<int:id>/", api_show_customer, name="api_show_customer"),
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:id>/", api_show_sale, name="api_show_sale"),
]
