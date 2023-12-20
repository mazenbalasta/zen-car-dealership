import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const InitForm = {name: ''};

function CreateManufacturerForm () {
    const [formData, setFormData] = useState({ ...InitForm });
    const navigate = useNavigate();

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
        const confirmSubmit = window.confirm('Are you sure you want to create this new manufacturer?');
        if (confirmSubmit) {
            const url = `http://localhost:8100/api/manufacturers/`;

            const fetchConfig = {
                method: 'post',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await fetch (url, fetchConfig);
            if (response.ok) {
                setFormData({ ...InitForm })
                navigate("/manufacturers")
                window.alert('Manufacturer created!');
            } else {
                window.alert('There was a problem creating the manufacturer');
            }
        }
    };

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Vehicle Manufacturer</h1>
            <form onSubmit={handleSubmit} id="add-automobile">
              <div className="form-floating mb-3">
                <input onChange={handleInputChange} value={formData.name} placeholder="Manufacturer name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Manufacturer name</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default CreateManufacturerForm
