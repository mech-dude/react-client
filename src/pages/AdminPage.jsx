import React, { useState, useEffect } from 'react';

function AdminPage() {
  const [adminData, setAdminData] = useState(null);
  const [serverAdminData, setserverAdminData] = useState(null);
  const [caseNum, setCaseNum] = useState(null);
  const [adminDataLoaded, setAdminDataLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

useEffect(() => {
  async function fetchConversations() {
    try {
      const response = await fetch(`${process.env.REACT_APP_CLIENT_PATH}/refresh-conversations`, {
        method: 'GET', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json' // Set the Content-Type header
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const apphqData = await response.json();

      const data = {
        message: 'Hello from Express!',
        timestamp: currentTime,
        apphq: apphqData,
      };

      setAdminData(data);
      setAdminDataLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      // You might want to handle the error state here
    }
  }

  const timer = setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, 1000);

  fetchConversations();

  return () => {
    clearInterval(timer);
  };
}, [currentTime]);

useEffect(() => {
  async function fetchServer() {
    try {
      const userId = 1; // Replace with the actual user ID or obtain dynamically
      let url = `${process.env.REACT_APP_CLIENT_PATH}/admin`;
      
      // Check if id is provided, if so, append it to the URL
      const id = []; // Replace with the actual id or obtain dynamically
      if (id) {
        url += `${id}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setserverAdminData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchServer();
}, []);

useEffect(() => {
  async function fetchServerData() {
    try {
      const response = await fetch(`${process.env.REACT_APP_CLIENT_PATH}/admin`, {
        method: 'GET',
        credentials: 'include', // Include credentials (such as cookies) in the request
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch server data');
      }

      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error('Error fetching server data:', error);
    }
  }

  fetchServerData();
}, []);



  

useEffect(() => {
  if (adminDataLoaded && adminData) {
    setCaseNum(adminData.apphq.cases);
  }
}, [adminDataLoaded, adminData]);

return (
    <div>
      <h1>Admin Page</h1>
        {adminData && (
          <div>
            <p>{adminData.message}</p>
            <p>{currentTime}</p>
            <p>{caseNum}</p>
            <p>{JSON.stringify(serverAdminData)}</p>
          </div>
        )}


        
    </div>
  );
}

export default AdminPage;