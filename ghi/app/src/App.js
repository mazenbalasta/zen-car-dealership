import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from './TechnicianList'
import NewTechnicianForm from './NewTechnicianForm'
import NewSale from './Sales/NewSale';
import ListSales from './Sales/ListSales';
import NewSalesPerson from './Sales/NewSalesPerson';
import NewCustomer from './Sales/NewCustomer';
import ListSalesPersonsSales from './Sales/ListSalesPersonsSales';
import { useState, useEffect } from 'react';

function App() {

  // FETCHING THE DATA /////////////////

  const [manufacturers, setManufacturers] = useState([]);
  const fetchManufacturers = async () => {
    const url = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers)
    }
  }

  const [models, setModels] = useState([]);
  const fetchModels = async () => {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models)
    }
  }

  const [automobiles, setAutomobiles] = useState([]);
  const fetchAutomobiles = async () => {
    const url = 'http://localhost:8090/api/automobiles/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data)
    }
  }

  const [salespersons, setSalesperson] = useState([]);
  const fetchSalesperson = async () => {
    const url = 'http://localhost:8090/api/salesperson/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSalesperson(data)
    }
  }

  const [customers, setCustomer] = useState([]);
  const fetchCustomer = async () => {
    const url = 'http://localhost:8090/api/customers/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setCustomer(data)
    }
  }

  const [sales, setSales] = useState([]);
  const fetchSales = async () => {
    const url = 'http://localhost:8090/api/salesrecords/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSales(data)
    }
  }


  // USING THE EFFECTS /////////////////////

  useEffect(() => {
    fetchManufacturers();
    fetchModels();
    fetchAutomobiles();
    fetchSalesperson();
    fetchCustomer();
    fetchSales();
  }, []);


  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route path="" element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="models/">
            <Route path="" element={<VehicleModelList models={models} />} />
            <Route path="new/" element={<VehicleModelForm fetchModels={fetchModels} />} />
          </Route>
          <Route path="/automobiles/" element={<AutomobileList />} />
          {/* <Route path="/automobiles/new" element={<AutomobileForm />} /> */}
          <Route path="/sales/new" element={<NewSale automobiles={automobiles} salespersons={salespersons} customers={customers} fetchSales={fetchSales} />} />
          <Route path="/sales" element={<ListSales sales={sales} />} />
          <Route path="/salesperson/new" element={<NewSalesPerson salespersons={salespersons} fetchSalesperson={fetchSalesperson} />} />
          <Route path="/customer/new" element={<NewCustomer customers={customers} fetchCustomer={fetchCustomer} />} />
          <Route path="/salesperson/sales" element={<ListSalesPersonsSales salespersons={salespersons} sales={sales} />} />
          <Route path="/technicians" element={<TechnicianList />} />
          <Route path="/technicians/new" element={<NewTechnicianForm />} />
          <Route path="/appointments" element={<ServiceAppointmentList />} />
          <Route path="/appointments/new" element={<NewServiceAppointmentForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
