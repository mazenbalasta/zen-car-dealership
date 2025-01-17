import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function TechnicianList() {
  const [technicians, setTechnicians] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await fetch('http://localhost:8080/api/technicians/');

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  }

  useEffect(() => {
    getData()
  }, []);


  const HandleOnclick = () => {
    navigate("/technicians/new")
  }

  return (
    <>
      <h1>Technicians List</h1>
      <table className="table table-striped">
        <thead>
          <tr className="table-success">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map(technician => {
            return (
              <tr key={technician.id}>
                <td>{technician.first_name}</td>
                <td>{technician.last_name}</td>
                <td>{technician.employee_id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={HandleOnclick} type="button" className="btn btn-primary" data-bs-toggle="button">
        Add A Technician
      </button>
    </>
  );
}

export default TechnicianList
