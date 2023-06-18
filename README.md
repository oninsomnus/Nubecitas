# Nubecitas
Web + Server + DB

---

### Ambiente

Para correr el server es recomendo usar la version de nodejs: 18

Se necesita tener la Docker instalado localmente para el ambiente de desarrollo

--- 

### Setup del servidor web

Ubicados en el siguiente directorio: `<repo>/server/` podemos seguir estas intrucciones para hacer el setup.

Para crear la imagen podemos correr este siguiente comando:

```
npm run build:image
```

Para correr el container podemos correr este siguiente comando:

- Para UNIX:

```
npm run cnt:unix
```

- Para PowerShell:

```
npm run cnt:pshell
```