import React, { useEffect, useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

/**
 * Allows users to log out
 * 
 * @returns logout page
 */
const Logout = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("Signed out successfully");
          setUser(null);
          navigate("/");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    } else {
      navigate("/");
    }
  }, [navigate, user, setUser]);

  if (user) {
    return (
      <>
        <nav>
          <p>Failed log out.</p>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <p>Logged out successfully.</p>
      </>
    );
  }
};

export default Logout;
