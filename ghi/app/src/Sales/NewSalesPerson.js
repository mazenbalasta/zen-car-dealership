import React, { useEffect, useState } from 'react'


function NewSalesPerson(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.employee_number = employee_number;

    const salespersonUrl = "http://localhost:8090/api/salesperson/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(salespersonUrl, fetchConfig);
    if (response.ok) {
      const newDa = await response.json();
      setName("");
      setEmployeeNum("");
      props.fetchSalesperson();
    }
  }
  //sets the values of the states depending on the value in our respective inputs/////////////
  const [name, setName] = useState('');
  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  }

  const [employee_number, setEmployeeNum] = useState('');
  const handleEmployeeNumChange = (event) => {
    const value = event.target.value;
    setEmployeeNum(value);
  }

  // JSX /////////////////////
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Sales Person!</h1>
          <form onSubmit={handleSubmit} id="create-presentation-form">
            <div className="form-floating mb-3">
              <input value={name} onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input value={employee_number} onChange={handleEmployeeNumChange} placeholder="Employee Number" required type="int" name="employee_number" id="employee_number" className="form-control" />
              <label htmlFor="employee_number">Employee Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default NewSalesPerson
