from django.urls import path
from .views import api_list_sales_people, api_show_sales_person
from .views import (
    api_list_customer,
    api_show_customer,
    api_list_salesrecords,
    api_show_salesrecord,
    api_list_automobiles,
)

urlpatterns = [
    path("sales-people/", api_list_sales_people, name="api_list_sales_people"),
    path("sales-people/<int:id>/", api_show_sales_person, name="api_show_sales_person"),
    path("customers/", api_list_customer, name="api_list_customer"),
    path("customers/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("salesrecords/", api_list_salesrecords, name="api_list_salesrecords"),
    path("salesrecords/<int:pk>/", api_show_salesrecord, name="api_show_salesrecord"),
    path("automobiles/", api_list_automobiles, name="api_list_automobile"),
]
