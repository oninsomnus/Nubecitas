#include <stdio.h>
#include <inttypes.h>
#include <string.h>
#include "sdkconfig.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_chip_info.h"
#include "esp_flash.h"
#include "ws_data.h"
#include "ws_send.h"
#include "wifi.h"
#include "esp_websocket_client.h"
#include "esp_system.h"
#include "take_picture.h"

const char* id = "f_0";

void app_main(void)
{
    connect_wifi();
    vTaskDelay(3000 / portTICK_PERIOD_MS);
    const esp_websocket_client_handle_t client = ws_connect();
    configure_led();
    vTaskDelay(3000 / portTICK_PERIOD_MS);
        take_jpge_picture(client);

    while(true){
        vTaskDelay(10000 / portTICK_PERIOD_MS);
        ws_send_test_data(client, id, "example!!");
    };

}
