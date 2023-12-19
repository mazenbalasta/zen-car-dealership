from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord
from common.json import ModelEncoder


# ENCODERS ##############


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "color", "year", "vin", "available"]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["name", "employee_number", "id"]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["name", "address", "phone_number", "id"]


class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = ["automobile", "sales_person", "customer", "price", "id"]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
    }

    def get_extra_data(self, o):
        return {"automobile": o.automobile.vin}

# SALES PEOPLE ################


@require_http_methods(["GET", "POST"])
def api_list_sales_people(request):
    if request.method == "GET":
        sales_people = SalesPerson.objects.all()
        return JsonResponse(
                sales_people,
                encoder=SalesPersonEncoder,
                safe=False,
            )

    if request.method == "POST":
        content = json.loads(request.body)
        try:
            salesperson = SalesPerson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except ValueError:
            return JsonResponse(
                {"message": "Could not create"},
                status=500,
            )


@require_http_methods(["GET", "DELETE"])
def api_show_sales_person(request, pk):
    if request.method == "GET":
        try:
            sales_person = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404,
            )
    if request.method == "DELETE":
        salesperson = SalesPerson.objects.get(id=pk)
        salesperson.delete()
        return JsonResponse(
            salesperson,
            encoder=SalesPersonEncoder,
            safe=False,
        )

# CUSTOMERS ################


@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
    if request.method == "POST":
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Could not create"},
                status=500,
            )


@require_http_methods(["GET", "DELETE"])
def api_show_customer(request, pk):
    try:
        if request.method == "GET":
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
    except Customer.DoesNotExist:
        return JsonResponse(
            {"message": "Does not exist"},
            status=404,
        )
    if request.method == "DELETE":
        customer = Customer.objects.get(id=pk)
        customer.delete()
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )

# SALES RECORD #################


@require_http_methods(["GET", "POST"])
def api_list_salesrecords(request):
    if request.method == "GET":
        record = SalesRecord.objects.all()
        return JsonResponse(
                record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
    if request.method == "POST":
        content = json.loads(request.body)
        try:
            automobile_href = content["automobile"]
            automobile = AutomobileVO.objects.get(import_href=automobile_href)
            if automobile.available is True:
                content["automobile"] = automobile

                customer_name = content["customer"]
                customer = Customer.objects.get(name=customer_name)
                content["customer"] = customer

                sales_person = content["sales_person"]
                salesperson = SalesPerson.objects.get(name=sales_person)
                content["sales_person"] = salesperson

                automobile.available = False
                automobile.save()

                record = SalesRecord.objects.create(**content)
                return JsonResponse(
                    record,
                    encoder=SalesRecordEncoder,
                    safe=False,
                )
            else:
                response = JsonResponse(
                    {"message": "Sorry! No longer available."}
                )
            response.status_code = 400
            return response
        except:
            return JsonResponse(
                {"message": "Could not create"},
                status=500,
            )


@require_http_methods(["GET", "DELETE"])
def api_show_salesrecord(request, pk):
    if request.method == "GET":
        try:
            record = SalesRecord.objects.get(id=pk)
            return JsonResponse(
                record,
                encoder=SalesRecordEncoder,
                safe=False
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404,
            )
    if request.method == "DELETE":
        record = SalesRecord.objects.get(id=pk)
        record.delete()

        return JsonResponse(
            record,
            encoder=SalesRecordEncoder,
            safe=False,
        )


# CHECKING TO SEE IF POLLING IS WORKING CORRECTLY ################

@require_http_methods(["GET"])
def api_list_automobiles(request):
    if request.method == "GET":
        cars = AutomobileVO.objects.all()
        return JsonResponse(
            cars,
            encoder=AutomobileVOEncoder,
            safe=False,
        )
