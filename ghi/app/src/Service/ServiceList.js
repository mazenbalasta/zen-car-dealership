import { useEffect, useState } from 'react';
import { formatDateTime } from './Functions';
import { useNavigate } from "react-router-dom";

function ServiceAppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
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

  const handleFinish = async (id, vin) => {
    const confirmFinish = window.confirm('Is this appointment finished?');
    if (confirmFinish) {
      const request = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, { method: "PUT" });
      getData();
      if (request.ok) {
        window.alert(`Service appointment for vin number: ${vin} marked finished!`)
      }
    }
  }

  const handleCancel = async (id, vin) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this appointment?');
    if (confirmCancel) {
      const request = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, { method: "PUT" });
      getData();
      if (request.ok) {
        window.alert(`Service appointment for vin number: ${vin} cancelled`)
      }
    }
  }

  return (
    <>
      <h1>Service Appointments</h1>
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
            <th>Finished?</th>
            <th>Cancelled?</th>
          </tr>
        </thead>
        <tbody>
          {appointments
            .filter(appointment => appointment.status === "created")
            .map(appointment => {
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
                  <td><button className="btn btn-success" onClick={() => { handleFinish(appointment.id, appointment.vin) }}>Finish</button></td>
                  <td><button className="btn btn-danger" onClick={() => { handleCancel(appointment.id, appointment.vin) }}>Cancel</button></td>
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
};

export default ServiceAppointmentList
