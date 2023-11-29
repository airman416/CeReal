import React, { useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { UserContext } from "../App";
import UploadImage from "./UploadImage";
import { useNavigate } from "react-router-dom";

/**
 * Homepage
 * 
 * @returns Image upload box, gallery
 */
const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user);
        console.log("uid", uid);
      } else {
        // User is signed out
        console.log("user is logged out");
        navigate('/login');
      }
    });
  }, []);

  if (user) {
    return (
      <div>
        <UploadImage />
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

export default Home;
