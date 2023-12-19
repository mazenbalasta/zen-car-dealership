import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormButton from '../FormButton';

export default function CustomerForm() {
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleStreetChange = (event) => {
        setStreet(event.target.value);
    }

    const handleApartmentChange = (event) => {
        setApartment(event.target.value);
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const handleStateChange = (event) => {
        setState(event.target.value);
    }

    const handleZipCodeChange = (event) => {
        setZipCode(event.target.value);
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            name,
            street,
            apartment,
            city,
            state,
            zip_code: zipCode,
            phone_number: phoneNumber,
        }

        const url = "http://localhost:8090/api/customers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }

        try {
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                const newCustomer = await response.json();
                setName("");
                setStreet("");
                setApartment("");
                setCity("");
                setState("");
                setZipCode("");
                setPhoneNumber("");
                toast(`${newCustomer.name} was successfully added as a customer!`);
            } else {
                throw new Error("Response not ok");
            }
        } catch (e) {
            toast.error(`${e}`);
        }
    }

    return (
        <div className="container mt-5 pt-4">
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <div className="shadow p-4 mt-4 rounded-3">
                        <div className="d-flex mb-3 align-items-center justify-content-center">
                            <h1 className="text-center">Add a Customer</h1>
                            <img src="https://cdn-icons-png.flaticon.com/512/2037/2037710.png" className="ms-2 img-fluid" style={{ width: "40px" }} />
                        </div>
                        <form onSubmit={handleSubmit} className="row g-3">
                            <div className="col-12 form-floating">
                                <input value={name} onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" maxLength="200" className="form-control" />
                                <label className="mx-2" htmlFor="name">Name</label>
                            </div>
                            <div className="col-12 form-floating">
                                <input value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="Phone Number" required type="tel" name="phone_number" id="phone_number" maxLength="12" className="form-control" />
                                <label className="mx-2" htmlFor="phone_number">Phone Number (XXX-XXX-XXXX)</label>
                            </div>
                            <div className="col-md-8 form-floating">
                                <input value={street} onChange={handleStreetChange} placeholder="Street Address" required type="text" maxLength="200" name="street" id="street" className="form-control" />
                                <label className="mx-2" htmlFor="street">Street Address</label>
                            </div>
                            <div className="col-md-4 form-floating">
                                <input value={apartment} onChange={handleApartmentChange} placeholder="Apt/Suite" type="text" name="apartment" maxLength="100" id="apartment" className="form-control" />
                                <label className="mx-1" htmlFor="apartment">Apt/Suite (Optional)</label>
                            </div>
                            <div className="col-md-12 form-floating">
                                <input value={city} onChange={handleCityChange} placeholder="City" required type="text" name="city" id="city" maxLength="100" className="form-control" />
                                <label className="mx-2" htmlFor="city">City</label>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input value={state} onChange={handleStateChange} placeholder="State" required type="text" maxLength="2" name="state" id="state" className="form-control" />
                                    <label htmlFor="state">State (Ex: CA, NY)</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input value={zipCode} onChange={handleZipCodeChange} placeholder="Zip Code" required type="number" name="zip_code" id="zip_code" min="0" max="2147483647" className="form-control" />
                                    <label htmlFor="zip_code">Zip Code</label>
                                </div>
                            </div>
                            <FormButton buttonText={'Add Customer'} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
