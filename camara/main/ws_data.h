#include <stdio.h>
#include <string.h>

char* ws_json_data(const char* id, const char* channel, const char* data) {
    const char* str1 = "{\"data\":\""; 
    const char* str2 = data;
    const char* str3 = "\",\"channel\":\"";
    const char* str4 = channel;
    const char* str5 = "\",\"id\":\"";
    const char* str6 = id;
    const char* str7 = "\"}";
    size_t len1 = strlen(str1);
    size_t len2 = strlen(str2);
    size_t len3 = strlen(str3);
    size_t len4 = strlen(str4);
    size_t len5 = strlen(str5);
    size_t len6 = strlen(str6);
    size_t len7 = strlen(str7);

    char* result = (char*)malloc(len1 + len2 + len3 + len4 + len5+ len6+ len7+ 1);

    if (result == NULL) {
        fprintf(stderr, "Memory allocation failed.\n");
        exit(EXIT_FAILURE);
    }

    strcpy(result, str1);
    strcat(result, str2);
    strcat(result, str3);
    strcat(result, str4);
    strcat(result, str5);
    strcat(result, str6);
    strcat(result, str7);
    return result;
}