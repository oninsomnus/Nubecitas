# Comandos:

Para construir el codigo sin Arduino IDE es recomendado usar este software:
https://docs.espressif.com/projects/esp-idf/en/latest/esp32/index.html

Para chequear la ruta del <USB_Serial> en mac:

```
ls /dev/cu.*
```

Para chequear la ruta del <USB_Serial> en linux:

```
ls /dev/tty*
```

Para construir el codigo y desplegar en el dispositivo:

```
idf.py -p <USB_Serial> flash
```

Para chequear y monitorear el output:

```
idf.py -p <USB_Serial> flash
```