import { useEffect, useState } from 'react';
import { formatDateTime } from './Functions';

function ServiceAppointmentList () {
    const [appointments, setAppointments] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);

    const getData = async () => {
      const response = await fetch('http://localhost:8080/api/appointments/');

      if (response.ok) {
          const data = await response.json();
          setAppointments(data.appointments);
      }

      const automobileResponse = await fetch('http://localhost:8100/api/automobiles/');
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

    const handleFinish = async (id) => {
      const request = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {method: "PUT"});
      getData();
    }

    const handleCancel = async (id) => {
      const request = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {method: "PUT"});
      getData();
    }

    return(
      <>
        <h1>Service Appointments</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>VIN</th>
              <th>is VIP?</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason</th>
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
                  <td>{ appointment.vin }</td>
                  <td>{ isVip(appointment.vin) ? 'Yes' : 'No' }</td>
                  <td>{ appointment.customer }</td>
                  <td>{ formattedDate }</td>
                  <td>{ formattedTime }</td>
                  <td>{ technicianFullName }</td>
                  <td>{ appointment.reason }</td>
                  <td><button className="btn btn-success" onClick={() => {handleFinish(appointment.id)}}>Finish</button></td>
                  <td><button className="btn btn-danger" onClick={() => {handleCancel(appointment.id)}}>Cancel</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary" data-bs-toggle="button">
          Add A Service Appointment
        </button>
      </>
    );
};

export default ServiceAppointmentList
