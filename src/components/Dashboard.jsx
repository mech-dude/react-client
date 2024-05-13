/*import { createWebSocket } from '../websocket/websocket_client.js';
import Button82 from './logoutButton.jsx';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const [success, setSuccess] = useState(false);
    const [cases, setCases] = useState(false);
    const [auth, setAuth] = useState(false);
    const [tokenNotFound, setTokenNotFound] = useState(false);
    const [redirectToAgentDashboard, setRedirectToAgentDashboard] = useState(false);
    const [name, setName] = useState('');
    const [webSocketData, setWebSocketData] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    axios.defaults.withCredentials = true; // DO NOT REMOVE, THIS IS INTENDED TO HAVE

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_CLIENT_PATH}/dashboard`);
                console.log(res);
                if (res.data.role === 'admin') {
                    setSuccess(true);
                    setAuth(true);
                    setName(res.data.username);
                    setCases(JSON.parse(res.data.misc.apphq).cases);
                    createWebSocket((data) => {
                        setWebSocketData(data); // Update WebSocket data
                    });
                } else if (res.data.role === 'agent' || res.status === 403) {
                    console.log("agent")
                    setRedirectToAgentDashboard(true);
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

    const handleDelete = () => {
        axios.get(`${process.env.REACT_APP_CLIENT_PATH}/logout`)
        .then(res => {
            window.location.href = `${process.env.REACT_APP_CLIENT_REDIRECT}/`;
        })
        .catch(err => console.log(err));
    };

    if (tokenNotFound) {
        return <Navigate to="/" />;
    }

    if (redirectToAgentDashboard) {
        return <Navigate to="/agentdashboard" />;
    }

    if (!success || !auth) {
        return (
                <div>
                    <div className="grid-container centered">
                    <div className="grid-100">
                        <div className="contained">
                        <div className="grid-100">
                            <div className="heading">
                            <h2>Loading...</h2>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                );
    }

    return (
        <div>
            <div className="grid-container centered">
            <div className="grid-100">
                <div className="contained" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button82 onClick={handleDelete}></Button82>
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
                    <p>Escalations: {cases}</p>
                </section>
                <aside className="grid-30 list">
                    <h2>Helscout Case Tracker</h2>
                    <div id="roomList"></div>
                    <h2>Employee Discord Status</h2>
                    <div id="employeeList">
                    {webSocketData.map((data, index) => (
                    <div key={index}>
                        {Object.entries(data).map(([key, value]) => (
                            <ul key={`${index}-${key}`} className="bulleted">
                                <li className={value === 'dnd' ? 'dnd' : value === 'idle' ? 'idle' : value === 'offline' ? 'out' : 'in'}>
                                {`${key}`}
                                </li>

                            </ul>
                        ))}
                    </div>
                    ))}

                    </div>

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

export default Dashboard;
*/

import { createWebSocket, closeWebSocket } from '../websocket/websocket_client.js';
import Button82 from './logoutButton.jsx';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const [success, setSuccess] = useState(false);
    const [cases, setCases] = useState(false);
    const [auth, setAuth] = useState(false);
    const [tokenNotFound, setTokenNotFound] = useState(false);
    const [redirectToAgentDashboard, setRedirectToAgentDashboard] = useState(false);
    const [name, setName] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [webSocketStatusData, setWebSocketStatusData] = useState([]);
    const [webSocketConversationsData, setWebSocketConversationsData] = useState([]);
    const [className, setClassName] = useState('default');
    const [displayValue, setDisplayValue] = useState(null);

    axios.defaults.withCredentials = true; // DO NOT REMOVE, THIS IS INTENDED TO HAVE

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_CLIENT_PATH}/dashboard`);
                console.log(res);
                if (res.data.role === 'admin') {
                    setSuccess(true);
                    setAuth(true);
                    setName(res.data.username);
                    setCases(JSON.parse(res.data.misc.apphq).cases);
                    
                    // Create WebSocket connection if user is an admin
                    createWebSocket((message) => {
                        // Check the type of message and update state accordingly
                        //console.log(message)
                        if (message.type === 'status') {
                            setWebSocketStatusData(message.data);
                        } else if (message.type === 'conversationCount') {
                            //console.log(JSON.parse(message.data).cases)
                            setWebSocketConversationsData(JSON.parse(message.data).cases);
                            setClassName('web');
                        } else if (message.type === 'error') {
                            console.error('Error received from WebSocket server:', message.data);
                        } else {
                            console.warn('Unknown message type received from WebSocket server:', message.type);
                        }
                    });
                } else if (res.data.role === 'agent' || res.status === 403) {
                    console.log("agent")
                    setRedirectToAgentDashboard(true);
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
        // Update class name when cases change
        setClassName(webSocketConversationsData.length > 0 ? 'web' : 'default');
    }, [webSocketConversationsData, cases]); 

    useEffect(() => {
        // Set display value based on WebSocket data availability
        if (webSocketConversationsData.length > 0) {
            setDisplayValue(webSocketConversationsData);
        } else {
            setDisplayValue(cases);
        }
    }, [webSocketConversationsData, cases]);

    useEffect(() => {
        
        const timer = setInterval(() => {
          setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
      
        return () => {
          clearInterval(timer);
        };
    }, [currentTime]);

    // Effect to close WebSocket connection when component unmounts
    useEffect(() => {
        return () => {
            closeWebSocket();
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

    if (redirectToAgentDashboard) {
        return <Navigate to="/agentdashboard" />;
    }

    if (!success || !auth || !webSocketStatusData) {
        return (
                <div>
                    <div className="grid-container centered">
                    <div className="grid-100">
                        <div className="contained">
                        <div className="grid-100">
                            <div className="heading">
                            <h2>Loading...</h2>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                );
    }

    return (
        <div>
            <div className="grid-container centered">
            <div className="grid-100">
                <div className="contained" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button82 onClick={handleDelete}></Button82>
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
                <p className={className}>
                    Escalations: {displayValue}
                </p>



                </section>
                <aside className="grid-30 list">
                    <h2>Helscout Case Tracker</h2>
                    <div id="roomList"></div>
                    <h2>Employee Discord Status</h2>
                    <div id="employeeList">
                        {webSocketStatusData.map((data, index) => (
                            <div key={index}>
                                {Object.entries(data).map(([key, value]) => (
                                    <ul key={`${index}-${key}`} className="bulleted">
                                        <li className={value === 'dnd' ? 'dnd' : value === 'idle' ? 'idle' : value === 'offline' ? 'out' : 'in'}>
                                            {`${key}`}
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        ))}
                    </div>

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

export default Dashboard;