import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../App.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToAdminDashboard, setRedirectToAdminDashboard] = useState(false);
  const [redirectToAgentDashboard, setRedirectToAgentDashboard] = useState(false);
  

  // Set axios defaults once when the component mounts
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_CLIENT_PATH}/login`,
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 200) {
        console.log(res.data);
        const { role } = res.data.user;
        console.log("role:", role);
        if (role === 'admin') {
          setRedirectToAdminDashboard(true);
        } else {
          setRedirectToAgentDashboard(true)
        }
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('Login failed');
      console.error('Login failed:', error);
    }
  };

  if (redirectToAdminDashboard) {
    return <Navigate to="/dashboard" />;
  }

  if (redirectToAgentDashboard) {
    return <Navigate to="/agentdashboard" />;
  }

  return (
    <div className="login">
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <i className="fas fa-user"></i>
        </label>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          id="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <label htmlFor="password">
          <i className="fas fa-lock"></i>
        </label>
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default LoginPage;