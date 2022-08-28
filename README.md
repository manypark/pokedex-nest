<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar repositorio
2. Ejecutar
```
npm i
```
3. Tener Nest cli instalado
4. Levantar la base de datos
```
docker-compose up -d
```
5. Recostruir la db con la semilla
```
http://localhost:3000/api/v2/seed (GET)
```

## Stack usado
* Mongo DB
* Nest js