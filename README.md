# Dockerized API Project

Este proyecto es una API básica desarrollada con Node.js y Express, diseñada para ser ejecutada dentro de un contenedor Docker. La API incluye un endpoint para gestionar una lista de tareas (to-do list).

## Estructura del Proyecto

```
/home/migueh/repositorys/docker-proyect
├── Dockerfile
├── .dockerignore
├── package.json
├── index.js
├── routes/
│   └── todos.js
└── README.md
```

### Archivos principales

- **`index.js`**: Archivo principal que configura el servidor Express y define las rutas base.
- **`routes/todos.js`**: Archivo que contiene las rutas para gestionar las tareas (to-do list).
- **`Dockerfile`**: Archivo que define cómo construir la imagen de Docker.
- **`.dockerignore`**: Archivo que excluye archivos innecesarios del contexto de construcción de Docker.

---

## Instalación y Ejecución

### Requisitos previos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Docker](https://www.docker.com/)
- [NPM](https://www.npmjs.com/)

### Pasos para ejecutar el proyecto localmente

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd docker-proyect
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Accede a la API en `http://localhost:3000`.

---

## Uso de Docker

### Construir la imagen de Docker

1. Asegúrate de que el demonio de Docker esté en ejecución:
   ```bash
   sudo systemctl start docker
   ```

2. Construye la imagen de Docker:
   ```bash
   docker build -t dockerized-api .
   ```

### Ejecutar el contenedor

1. Inicia el contenedor:
   ```bash
   docker run -p 3000:3000 dockerized-api
   ```

2. Accede a la API en `http://localhost:3000`.

---

## Endpoints de la API

### Base URL
`http://localhost:3000`

### Rutas disponibles

#### **GET /**

- **Descripción**: Devuelve un mensaje de bienvenida.
- **Respuesta**:
  ```json
  "Hello, Dockerized World!"
  ```

#### **GET /api/todos**

- **Descripción**: Obtiene todas las tareas.
- **Respuesta**:
  ```json
  [
    { "id": 1, "title": "Task 1", "completed": false }
  ]
  ```

#### **POST /api/todos**

- **Descripción**: Crea una nueva tarea.
- **Cuerpo de la solicitud**:
  ```json
  { "title": "New Task" }
  ```
- **Respuesta**:
  ```json
  { "id": 2, "title": "New Task", "completed": false }
  ```

#### **PUT /api/todos/:id**

- **Descripción**: Actualiza una tarea existente.
- **Cuerpo de la solicitud**:
  ```json
  { "title": "Updated Task", "completed": true }
  ```
- **Respuesta**:
  ```json
  { "id": 1, "title": "Updated Task", "completed": true }
  ```

#### **DELETE /api/todos/:id**

- **Descripción**: Elimina una tarea por ID.
- **Respuesta**: Código de estado `204 No Content`.

---

## Notas adicionales

- **BuildKit**: Se recomienda habilitar BuildKit para construir imágenes de Docker de manera más eficiente. Puedes habilitarlo temporalmente con:
  ```bash
  DOCKER_BUILDKIT=1 docker build -t dockerized-api .
  ```

- **Archivos ignorados**: El archivo `.dockerignore` asegura que `node_modules` y otros archivos innecesarios no se incluyan en la imagen de Docker.

---

## Autor

Proyecto desarrollado por **Migueh**.

