import React, { useEffect, useState } from 'react';

function ListAllSales() {

  const [salesData, setSalesData] = useState([]);


  async function loadSalesData() {
    const response = await fetch('http://localhost:8090/api/sales/');
    if (response.ok) {
      const data = await response.json();
      setSalesData(data.sales)
    } else {
      console.error(response);
    }
  }

  useEffect(() => {
    loadSalesData();
  }, []);

  return (
    <>
      <h1>Sales</h1>
      <table className="table table-striped">
        <thead>
          <tr className="table-success">
            <th>Salesperson Employee ID</th>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {salesData?.map(sales => {
            return (
              <tr key={sales.id}>
                <td>{sales.sales_person.employee_id}</td>
                <td>{sales.sales_person.first_name} {sales.sales_person.last_name}</td>
                <td>{sales.customer.first_name} {sales.customer.last_name}</td>
                <td>{sales.automobile.vin}</td>
                <td>${sales.price.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ListAllSales;
