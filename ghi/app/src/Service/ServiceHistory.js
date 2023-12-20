import { useEffect, useState } from 'react';
import { formatDateTime } from './Functions';

function ServiceHistory () {
    const [appointments, setAppointments] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);
    const [searchParam, setSearchParam] = useState('');

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

    const searchResult = appointments.filter((appointment) => appointment.vin.includes(searchParam));

    return(
        <>
          <h1>Service History</h1>
          <div className="mb-3">
            <input type="text" id="search"
                className="form-control"
                placeholder='Search by Vin...'
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
            />
          </div>
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
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map(appointment => {
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
                    <td>{ appointment.status }</td>
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
}

export default ServiceHistory
