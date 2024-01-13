idf_component_register(
    SRCS "camera_main.c"
    INCLUDE_DIRS "."
    PRIV_INCLUDE_DIRS .
    PRIV_REQUIRES nvs_flash esp_event esp_wifi)
