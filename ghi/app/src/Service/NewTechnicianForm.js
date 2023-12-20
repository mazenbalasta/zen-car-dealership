import React, {useState, useEffect} from 'react';


const InitForm = {
    first_name: '',
    last_name: '',
    employee_id: ''
}

function NewTechnicianForm () {
    const [formData, setFormData] = useState({ ...InitForm });

    const handleInputChange = (e) => {
        const inputName = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `http://localhost:8080/api/technicians/`;

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch (url, fetchConfig);
        console.log(response);
        if (response.ok) {
            setFormData({ ...InitForm })
        }
    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Technician</h1>
            <form onSubmit={handleSubmit} id="aff-shoe-form">
              <div className="form-floating mb-3">
                <input onChange={handleInputChange} value={formData.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleInputChange} value={formData.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleInputChange} value={formData.employee_id} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control" />
                <label htmlFor="employee_id">Employee ID</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default NewTechnicianForm
