import 'dotenv/config'
import WebSocketServer from 'websocket'
import fs from 'fs'
import http from 'http'
import https from 'https';

const WS_PORT = process.env.WS_PORT
const WS_ALLOWED_ORIGINS = process.env.WS_ALLOWED_ORIGINS
const WS_CERTIFICATE_PATH = process.env.WS_CERTIFICATE_PATH
const WS_PRIVATE_KEY_PATH = process.env.WS_PRIVATE_KEY_PATH

let connections = []
let server = null;
let wsServer = null;

/**
 * @function buildServer
 * @description Builds a server based on the environment
 * @returns {http.Server | https.Server}
 */
function buildServer() {
    /**
     * @function requestListeners
     * @description Handles requests
     * @param {http.IncomingMessage}
     * @param {http.ServerResponse}
     * @returns {void}
     */
    const requestListeners = (req, res) => {
        res.writeHead(404)
        res.end()
    }

    const ENV = process.env.NODE_ENV
    switch (ENV) {
        case 'production':
            return https.createServer({
                key: fs.readFileSync(WS_PRIVATE_KEY_PATH),
                cert: fs.readFileSync(WS_CERTIFICATE_PATH)
            }, requestListeners)
        default:
            return http.createServer(requestListeners)
    }
}

/**
 * @function originIsAllowed
 * @description Checks if the origin is allowed
 * @param {string} origin
 * @returns {boolean}
 */
function originIsAllowed(origin) {
    if (process.env.NODE_ENV === 'development') return true
    else if (process.env.NODE_ENV === 'test') return true
    else {
        const origins = WS_ALLOWED_ORIGINS.split(',')
        return origins.includes(origin)
    }
}

/**
 * @function log
 * @description Logs a message
 * @param {string} message
 * @returns {void}
 */
function log(message) {
    console.log(`${new Date()}: ${message}`)
}

/**
 * @function sendToClient
 * @description Sends a message to all clients
 * @param {object} obj
 * @returns {void}
 */
export function sendToClient(obj) {
    const message = JSON.stringify(obj)
    for (const connection of connections)
        connection.send(message)
}

/**
 * @function connect
 * @description Logs a connection
 * @param {WebSocketConnection} connection
 * @returns {void}
 */
function connect(connection) {
    log(`Peer ${connection.remoteAddress} connected.`)
}

/**
 * @function connect
 * @description Logs a connection
 * @param {WebSocketConnection} connection
 * @returns {void}
 */
function close(connection) {
    return (reasonCode, description) => {
        log(`
            Peer ${connection.remoteAddress} disconnected, 
            reason: ${reasonCode}, 
            description: ${description}
        `)
        const index = connections.indexOf(connection)
        connections.splice(index, 1)
    }
}

/**
 * @function request
 * @description Handles a request
 * @param {WebSocketRequest} request
 * @returns {void}
 */
function request(request) {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        return;
    }

    const connection = request.accept('echo-protocol', request.origin);
    connection.on('close', close(connection));
    connections.push(connection)
}

server = buildServer()

server.listen(WS_PORT, function () {
    log(`Server is listening on port ${WS_PORT}`)
});

wsServer = new WebSocketServer.server({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('connect', connect);
wsServer.on('request', request);
