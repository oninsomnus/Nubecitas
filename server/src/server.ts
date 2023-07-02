import { startHttpServer } from "./http/server";
import { startWebsocketServer } from "./websocket/server";

(function(){
    startHttpServer();
    startWebsocketServer();
})();
