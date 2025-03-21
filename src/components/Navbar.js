import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="/report">📈 Financial Report</Link></li>
        <li><Link to="/spending-summary">📅 Spending Summary</Link></li>
        <li><Link to="/category-stats">📊 Category Stats</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
