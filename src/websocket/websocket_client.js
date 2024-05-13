/*const serverUrl = 'ws://localhost:8090'; // Change the URL to match your WebSocket server's address
let messageCallback;
let ws;

export function createWebSocket(callback) {
    messageCallback = callback;

    // Check if there's an existing WebSocket connection and if it's in CLOSED or CLOSING state
    if (ws && (ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING)) {
        ws = null; // Clear the existing WebSocket instance
    }

    // Only create a new WebSocket connection if there's no existing connection
    if (!ws || ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING) {
        ws = new WebSocket(serverUrl);

        ws.onopen = function () {
            console.log('WebSocket client connected to server.');

            // Run setInterval to send a message to the server every 5 seconds
            setInterval(() => {
                ws.send('Ping...');
            }, 60000);
        };

        ws.onmessage = function (event) {
            console.log('Received message from WebSocket server:', event.data);
            if (messageCallback) {
                try {
                    const jsonData = JSON.parse(event.data); // Parse event.data as JSON
                    messageCallback(jsonData); // Pass the JSON data to the callback function
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            }
        };

        ws.onerror = function (error) {
            console.error('WebSocket client encountered an error:', error);
            reconnectWebSocket();
        };

        ws.onclose = function () {
            console.log('WebSocket connection closed.');
            reconnectWebSocket();
        };
    }
}

function reconnectWebSocket() {
    console.log('Reconnecting to WebSocket server...');
    setTimeout(() => createWebSocket(messageCallback), 5000);
}*/

const serverUrl = getWebSocketUrl(); // Change the URL to match your WebSocket server's address
let messageCallback;
let ws;

export function createWebSocket(callback) {
    messageCallback = callback;

    // Check if there's an existing WebSocket connection and if it's in CLOSED or CLOSING state
    if (ws && (ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING)) {
        ws = null; // Clear the existing WebSocket instance
    }

    // Only create a new WebSocket connection if there's no existing connection
    if (!ws || ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING) {
        //console.log("This is the serverUrl from client:", serverUrl)
        ws = new WebSocket(serverUrl);

        ws.onopen = function () {
            console.log('WebSocket client connected to server.');

            // Run setInterval to send a message to the server every 5 seconds
            setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send('Ping...');
                }
            }, 60000);
        };

        // Modify the WebSocket message handling logic
        ws.onmessage = function (event) {
            //console.log('Received message from WebSocket server:', event.data);
            if (messageCallback) {
                try {
                    const message = JSON.parse(event.data); // Parse event.data as JSON
                    messageCallback(message); // Pass the message object to the callback function
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            }
        };

        ws.onerror = function (error) {
            console.error('WebSocket client encountered an error:', error);
            reconnectWebSocket();
        };

        ws.onclose = function () {
            console.log('WebSocket connection closed.');
            reconnectWebSocket();
        };
    }
}

export function closeWebSocket() {
    if (ws) {
        ws.close();
        console.log('WebSocket connection closed.');
    }
}

function reconnectWebSocket() {
    console.log('Reconnecting to WebSocket server...');
    setTimeout(() => createWebSocket(messageCallback), 5000);
}

function getWebSocketUrl() {
    //console.log(process.env.REACT_APP_NODE_ENV)
    switch (process.env.REACT_APP_NODE_ENV) {
        case 'production':
            console.log(`wss://${process.env.REACT_APP_WEBSOCKET_SERVER_PORT}`)
            return `wss://${process.env.REACT_APP_WEBSOCKET_SERVER_PORT}`;
        case 'development':
            console.log(`ws://${process.env.REACT_APP_WEBSOCKET_SERVER_PORT}`)
            return `ws://${process.env.REACT_APP_WEBSOCKET_SERVER_PORT}`;
        default:
            throw new Error('Unknown environment');
    }
}