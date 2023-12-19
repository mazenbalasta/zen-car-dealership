import { useEffect, useState } from 'react';

function ServiceAppointmentList () {
    const [appointments, setAppointments] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
            console.log(data)
        }
    }

    useEffect(() => {
        getData()
    }, []);

    const formatDateTime = (dateTime) => {
        const formattedDate = new Date(dateTime).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });

        const formattedTime = new Date(dateTime).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        return { formattedDate, formattedTime };
      };



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
                  <td>{ appointment.vin }</td>
                  <td>{ appointment.customer }</td>
                  <td>{ formattedDate }</td>
                  <td>{ formattedTime }</td>
                  <td>{ technicianFullName }</td>
                  <td>{ appointment.reason }</td>
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
