import React, { useEffect, useState } from 'react';

function ListAllSales() {

  const [salesData, setSalesData] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState('');

  async function loadSalespeople() {
    const response = await fetch('http://localhost:8090/api/salespeople/');
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople);
    } else {
      console.error(response);
    }
  }

  useEffect(() => {
    loadSalesData();
    loadSalespeople();
  }, []);

  async function loadSalesData() {
    const response = await fetch('http://localhost:8090/api/sales/');
    if (response.ok) {
      const data = await response.json();
      const filteredData = data.sales.filter(sale => sale.sales_person.employee_id === selectedSalesperson);
      setSalesData(filteredData);
    } else {
      console.error(response);
    }
  }

  useEffect(() => {
    loadSalesData();
  }, [selectedSalesperson]);

  const [searchParam, setSearchParam] = useState('');

  return (
    <>
      <h1>Sales</h1>
      <select value={selectedSalesperson} onChange={(e) => setSelectedSalesperson(e.target.value)}>
        <option value="">Select a salesperson...</option>
        {salespeople.map(salesperson => (
          <option key={salesperson.employee_id} value={salesperson.employee_id}>
            {salesperson.first_name} {salesperson.last_name}
          </option>
        ))}
      </select>
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
                <td>${Number(sales.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ListAllSales;
