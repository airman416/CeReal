import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

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
      <div>
        <p>You are logged in as {user.displayName + " " + user.email}</p>
        <p>{JSON.stringify(user, null, 2)}</p>
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
