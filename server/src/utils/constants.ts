export const PORTS = {
    WS: 3500,
    HTTP: 3000
};
const DEV_ENDPOINTS = {
    WS: `ws://127.0.0.1:${PORTS.WS}`,
    HTTP: `http://127.0.0.1:${PORTS.HTTP}`
}
export const ENDPOINTS = {
    DEV: DEV_ENDPOINTS
}

export const HTTP_PATHS = {
    ROOT: "/",
    TEST: "/ping"
}

const wrongMessage = (channel: string) => {
    return ` This channel ${channel} doesn't exist`;
}
const wsChannelListened = (channel: string, data: string) => {
    return `[ws] Channel: ${channel}, Data: ${data}`
}
export const MESSAGES = {
    HTTP_CONNECTION_STABLISHED: '[http] Connection detected',
    WS_CONNECTION_STABLISHED: '[ws] Connection detected',
    WS_CHANNEL_LISTENED: wsChannelListened,
    PONG: 'pong',
    PORT_LISTENING: `[http] Server app listening on port ${PORTS.HTTP}`
}

export const ERRORS = {
    WRONG_WS_TYPE: ' The WebSocket message type is not { channel: string, data: string }',
    WRONG_CHANNEL: wrongMessage
}

export const DEFAULT_CAPTURE_INTERVAL = 60*5;
