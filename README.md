# Nubecitas
Web + Server + DB

---

### Ambiente

Para correr el server es recomendo usar la version de nodejs: 18.

Se necesita tener la Docker instalado localmente para el ambiente de desarrollo.

Cierta parte del codigo esta escrita en `ts` para poder correr el codigo tienes que tener instalado `typescript` en forma global, para ello se puede usar este comando:

```
npm install -g typescript
```

--- 

### Setup del servidor web

Ubicados en el siguiente directorio: `<repo>/server/` podemos seguir estas intrucciones para hacer el setup.

Para crear la imagen podemos correr este siguiente comando:

```
npm run docker:image
```

Para correr el container podemos correr este siguiente comando:

- Para UNIX:

```
npm run docker:cnt:unix
```

- Para PowerShell:

```
npm run docker:cnt:pshell
```

Para eliminar el docker container:

```
npm run docker:rm
```