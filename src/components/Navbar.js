import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <h1>💰 Finance Tracker</h1>
      </div>
      <ul>
        <li>
          <Link 
            to="/" 
            className={location.pathname === "/" ? "active" : ""}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/report" 
            className={location.pathname === "/report" ? "active" : ""}
          >
            <span className="nav-icon">📈</span>
            <span className="nav-text">Financial Report</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/spending-summary" 
            className={location.pathname === "/spending-summary" ? "active" : ""}
          >
            <span className="nav-icon">📅</span>
            <span className="nav-text">Spending Summary</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/category-stats" 
            className={location.pathname === "/category-stats" ? "active" : ""}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Category Stats</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
