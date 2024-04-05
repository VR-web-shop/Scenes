import 'dotenv/config'
import WebSocketServer from 'websocket'
import http from 'http'

const WS_PORT = process.env.WS_PORT
const server = http.createServer((req, res) => {
    res.writeHead(404)
    res.end()
})
server.listen(WS_PORT, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});


const wsServer = new WebSocketServer.server({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    //if (process.env.NODE_ENV === 'development') return true
    //else if (process.env.NODE_ENV === 'test') return true
    //else if (process.env.WS_ALLOWED_ORIGIN === origin) return true
    return true
}

const connections = []

wsServer.on('connect', function(connection) {
    console.log((new Date()) + ' Connection accepted.');
});

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      request.reject();
      return;
    }
    
    const connection = request.accept('echo-protocol', request.origin);
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        const index = connections.indexOf(connection)
        connections.splice(index, 1)
    });

    connections.push(connection)
});

export function sendToClient(obj) {
    const message = JSON.stringify(obj)
    for (const connection of connections)
        connection.send(message)
}
