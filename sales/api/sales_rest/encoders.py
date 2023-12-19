from .models import AutomobileVO, SalesPerson, Customer, RecordOfSale
from common.json import ModelEncoder


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["first_name", "last_name", "employee_id", "id"]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "address", "phone_number", "id"]


class RecordOfSaleEncoder(ModelEncoder):
    model = RecordOfSale
    properties = ["price", "automobile", "sales_person", "customer", "id"]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
    }
