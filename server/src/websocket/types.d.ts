import { WebSocket } from 'ws'; 

export interface IWebSocketChannel extends IWebSocket{
    data?: string,
    force?: boolean,
    channel?: string
}

export interface IWebSocketError extends IWebSocket{
    errorMessage?: string,
}

export interface IWebSocketMessage extends IWebSocket{
    message?: string,
}

export interface IWebSocket { ws: WebSocket }
