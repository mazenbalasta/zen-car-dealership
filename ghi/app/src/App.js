import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListCustomers from './Sales/ListCustomers';
import CustomerForm from './Sales/CustomerForm';
import RecordSaleForm from './Sales/RecordSaleForm';
import ListSalesPeople from './Sales/ListSalesPeople';
import ListAllSales from './Sales/ListAllSales';
import SalesPersonForm from './Sales/SalesPersonForm';
import AutomobileList from './Inventory/AutomobileList';
import TechnicianList from './Service/TechnicianList';
import NewTechnicianForm from './Service/NewTechnicianForm';
import NewServiceAppointmentForm from './Service/NewServiceForm';
import ServiceAppointmentList from './Service/ServiceList';
import AutomobileForm from './Inventory/CreateAutomobileForm';
import ServiceHistory from './Service/ServiceHistory';
// import ManufacturersList from './Inventory/ManufacturesList';
// import ManufacturerForm from './Inventory/CreateManufacturerForm';
// import ModelsList from './Inventory/ModelList';
// import VehicleModelForm from './Inventory/CreateVehicleModelForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="customers/list/" element={<ListCustomers />} />
          <Route path="customers/" element={<CustomerForm />} />
          <Route path="salespeople/list/" element={<ListSalesPeople />} />
          <Route path="salespeople/" element={<SalesPersonForm />} />
          <Route path="sales/" element={<RecordSaleForm />} />
          <Route path="sales/history/" element={<ListAllSales />} />
          <Route path="/technicians" element={<TechnicianList />} />
          <Route path="/technicians/new" element={<NewTechnicianForm />} />
          <Route path="/appointments" element={<ServiceAppointmentList />} />
          <Route path="/appointments/new" element={<NewServiceAppointmentForm />} />
          <Route path="/appointments/history" element={<ServiceHistory />} />
          <Route path="automobiles/list/" element={<AutomobileList />}/>
          <Route path="automobiles/create/" element={<AutomobileForm />} />
          {/* <Route path="manufacturers/list/" element={<ManufacturersList />}/> */}
          {/* <Route path="manufacturers/create/" element={<ManufacturerForm />} /> */}
          {/* <Route path="models/list/" element={<ModelsList />}/> */}
          {/* <Route path="models/create/" element={<VehicleModelForm />} /> */}

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
