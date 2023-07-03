import { startHttpServer } from "./http";
import { startWebsocketServer } from "./websocket";

(function(){
    startHttpServer();
    startWebsocketServer();
})();
