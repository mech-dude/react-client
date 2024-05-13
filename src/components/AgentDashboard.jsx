import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function AgentDashboard() {
    const [name, setName] = useState('');
    const [tokenNotFound, setTokenNotFound] = useState(false);
    axios.defaults.withCredentials = true; //DO NOT REMOVE, THIS IS INTENDED TO HAVE

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_CLIENT_PATH}/admindashboard`);
                console.log(res);
                if (res.data.role === 'agent' || res.status === 403) {
                    console.log("agent")
                    setName(res.data.username);
                } else {
                    console.error("Unexpected response status:", res.status);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setTokenNotFound(true);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
          event.preventDefault();
          event.returnValue = 'Are you sure you want to leave?'; // Message shown in the confirmation dialog
          return 'Are you sure you want to leave?'; // Message for Firefox
        };
    
        const handlePopState = (event) => {
          // Display the custom dialog box
          const confirmationMessage = 'Are you sure you want to leave?'; // Message shown in the confirmation dialog
          event.preventDefault();
    
          // Show the dialog box
    
          // If the user confirms, proceed to leave the page
          const leavePage = window.confirm(confirmationMessage);
          if (leavePage) {
            event.returnValue = confirmationMessage;
          } else {
            // If the user cancels, prevent leaving the page
            window.history.pushState(null, '', window.location.pathname); // Restore the original URL
            event.returnValue = ''; // Cancel the leave action
          }
    
          return confirmationMessage;
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
          window.removeEventListener('popstate', handlePopState);
        };
      }, []);  

    const handleDelete = () => {
        axios.get(`${process.env.REACT_APP_CLIENT_PATH}/logout`)
        .then(res => {
            window.location.href = `${process.env.REACT_APP_CLIENT_REDIRECT}`;
        })
        .catch(err => console.log(err));
    };

    if (tokenNotFound) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <h1>Agent Dashboard</h1>
            <h2>Welcome, {name}</h2>
            <button className='btn btn-danger' onClick={handleDelete}>Logout</button>
        </div>
        
    );
}

export default AgentDashboard;