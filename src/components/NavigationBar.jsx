import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Assuming you are using react-router for navigation
import { UserContext } from "../App";
import "../components/css/NavigationBar.css";

/**
 * Reusable top navigation bar
 * 
 * @returns navigation bar
 */
const NavigationBar = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        CeReal ®
      </Link>

      <div className="nav-buttons">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Log Out</Link>
          </>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
