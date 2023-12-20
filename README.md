# CarCar

Team:

- Jeremy Kilcrease - Sales microservice
- Mazen Balasta - Service microservice

## Design

The design of this project is based on a microservices architecture, where each microservice is responsible for a specific functionality of the application. The project is divided into three main parts:

Frontend (React Application): The frontend of the application is built using React and is located in the ghi/app directory. It provides a user interface for interacting with the backend services. The frontend communicates with the backend services through HTTP requests.

Backend (Microservices): The backend of the application consists of three microservices: "Sales", "Inventory", and "Service". Each microservice is a Django application and is responsible for a specific part of the application's functionality:

-Sales Microservice: Manages sales-related data. It provides API endpoints for creating, retrieving, updating, and deleting sales records, salespeople, and customers. The code for this service is located in the sales/api directory.

-Inventory Microservice: Manages the inventory of automobiles. It provides API endpoints for creating, retrieving, updating, and deleting automobiles, manufacturers, and vehicle models. The code for this service is located in the inventory/api directory.

-Service Microservice: Manages service appointments for automobiles. It provides API endpoints for creating, retrieving, updating, and deleting service appointments and technicians. The code for this service is located in the service/api directory.

Database: Each microservice uses a PostgreSQL database for data storage. The database configuration for each service is located in the settings.py file in the respective microservice's directory.

Docker: The microservices and the frontend application are containerized using Docker, and the services are orchestrated using Docker Compose. The Docker configuration for each service is located in the Dockerfile.dev file in the respective service's directory, and the Docker Compose configuration is located in the docker-compose.yml file at the root of the project.

Polling Services: The backend also includes a polling service for each microservice, located in the poll directory of the respective microservice's directory. The polling services are responsible for periodically checking for updates in the microservices and synchronizing the data between them.

The design of this project allows for high scalability and maintainability, as each microservice can be developed, deployed, and scaled independently.

## Installation

1. Fork and clone the repository at https://gitlab.com/sjp19-public-resources/sjp-2022-april/project-beta
2. Run the following commands on your computer
```
docker volume create beta-data
docker-compose build
docker-compose up
```
3. When you run docker-compose up and if you're on macOS, you will see a warning about an environment variable named OS being missing. You can safely ignore this.

## Disclaimer

This application loads with an empty database. To fully interact with this application, please create at least one of the following in this order:

1. Manufacturer
2. Vehicle model
3. Automobile
4. Sales person
5. Customers
6. Sale
7. Technician
8. Appointment

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

**Description:**
The Sales microservice integrates with the Inventory microservice through the AutomobileVO model. When an automobile is sold, the sold field of the corresponding AutomobileVO instance is updated to True. This change is then propagated to the Inventory microservice, which updates its own record of the automobile's status.

The Sales microservice also exposes several API endpoints for creating, retrieving, updating, and deleting sales records, salespeople, and customers. These endpoints are defined in the sales/api/sales_rest/views.py file.

**Models:**
The Sales microservice in your application is primarily responsible for managing sales-related data. It consists of several models defined in the sales/api/sales_rest/models.py file:

-AutomobileVO: This model represents an automobile in the inventory. It has a vin field for the Vehicle Identification Number, which is unique for each automobile, and a sold field to indicate whether the automobile has been sold.

-SalesPerson: This model represents a salesperson. It contains information about the salesperson.

-Customer: This model represents a customer. It contains information about the customer.

-RecordOfSale: This model represents a record of a sale. It contains the price of the sale, and foreign keys to the AutomobileVO, SalesPerson, and Customer involved in the sale.

**URLs:**

