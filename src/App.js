import React, { useState, createContext } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';
import Logout from './components/authentication/Logout';
import Profile from './components/Profile';

export const UserContext = createContext(null);

/**
 * Global app
 * 
 * @returns router
 */
function App() {
  const [user, setUser] = useState({});

  return (
    <Router>
      <div>
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <section>
          <NavigationBar />
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/logout" element={<Logout/>}/>
          </Routes>
        </section>
        </UserContext.Provider>
      </div>
    </Router>
  )
}

export default App;