import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import '../css/Auth.css';
import { UserContext } from "../../App";

/**
 * Allows creation of new user
 * 
 * @returns sign up page
 */
const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);
  const photoURL = "https://firebasestorage.googleapis.com/v0/b/computer-bereal-f0c5e.appspot.com/o/screens%2Fdefault.png?alt=media&token=c8f734c4-a25c-442d-a482-8f2bd240603d";

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        await updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL }).catch(
          (err) => console.log(err)
        );
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
        // ..
      });
  };

  useEffect(() =>  {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <main>
      <section>
        <div class="login-container">
          <div>
            <h2> Sign Up </h2>
            <form class="login-form">
              <div>
                <label htmlFor="display-name">Display name: </label>
                <input
                  type="text"
                  label="Display name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Display name"
                />
              </div>
              <div>
                <label htmlFor="email-address">Email address: </label>
                <input
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  label="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>
              <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
              <button type="submit" onClick={onSubmit}>
                Sign up
              </button>
            </form>

            <p>
              Already have an account? <NavLink to="/login">Sign in</NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
