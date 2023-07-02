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

## DEV Setup

Ubicados en el siguiente directorio: `<repo>/server/` podemos seguir estas intrucciones para hacer el setup.

Para crear la imagen podemos correr este siguiente comando:

```
npm run docker:image
```

Para correr el container podemos correr este siguiente comando:

```
# Para Unix:
npm run docker:cnt:unix

# Para Windows:
npm run docker:cnt:pshell
```

Para parar y borrar el container:

```
npm run docker:stop
```
Para eliminar la imagen de docker:

```
npm run docker:image:rm
```
---
## Test
Para correr los test de forma local tenemos que tener el servidor disponible en el localhost. Es recomendable estar seguro de que los test estan pasando de forma local antes de hacer un Pull Request ya que hay un job en el github action que comprobara que todos los test estan pasando

```
npm run test
```

Para correr un test especifico:

```
npm run test:s <nombre-del-archivo>
```