- GET: http://localhost:8090/api/salespeople/ (Shows all salespeople)
- POST: http://localhost:8090/api/salespeople/ (Create a salesperson)
- DELETE: http://localhost:8090/api/salespeople/:id/ (Delete a salesperson)
- GET: http://localhost:8090/api/customers/ (Shows all customers)
- POST: http://localhost:8090/api/customers/ (Create a customer)
- DELETE: http://localhost:8090/api/customers/:id/ (Delete a customer)
- GET: http://localhost:8090/api/sales/ (Shows all the sales)
- POST: http://localhost:8090/api/sales/ (Create a sale)
- DELETE: http://localhost:8090/api/sales/:id (Delete a sale)

**Sample Data in JSON:**

- Create a salesperson:

```
{
	"name": "Jimmy Jon",
	"employee_number": 123
}
```

- Create a customer:

```
{
    "first_name": "Jimbo",
    "last_name": "Fisher",
    "address": "210 red ln, austin, tx, 78681",
    "phone_number": 2103243287
}
```

- Create a sale:

```
{
    "price": 130,
    "automobile": "sampleVIN123",
    "sales_person": "1",
    "customer": "1"
}
```

## Inventory microservice

The Inventory microservice in your application is primarily responsible for managing the inventory of automobiles. It consists of several models defined in the inventory/api/inventory_rest/models.py file:

-Manufacturer: This model represents a car manufacturer. It has a name field which is a unique string representing the name of the manufacturer.

-VehicleModel: This model represents a model of a vehicle. It has a name field for the model name, a picture_url field for the URL of the model's picture, and a manufacturer field which is a foreign key to the Manufacturer model. This means each VehicleModel is associated with a Manufacturer.

-Automobile: This model represents an automobile in the inventory. It has several fields including color, year, vin (Vehicle Identification Number), sold (a boolean indicating whether the automobile has been sold), and model which is a foreign key to the VehicleModel model. This means each Automobile is associated with a VehicleModel.

The Inventory microservice exposes several API endpoints for creating, retrieving, updating, and deleting automobiles, manufacturers, and vehicle models. These endpoints are defined in the inventory/api/inventory_rest/views.py file.

The Inventory microservice integrates with the rest of the project through these models and API endpoints. For example, the Sales microservice can retrieve information about automobiles in the inventory by making a GET request to the appropriate endpoint in the Inventory microservice. When an automobile is sold, the Sales microservice can update the sold field of the corresponding Automobile instance in the Inventory microservice by making a PUT request to the appropriate endpoint.

**URLs:**

- GET: http://localhost:8100/api/manufacturers/ (Shows all manufacturers)
- POST: http://localhost:8100/api/manufacturers/ (Create a manufacturer)
- GET: http://localhost:8100/api/manufacturers/:id/ (Show a specific manufacturer)
- POST: http://localhost:8100/api/manufacturers/:id/ (Update a specific manufacturer)
- DELETE: http://localhost:8100/api/manufacturers/:id/ (Delete a specific manufacturer)
- GET: http://localhost:8100/api/models/ (Shows all vehicle models)
- POST: http://localhost:8100/api/models/ (Create a vehicle model)
- GET: http://localhost:8100/api/models/:id/ (Show a specific vehicle model)
- PUT: http://localhost:8100/api/models/:id/ (Update a specific vehicle model)
- DELETE: http://localhost:8100/api/models/:id/ (Delete a specific vehicle model)
- GET: http://localhost:8100/api/automobiles/ (Shows all automobiles)
- POST: http://localhost:8100/api/automobiles/ (create an automobile)
- GET: http://localhost:8100/api/automobiles/:vin/ (Show a specific automobile)
- PUT: http://localhost:8100/api/automobiles/:vin/ (Update a specific automobile)
- DELETE: http://localhost:8100/api/automobiles/:vin/ (Delete a specific automobile)

**Sample Data in JSON:**

- Create a manufacturer

```
{
  "name": "Dodge"
}

```

- Create a vehicle model

```
{
  "name": "Mammoth",
  "picture_url": "https://sample.com",
  "manufacturer_id": 3
}
```

- Create an automobile

```
{
  "color": "Black",
  "year": 2024,
  "vin": "sampleVIN123",
  "model_id": 4
}
```
