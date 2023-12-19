from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .encoders import (
    AutomobileVOEncoder,
    SalesPersonEncoder,
    CustomerEncoder,
    RecordOfSaleEncoder,
)
from .models import AutomobileVO, SalesPerson, Customer, RecordOfSale
import json


@require_http_methods(["GET"])
def api_list_automobile_vo(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles}, encoder=AutomobileVOEncoder, sold=False
        )


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salespeople = SalesPerson.objects.all()
        return JsonResponse({"salespeople": salespeople}, encoder=SalesPersonEncoder)
    else:
        content = json.loads(request.body)
        try:
            salespeople = SalesPerson.objects.create(**content)
            return JsonResponse(salespeople, encoder=SalesPersonEncoder, safe=False)
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Salesperson already exists"})
            response.status_code = 400
            return response
        except:
            response = JsonResponse({"message": "Unable to create salesperson"})
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE", "PUT"])
def api_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = SalesPerson.objects.get(id=id)
            return JsonResponse(salesperson, encoder=SalesPersonEncoder, safe=False)
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Salesperson does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = SalesPerson.objects.get(employee_id=id).delete()
            return JsonResponse({"confirmation": "Salesperson deleted"})
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Salesperson does not exist"}, status=404)
    else:
        try:
            content = json.loads(request.body)
            SalesPerson.objects.filter(id=id).update(**content)
            salesperson = SalesPerson.objects.get(id=id)
            return JsonResponse(salesperson, encoder=SalesPersonEncoder, safe=False)
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Salesperson does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse({"customers": customers}, encoder=CustomerEncoder)
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
        except:
            response = JsonResponse({"message": "Unable to create customer"})
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE", "PUT"])
def api_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.filter(id=id).delete()
            return JsonResponse({"confirmation": "customer deleted"})
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer does not exist"}, status=404)

    else:
        try:
            content = json.loads(request.body)
            Customer.objects.filter(id=id).update(**content)
            customer = Customer.objects.get(id=id)
            return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_record_of_sales(request):
    sales = []
    if request.method == "GET":
        sales = RecordOfSale.objects.all()
        return JsonResponse({"sales": sales}, encoder=RecordOfSaleEncoder, safe=False)
    else:
        content = json.loads(request.body)
        try:
            sales_person = content["sales_person"]
            individual_sale = SalesPerson.objects.get(employee_id=sales_person)
            content["sales_person"] = individual_sale
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "This sales person does not exist"},
                status=404,
            )
        try:
            id_customer = content["customer"]
            customer = Customer.objects.get(id=id_customer)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "This customer does not exist"},
                status=404,
            )
        try:
            vin = content["automobile"]
            auto = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = auto
            content["automobile"].sold = True
            content["automobile"].save()
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile does not exist or has been sold"},
                status=404,
            )
        price = content["price"]
        sale = RecordOfSale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=RecordOfSaleEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_record_of_sale(request, id):
    if request.method == "GET":
        try:
            sale = RecordOfSale.objects.get(id=id)
            return JsonResponse(sale, encoder=RecordOfSaleEncoder, safe=False)
        except RecordOfSale.DoesNotExist:
            response = JsonResponse({"message": "Sales record does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sale = RecordOfSale.objects.get(id=id).delete()
            return JsonResponse({"confirmation": "sales record deleted"})
        except RecordOfSale.DoesNotExist:
            return JsonResponse({"message": "Sales record does not exist"}, status=404)
    else:
        try:
            content = json.loads(request.body)
            RecordOfSale.objects.filter(id=id).update(**content)
            sales_record = RecordOfSale.objects.get(id=id)
            return JsonResponse(sales_record, encoder=RecordOfSaleEncoder, safe=False)
        except RecordOfSale.DoesNotExist:
            response = JsonResponse({"message": "Sales record does not exist"})
            response.status_code = 404
            return response








# from django.http import JsonResponse
# from django.views.decorators.http import require_http_methods
# import json
# from .models import AutomobileVO, SalesPerson, Customer, SalesRecord
# from .encoders import AutomobileVOEncoder, SalesPersonEncoder, CustomerEncoder, SalesRecordEncoder

# # SALES PEOPLE ################


# @require_http_methods(["GET", "POST"])
# def api_list_sales_people(request):
#     if request.method == "GET":
#         sales_people = SalesPerson.objects.all()
#         return JsonResponse(
#                 sales_people,
#                 encoder=SalesPersonEncoder,
#                 safe=False,
#             )

#     if request.method == "POST":
#         content = json.loads(request.body)
#         try:
#             salesperson = SalesPerson.objects.create(**content)
#             return JsonResponse(
#                 salesperson,
#                 encoder=SalesPersonEncoder,
#                 safe=False,
#             )
#         except ValueError:
#             return JsonResponse(
#                 {"message": "Could not create"},
#                 status=500,
#             )


# @require_http_methods(["GET", "DELETE"])
# def api_show_sales_person(request, pk):
#     if request.method == "GET":
#         try:
#             sales_person = SalesPerson.objects.get(id=pk)
#             return JsonResponse(
#                 sales_person,
#                 encoder=SalesPersonEncoder,
#                 safe=False
#             )
#         except SalesPerson.DoesNotExist:
#             return JsonResponse(
#                 {"message": "Does not exist"},
#                 status=404,
#             )
#     if request.method == "DELETE":
#         salesperson = SalesPerson.objects.get(id=pk)
#         salesperson.delete()
#         return JsonResponse(
#             salesperson,
#             encoder=SalesPersonEncoder,
#             safe=False,
#         )

# # CUSTOMERS ################


# @require_http_methods(["GET", "POST"])
# def api_list_customer(request):
#     if request.method == "GET":
#         customer = Customer.objects.all()
#         return JsonResponse(
#                 customer,
#                 encoder=CustomerEncoder,
#                 safe=False,
#             )
#     if request.method == "POST":
#         content = json.loads(request.body)
#         try:
#             customer = Customer.objects.create(**content)
#             return JsonResponse(
#                 customer,
#                 encoder=CustomerEncoder,
#                 safe=False,
#             )
#         except:
#             return JsonResponse(
#                 {"message": "Could not create"},
#                 status=500,
#             )


# @require_http_methods(["GET", "DELETE"])
# def api_show_customer(request, pk):
#     try:
#         if request.method == "GET":
#             customer = Customer.objects.get(id=pk)
#             return JsonResponse(
#                 customer,
#                 encoder=CustomerEncoder,
#                 safe=False
#             )
#     except Customer.DoesNotExist:
#         return JsonResponse(
#             {"message": "Does not exist"},
#             status=404,
#         )
#     if request.method == "DELETE":
#         customer = Customer.objects.get(id=pk)
#         customer.delete()
#         return JsonResponse(
#             customer,
#             encoder=CustomerEncoder,
#             safe=False,
#         )

# # SALES RECORD #################


# @require_http_methods(["GET", "POST"])
# def api_list_salesrecords(request):
#     if request.method == "GET":
#         record = SalesRecord.objects.all()
#         return JsonResponse(
#                 record,
#                 encoder=SalesRecordEncoder,
#                 safe=False,
#             )
#     if request.method == "POST":
#         content = json.loads(request.body)
#         try:
#             automobile_href = content["automobile"]
#             automobile = AutomobileVO.objects.get(import_href=automobile_href)
#             if automobile.available is True:
#                 content["automobile"] = automobile

#                 customer_name = content["customer"]
#                 customer = Customer.objects.get(name=customer_name)
#                 content["customer"] = customer

#                 sales_person = content["sales_person"]
#                 salesperson = SalesPerson.objects.get(name=sales_person)
#                 content["sales_person"] = salesperson

#                 automobile.available = False
#                 automobile.save()

#                 record = SalesRecord.objects.create(**content)
#                 return JsonResponse(
#                     record,
#                     encoder=SalesRecordEncoder,
#                     safe=False,
#                 )
#             else:
#                 response = JsonResponse(
#                     {"message": "Sorry! No longer available."}
#                 )
#             response.status_code = 400
#             return response
#         except:
#             return JsonResponse(
#                 {"message": "Could not create"},
#                 status=500,
#             )


# @require_http_methods(["GET", "DELETE"])
# def api_show_salesrecord(request, pk):
#     if request.method == "GET":
#         try:
#             record = SalesRecord.objects.get(id=pk)
#             return JsonResponse(
#                 record,
#                 encoder=SalesRecordEncoder,
#                 safe=False
#             )
#         except SalesRecord.DoesNotExist:
#             return JsonResponse(
#                 {"message": "Does not exist"},
#                 status=404,
#             )
#     if request.method == "DELETE":
#         record = SalesRecord.objects.get(id=pk)
#         record.delete()

#         return JsonResponse(
#             record,
#             encoder=SalesRecordEncoder,
#             safe=False,
#         )


# # CHECKING TO SEE IF POLLING IS WORKING CORRECTLY ################

# @require_http_methods(["GET"])
# def api_list_automobiles(request):
#     if request.method == "GET":
#         cars = AutomobileVO.objects.all()
#         return JsonResponse(
#             cars,
#             encoder=AutomobileVOEncoder,
#             safe=False,
#         )
