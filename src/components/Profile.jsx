import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "./css/Profile.css";

/**
 * Allows user to view their own profile
 *
 * TODO: style
 * @returns user profile
 */
const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {}, []);

  if (user) {
    return (
      <div className="user-profile">
        <img src={user.photoURL} alt="Profile" className="profile-picture" />
        <div className="user-details">
          <h2 className="display-name">{user.displayName}</h2>
          <p className="email">{user.email}</p>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <p>Not logged in.</p>
      </>
    );
  }
};

export default Profile;
