#include <stdio.h>
#include <string.h>
#include "blink.h"
#include "esp_websocket_client.h"

esp_websocket_client_handle_t ws_connect(){
    const esp_websocket_client_config_t ws_cfg = {
        .uri = "ws://192.168.1.174",
        .port = 3500,
    };
    const esp_websocket_client_config_t *ws_cfg2 = &ws_cfg;
    const esp_websocket_client_handle_t client = esp_websocket_client_init(ws_cfg2);
    const esp_err_t err = esp_websocket_client_start(client);
    return client;
}

void ws_send(esp_websocket_client_handle_t client, char* id, char* channel, char* message){
    s_led_state = 0;
    blink_led();
    vTaskDelay(200 / portTICK_PERIOD_MS);

    if(esp_websocket_client_is_connected(client)){
        char* concatenatedString = ws_json_data(id, channel, message);
        const int send_data_err = esp_websocket_client_send_text(client, concatenatedString, strlen(concatenatedString), 1000);
        if(send_data_err != -1){
            s_led_state = 1;
        }
        free(concatenatedString);
    }else{
        printf("Not connected to ws server!\n");
    }   
    blink_led();
}

void ws_send_test_data(esp_websocket_client_handle_t client, const char* id, char* message){
    ws_send(client, id, "test", message);
}

void ws_send_image_data(esp_websocket_client_handle_t client, const char* id, char* message){
    ws_send(client, id, "test", message);
}
