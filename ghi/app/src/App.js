import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './Sales/CustomerForm';
import RecordSaleForm from './Sales/RecordSaleForm';
import ListSalesPeople from './Sales/ListSalesPeople';
import ListAllSales from './Sales/ListAllSales';
import ListCustomers from './Sales/ListCustomers';
import SalesPersonForm from './Sales/SalesPersonForm';
// import ManufacturersList from './Inventory/ManufacturesList';
// import AutomobileList from './Inventory/AutomobileList';
// import ModelsList from './Inventory/ModelList';
// import TechnicianForm from './Service/AddTechnicianForm';
// import TechnicianList from './Service/ListTechnicians';
// import AppointmentForm from './Service/CreateApptForm';
// import AppointmentList from './Service/ListServiceAppts';
// import AppointmentHistoryList from './Service/ListServiceHistory';
// import AutomobileForm from './Inventory/CreateAutomobileForm';
// import ManufacturerForm from './Inventory/CreateManufacturerForm';
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
          {/* <Route path="models/create/" element={<VehicleModelForm />} />
          <Route path="manufacturers/create/" element={<ManufacturerForm />} />
          <Route path="automobiles/create/" element={<AutomobileForm />} />
          <Route path="technicians/create/" element={<TechnicianForm />} />
          <Route path="technicians/" element={<TechnicianList />} />
          <Route path="appointments/create/" element={<AppointmentForm />} />
          <Route path="appointments/" element={<AppointmentList />}/>
          <Route path="appointments/history/" element={<AppointmentHistoryList />}/>
          <Route path="manufacturers/list/" element={<ManufacturersList />}/>
          <Route path="automobiles/list/" element={<AutomobileList />}/>
          <Route path="models/list/" element={<ModelsList />}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
