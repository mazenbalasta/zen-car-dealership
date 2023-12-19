import React, {useState, useEffect} from 'react';

const InitForm = {
    vin: '',
    customer: '',
    date: '',
    time: '',
    technician: '',
    reason: ''
}

function NewServiceAppointmentForm () {
    const [technicians, setTechnicians] = useState([]);
    const [formData, setFormData] = useState({ ...InitForm })

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const inputName = e.target.name;
        const value = e.target.value;

        if (inputName === 'date' || inputName === 'time') {
            setFormData({
              ...formData,
              [inputName]: value,
              date_time: `${formData.date}T${formData.time}`,
            });
          } else {
            setFormData({
              ...formData,
              [inputName]: value,
            });
          }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { date, time, ...postData } = formData;
        const url = `http://localhost:8080/api/appointments/`;

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify({
                ...postData,
                date_time: `${formData.date}T${formData.time}`,
            }),
            headers: {
                'Content-Type': 'application/json',
            },

        };
        console.log(fetchConfig)

        const response = await fetch (url, fetchConfig);
        console.log(response)
        if (response.ok) {
            setFormData({ ...InitForm })
        }
    };

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a service appointment</h1>
            <form onSubmit={handleSubmit} id="aff-shoe-form">
              <div className="form-floating mb-3">
                <input onChange={handleInputChange} value={formData.vin} required type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">Automobile VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleInputChange} value={formData.customer} required type="text" name="customer" id="customer" className="form-control" />
                <label htmlFor="customer">Customer</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleInputChange} value={formData.date} required type="date" name="date" id="date" className="form-control" />
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleInputChange} value={formData.time} required type="time" name="time" id="time" className="form-control" />
                <label htmlFor="time">Time</label>
              </div>
              <div className="mb-3">
                <select onChange={handleInputChange} value={formData.technician} required name="technician" id="technician" className="form-select">
                  <option value="">Choose a Technician</option>
                  {technicians.map(technician => {
                    return (
                      <option key={technician.employee_id} value={technician.id}>{technician.first_name} {technician.last_name}</option>
                    )
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleInputChange} value={formData.reason} required type="text" name="reason" id="reason" className="form-control" />
                <label htmlFor="reason">Reason</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )

}

export default NewServiceAppointmentForm;
