import { NavLink, Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </a>
              <ul className="dropdown-menu" aria-labelledby='navbarDarkDropdownMenuLink'>
                <li><Link to="/models" className="dropdown-item">Vehicle Model List</Link></li>
                <li><Link to="/models/new" className="dropdown-item">Create a Vehicle Model</Link></li>
                <li><Link to="automobiles/" className="dropdown-item">List of Automobiles</Link></li>
                <li><Link to="automobiles/new" className="dropdown-item">Create an Automobile</Link></li>
                <li><Link to="/manufacturers" className="dropdown-item">Manufacturers List</Link></li>
                <li><Link to="/manufacturers/new" className="dropdown-item">Create a Manufacturer</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Service Center
              </a>
              <ul className="dropdown-menu" aria-labelledby='navbarDarkDropdownMenuLink'>
                <li><Link to="appointments/" className="dropdown-item">Appointment List</Link></li>
                <li><Link to="appointments/new/" className="dropdown-item">Create a Service Appointment</Link></li>
                <li><Link to="appointments/history/" className="dropdown-item">Service History</Link></li>
                <li><Link to="technicians/" className="dropdown-item">Technicians</Link></li>
                <li><Link to="technicians/new/" className="dropdown-item">Create a Technician</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales Center
              </a>
              <ul className="dropdown-menu" aria-labelledby='navbarDarkDropdownMenuLink'>
                <li><Link to="customers/" className="dropdown-item">Add a Customer</Link></li>
                <li><Link to="customers/list/" className="dropdown-item">Customers</Link></li>
                <li><Link to="salespeople/" className="dropdown-item">Add a Salesperson</Link></li>
                <li><Link to="salespeople/list/" className="dropdown-item">Salespeople</Link></li>
                <li><Link to="sales/" className="dropdown-item">Add a Sale</Link></li>
                <li><Link to="sales/history/" className="dropdown-item">Sales History</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
