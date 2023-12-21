import { useEffect, useState } from 'react';
import { formatDateTime } from './Functions';
import { useNavigate } from "react-router-dom";

function ServiceHistory() {
  const [appointments, setAppointments] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [searchParam, setSearchParam] = useState('');
  const navigate = useNavigate();

  const getData = async () => {
    const response = await fetch('http://localhost:8080/api/appointments/');

    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
    }

    const automobileResponse = await fetch('http://localhost:8080/api/automobiles/');
    if (automobileResponse.ok) {
      const automobiles = await automobileResponse.json();
      setAutomobiles(automobiles.autos);
    }
  }

  useEffect(() => {
    getData()
  }, []);

  const isVip = (vin) => {
    const autosVin = automobiles.map(auto => auto.vin);
    return autosVin.includes(vin);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchParam === '') {
      getData();
    } else {
      const filteredAppointments = appointments.filter(appointment =>
        appointment.vin.includes(searchParam)
      );
      setAppointments(filteredAppointments);
    }
  };


  return (
    <>
      <h1>Service History</h1>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <input
            type="text"
            id="search"
            className="form-control"
            placeholder='Search by Vin...'
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
        <button type="submit" className="btn btn-primary mt-3">Search</button>
      </div>
      </form>
      <table className="table table-striped">
        <thead>
          <tr className="table-success">
            <th>VIN</th>
            <th>is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => {
            const { formattedDate, formattedTime } = formatDateTime(appointment.date_time);
            const technicianFullName = `${appointment.technician.first_name} ${appointment.technician.last_name}`;
            return (
              <tr key={appointment.href}>
                <td>{appointment.vin}</td>
                <td>{isVip(appointment.vin) ? 'Yes' : 'No'}</td>
                <td>{appointment.customer}</td>
                <td>{formattedDate}</td>
                <td>{formattedTime}</td>
                <td>{technicianFullName}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => navigate("/appointments/new")} type="button" className="btn btn-primary" data-bs-toggle="button">
        Add A Service Appointment
      </button>
    </>
  );
}

export default ServiceHistory
