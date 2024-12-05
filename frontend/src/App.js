import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import POSPage from "./pages/POSPage";
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import SparePartsPage from "./pages/SparePartsPage";
import OrdersPage from "./pages/OrdersPage";

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Spare Part Delivery
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/customers">
                    Customers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/spareparts">
                    Spare Parts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pos">
                    Point of Sale
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/spareparts" element={<SparePartsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/pos" element={<POSPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
