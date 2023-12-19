import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from './TechnicianList'
import NewTechnicianForm from './NewTechnicianForm'
import NewAppointmentForm from './NewAppointmentForm'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians" element={<TechnicianList />} />
          <Route path="/technicians/new" element={<NewTechnicianForm />} />
          <Route path="/appointments/new" element={<NewAppointmentForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
