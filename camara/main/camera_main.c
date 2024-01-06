#include <stdio.h>
#include <inttypes.h>
#include "sdkconfig.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_chip_info.h"
#include "esp_flash.h"

void app_main(void)
{
    for (int i = 10; i >= 0; i--) {
        printf("Restarting in %d seconds.\n", i);
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
    printf("Cool Restarting now.\n");
    fflush(stdout);
    esp_restart();
}
