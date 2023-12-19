import React from 'react';


export default function SaleList(props) {

    return (
        <div className="container mt-5 pt-1">
            <div className="mt-5">
                <div className="d-flex mb-3 align-items-center justify-content-center">
                    <h1>Record of Sales</h1>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Employee Number</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {props.sales.map(sale => {
                            return (
                                <tr key={sale.href}>
                                    <td>{sale.sales_person.name}</td>
                                    <td>{sale.sales_person.employee_number}</td>
                                    <td>{sale.customer.name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>${sale.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
