import React, { useEffect, useState } from 'react';

function ListSalesPeople() {
    const [salespersons, setSalesPersons] = useState([]);

    async function loadSalespersons() {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
            const data = await response.json();
            setSalesPersons(data.salespeople)
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        loadSalespersons();
    }, []);


    return (
        <>
            <h1>Salespeople</h1>
            <table className="table table-striped">
                <thead>
                    <tr className="table-success">
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salespersons?.map(salespeople => {
                        return (
                            <tr key={salespeople.employee_id}>
                                <td>{salespeople.employee_id}</td>
                                <td>{salespeople.first_name}</td>
                                <td>{salespeople.last_name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default ListSalesPeople;
