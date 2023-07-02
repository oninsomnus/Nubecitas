export const PORTS = {
    WS: 3500,
    HTTP: 3000
};
const DEV_ENDPOINTS = {
    WS: `ws://localhost:${PORTS.WS}`,
    HTTP: `http://localhost:${PORTS.HTTP}`
}
export const ENDPOINTS = {
    DEV: DEV_ENDPOINTS
}

export const HTTP_PATHS = {
    ROOT: "/",
    TEST: "/ping"
}