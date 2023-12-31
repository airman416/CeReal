import React, { useState, useContext, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { NavLink, useNavigate, redirect } from "react-router-dom";
import { UserContext } from "../../App";
import '../css/Auth.css';

/**
 * Handles login
 * 
 * TODO: style
 * @returns view
 */
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  useEffect(() =>  {
    // if (user) {
    //   navigate('/');
    // }
  }, []);

  if (user) {
    return (<><p style={{
      justifyContent: "center",
      textAlign: 'center'
    }}>You are already logged in.</p></>)
  } else {
    return (
      <>
        <main>
          <section>
            <div class="login-container">
              <h2>Login</h2>
              <form class="login-form">
                <div>
                  <label htmlFor="email-address">Email address: </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="password">Password: </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <button onClick={onLogin}>Login</button>
                </div>
              </form>

              <p className="text-sm text-white text-center">
                No account yet? <NavLink to="/signup">Sign up</NavLink>
              </p>
            </div>
          </section>
        </main>
      </>
    );
  }
};

export default Login;
