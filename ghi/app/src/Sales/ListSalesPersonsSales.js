import React, { useState } from 'react'


function ListSalesPersonsSales(props) {
    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    
    // JSX ////////////////////

    return (
        <>
            <h1>Sales Person History</h1>
            <div className="mb-3">
                <select value={name} onChange={handleNameChange} required id="location" name="location" className="form-select">
                    <option value="">Choose a Sales Person</option>
                    {props.salespersons.map(salesperson => {
                        return (
                            <option key={salesperson.id} value={salesperson.name}>
                                {salesperson.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales Person</th>
                        <th>Employee Number</th>
                        <th>Purchaser</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {props.sales.filter(sale => sale.sales_person.name === name)
                        .map(sale => {
                            return (
                                <tr key={sale.href}>
                                    <td>{sale.sales_person.name}</td>
                                    <td>{sale.sales_person.employee_number}</td>
                                    <td>{sale.customer.name}</td>
                                    <td>{sale.automobile}</td>
                                    <td>${sale.price}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </>
    )
}

export default ListSalesPersonsSales
