import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function ManufacturersList () {
    const [manufacturers, setManufacturers] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        getData()
    }, []);

    const HandleOnclick = () => {
        navigate("/manufacturers/new")
    }

    return (
        <>
        <h1>Manufacturers</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {manufacturers.map(manufacturer => {
                return (
                  <tr key={manufacturer.href}>
                    <td>{ manufacturer.name }</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        <button onClick={HandleOnclick} type="button" className="btn btn-primary" data-bs-toggle="button">
          Add A Manufacturer
        </button>
      </>
    );
}

export default ManufacturersList
