import React, { useState } from 'react';

function SalesPersonForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const salesPersonUrl = 'http://localhost:8090/api/salespeople/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const salesPerson = await fetch(salesPersonUrl, fetchConfig);
        if (salesPerson.ok) {
            const NewSalesPerson = await salesPerson.json()
            console.log(NewSalesPerson);

            setFirstName('');
            setLastName('');
            setEmployeeId('');

        }
    }

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Salesperson</h1>
                    <form onSubmit={handleSubmit} id="create-salesperson-form">
                        <div className="form-floating mb-3">
                             <input value={firstName} onChange={handleFirstNameChange} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                             <label htmlFor="first_name">First Name..</label>
                        </div>
                        <div className="form-floating mb-3">
                             <input value={lastName} onChange={handleLastNameChange} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                             <label htmlFor="last_name">Last Name..</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={employeeId} onChange={handleEmployeeIdChange} placeholder="Employee ID" required type="number" pattern="[0-9]" name="employee_id" id="employee_id" className="form-control" />
                            <label htmlFor="address">Employee ID..</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
        );
    }

    export default SalesPersonForm;










// import React, { useState } from 'react'


// function NewSalesPerson(props) {
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const data = {};
//     data.name = name;
//     data.employee_number = employee_number;

//     const salespersonUrl = "http://localhost:8090/api/salespeople/";
//     const fetchConfig = {
//       method: "post",
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     const response = await fetch(salespersonUrl, fetchConfig);
//     if (response.ok) {
//       const newData = await response.json();
//       console.log(newData);
//       setName("");
//       setEmployeeNum("");
//       props.fetchSalesperson();
//     }
//   }
//   //sets the values of the states depending on the value in our respective inputs/////////////
//   const [name, setName] = useState('');
//   const handleNameChange = (event) => {
//     const value = event.target.value;
//     setName(value);
//   }

//   const [employee_number, setEmployeeNum] = useState('');
//   const handleEmployeeNumChange = (event) => {
//     const value = event.target.value;
//     setEmployeeNum(value);
//   }

//   // JSX /////////////////////
//   return (
//     <div className="row">
//       <div className="offset-3 col-6">
//         <div className="shadow p-4 mt-4">
//           <h1>Add a Sales Person!</h1>
//           <form onSubmit={handleSubmit} id="create-presentation-form">
//             <div className="form-floating mb-3">
//               <input value={name} onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
//               <label htmlFor="name">Name</label>
//             </div>
//             <div className="form-floating mb-3">
//               <input value={employee_number} onChange={handleEmployeeNumChange} placeholder="Employee Number" required type="int" name="employee_number" id="employee_number" className="form-control" />
//               <label htmlFor="employee_number">Employee Number</label>
//             </div>
//             <button className="btn btn-primary">Create</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default NewSalesPerson
