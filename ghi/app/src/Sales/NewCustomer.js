import React, { useState } from 'react'


function NewCustomer(props) {

  // THIS CODE HANDLES SUBMIT ////////////////

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.address = address;
    data.phone_number = phone_number;

    const customerUrl = "http://localhost:8090/api/customers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(customerUrl, fetchConfig);
    if (response.ok) {
      const newDa = await response.json();
      setName("");
      setAddress("");
      setPhone("");
      props.fetchCustomer();
    }
  }

  // SETS THE VALUES OF THE STATES DEPENDING ON THE VALUE IN OUR RESPECTIVE INPUTS////////////////

  const [name, setName] = useState('');
  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  }

  const [address, setAddress] = useState('');
  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
  }

  const [phone_number, setPhone] = useState('');
  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhone(value);
  }

  // JSX /////////////////////

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Customer!</h1>
          <form onSubmit={handleSubmit} id="create-presentation-form">
            <div className="form-floating mb-3">
              <input value={name} onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input value={address} onChange={handleAddressChange} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
              <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input value={phone_number} onChange={handlePhoneChange} placeholder="Phone Number" required type="text" name="phone_number" id="phone_number" className="form-control" />
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewCustomer
