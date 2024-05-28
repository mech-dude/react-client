import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Button82 from './logoutButton.jsx';
import tshLogo from '../assets/tsh-logo.png'

function AgentDashboard() {
    const [name, setName] = useState(false);
    const [tokenNotFound, setTokenNotFound] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    axios.defaults.withCredentials = true; //DO NOT REMOVE, THIS IS INTENDED TO HAVE

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_CLIENT_PATH}/agentdashboard`);
                console.log(res);
                if (res.data.role === 'agent' || res.status === 403) {
                    setName(res.data.name);
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
        
        const timer = setInterval(() => {
          setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
      
        return () => {
          clearInterval(timer);
        };
    }, [currentTime]);

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

    if (!name) {
        // If name is still false, render a loading indicator or return null
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="grid-container centered">
            <div className="grid-100">
                <div className="contained" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 15px', alignItems: 'center' }}>
                <div>
                <img src={tshLogo} style={{width: '70px'}} alt="The Support Heroes logo"/>
                </div>
                <Button82 style={{height: '35px !important'}} onClick={handleDelete}></Button82>
                </div>
                <div className="contained">
                <div className="grid-100">
                    <div className="heading">
                    <h1>Welcome, {name}</h1>
                    <p>{currentTime}</p>
                    </div>
                </div>
                <section className="grid-70 main">
                <h2>t2-originals</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nam eligendi facere nostrum, iste eveniet unde eaque, vero inventore numquam veritatis modi perferendis deleniti aspernatur odit ullam cupiditate nemo ipsa.
                </p>
                </section>
                <aside className="grid-30 list">
                    <h2>Agent Data</h2>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nam eligendi facere nostrum, iste eveniet unde eaque, vero inventore numquam veritatis modi perferendis deleniti aspernatur odit ullam cupiditate nemo ipsa.
                    </p>  
                </aside>
                <footer className="grid-100">
                    <p>Copyright 2024, The Support Heroes</p>
                </footer>
                </div>
            </div>
            </div>
        </div>
    );
}

export default AgentDashboard;