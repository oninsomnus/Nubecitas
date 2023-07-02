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