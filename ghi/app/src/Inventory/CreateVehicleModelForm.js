import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const InitForm = {
    name: '',
    picture_url: '',
    manufacturer_id: ''
};

function CreateVehicleModelForm() {
    const [manufacturers, setManufacturers] = useState([]);
    const [formData, setFormData] = useState({ ...InitForm });
    const navigate = useNavigate();

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

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
        const confirmSubmit = window.confirm('Are you sure you want to create this new model?');
        if (confirmSubmit) {
            const url = `http://localhost:8100/api/models/`;

            const fetchConfig = {
                method: 'post',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                setFormData({ ...InitForm })
                navigate("/models")
                window.alert('Model created!');
            } else {
                window.alert('There was a problem creating the model');
            }
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Vehicle Model</h1>
                    <form onSubmit={handleSubmit} id="add-automobile">
                        <div className="form-floating mb-3">
                            <input onChange={handleInputChange} value={formData.name} placeholder="Model name..." required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleInputChange} value={formData.picture_url} placeholder="Picture URL..." required type="url" name="picture_url" id="picture_url" className="form-control" />
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={handleInputChange} value={formData.manufacturer_id} required name="manufacturer_id" id="manufacturer" className="form-select">
                                <option value="">Choose a Manufacturer...</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateVehicleModelForm
