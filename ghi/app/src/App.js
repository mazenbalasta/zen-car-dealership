import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from './TechnicianList'
import NewTechnicianForm from './NewTechnicianForm'
import NewServiceAppointmentForm from './NewServiceForm'
import ServiceAppointmentList from './ServiceList'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
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
