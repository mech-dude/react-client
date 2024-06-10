import { socket } from "../websocket/websocket_client.js";
import Button82 from "../components/logoutButton.jsx";
import tshLogo from "../assets/tsh-logo.png";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [success, setSuccess] = useState(false);
  const [cases, setCases] = useState(false);
  const [auth, setAuth] = useState(false);
  const [tokenNotFound, setTokenNotFound] = useState(false);
  const [redirectToAgentDashboard, setRedirectToAgentDashboard] =
    useState(false);
  const [name, setName] = useState("");
  
  const [webSocketStatusData, setWebSocketStatusData] = useState([]);
  const [webSocketConversationsData, setWebSocketConversationsData] = useState(
    []
  );
  const [className, setClassName] = useState("default");
  const [displayValue, setDisplayValue] = useState(null);
  axios.defaults.withCredentials = true; // DO NOT REMOVE, THIS IS INTENDED TO HAVE

  const [isConnected, setIsConnected] = useState(socket.io.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
        console.log("WS connected")
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_CLIENT_PATH}/dashboard`
        );
        console.log({ res });
        if (res.data.role === "admin") {
          setSuccess(true);
          setAuth(true);
          setName(res.data.name);
          //setCases(JSON.parse(res.data.misc.apphq).cases);

          // Create WebSocket connection if user is an admin
          socket.io.connect();
          socket.io.emit("test");

          setClassName("web");
        } else if (res.data.role === "agent" || res.status === 403) {
          console.log("agent");
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
    setClassName(webSocketConversationsData.length > 0 ? "web" : "default");
  }, [webSocketConversationsData, cases]);

  useEffect(() => {
    // Set display value based on WebSocket data availability
    if (webSocketConversationsData.length > 0) {
      setDisplayValue(webSocketConversationsData);
    } else {
      setDisplayValue(cases);
    }
  }, [webSocketConversationsData, cases]);

  const handleDelete = () => {
    axios
      .get(`${process.env.REACT_APP_CLIENT_PATH}/logout`)
      .then((res) => {
        window.location.href = `${process.env.REACT_APP_CLIENT_REDIRECT}`;
      })
      .catch((err) => console.log(err));
  };

  if (tokenNotFound) {
    return <Navigate to="/" />;
  }

  if (redirectToAgentDashboard) {
    socket.disconnect();
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
          <div
            className="contained"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px 15px",
              alignItems: "center",
            }}
          >
            <div>
              <img
                src={tshLogo}
                style={{ width: "70px" }}
                alt="The Support Heroes logo"
              />
            </div>
            <Button82
              style={{ height: "35px !important" }}
              onClick={handleDelete}
            ></Button82>
          </div>
          <div className="contained">
            <div className="grid-100">
              <div className="heading">
                <h1>Welcome, {name}</h1>
              </div>
            </div>
            <section className="grid-70 main">
              <h2>t2-originals</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                nam eligendi facere nostrum, iste eveniet unde eaque, vero
                inventore numquam veritatis modi perferendis deleniti aspernatur
                odit ullam cupiditate nemo ipsa.
              </p>
            </section>
            <aside className="grid-30 list">
              <h2>Helscout Case Tracker</h2>
              <div id="roomList">
                <p className={className}>Escalations: {displayValue}</p>
              </div>
              <h2>Employee Discord Status</h2>
              <div id="employeeList">
                {webSocketStatusData.map((data, index) => (
                  <div key={index}>
                    {Object.entries(data).map(([key, value]) => (
                      <ul key={`${index}-${key}`} className="bulleted">
                        <li
                          className={
                            value === "dnd"
                              ? "dnd"
                              : value === "idle"
                              ? "idle"
                              : value === "offline"
                              ? "out"
                              : "in"
                          }
                        >
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
