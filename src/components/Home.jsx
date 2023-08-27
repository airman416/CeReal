import React, { useState, useEffect } from 'react';
import {  signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import UploadImage from './UploadImage';
 
const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              setUser(user);
              // ...
              console.log("uid", uid)
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
         
    }, [])

    if (user) {
        return(
            <>
                <nav>
                    <p>
                        Welcome Home
                        <br/>
                        <br/>
                        <UploadImage user={user}/>
                    </p>
     
                    <div>
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </nav>
            </>
        )
    } else {
        return (
            <><p>Not logged in.</p></>
        )
    }
}
 
export default Home;
