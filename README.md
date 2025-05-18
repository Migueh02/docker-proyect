# API Node.js con Logs en AWS CloudWatch

Esta aplicación es un backend simple en Node.js que envía logs a AWS CloudWatch y está diseñada para ser desplegada en Amazon ECS (Elastic Container Service).

## Funcionalidades

- Servidor Express básico
- Configuración de logs con Winston
- Integración con AWS CloudWatch para gestión de logs
- Dockerización para despliegue en Amazon ECS

## Requisitos previos

- Node.js (v12+)
- Docker
- Cuenta de AWS con permisos para CloudWatch y ECS
- AWS CLI configurado (para despliegue)

## Desarrollo local

1. Instalar dependencias:
   ```
   npm install
   ```

2. Configurar variables de entorno (copiar `.env.example` a `.env` y editar según sea necesario)

3. Iniciar en modo desarrollo:
   ```
   npm run dev
   ```

## Uso con Docker (local)

1. Construir la imagen:
   ```
   docker build -t node-cloudwatch-app .
   ```

2. Ejecutar el contenedor:
   ```
   docker run -p 3000:3000 --env-file .env node-cloudwatch-app
   ```

O simplemente usar docker-compose:
```
docker-compose up
```

## Endpoints

- `GET /`: Ruta principal, devuelve un mensaje de éxito
- `GET /error`: Genera un error intencional para probar los logs en CloudWatch

## Despliegue en AWS ECS

### 1. Crear un repositorio ECR

```bash
aws ecr create-repository --repository-name node-cloudwatch-app
```

### 2. Autenticar Docker con ECR

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin [CUENTA_AWS].dkr.ecr.[REGION].amazonaws.com
```

### 3. Etiquetar y subir la imagen

```bash
docker build -t [CUENTA_AWS].dkr.ecr.[REGION].amazonaws.com/node-cloudwatch-app:latest .
docker push [CUENTA_AWS].dkr.ecr.[REGION].amazonaws.com/node-cloudwatch-app:latest
```

### 4. Crear una definición de tarea ECS

- Crear un archivo JSON para la definición de tarea (task-definition.json)
- Registrar la definición de tarea:
  ```bash
  aws ecs register-task-definition --cli-input-json file://task-definition.json
  ```

### 5. Crear un servicio ECS

- Utilizar la consola de AWS o el CLI para crear un servicio en un clúster ECS existente o nuevo

## Configuración de IAM para CloudWatch

Para que la aplicación pueda enviar logs a CloudWatch, necesita los siguientes permisos:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogStreams"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

## Variables de entorno para producción

- `NODE_ENV`: Establecer a 'production'
- `PORT`: Puerto donde se ejecutará la aplicación (por defecto 3000)
- `ENABLE_CLOUDWATCH`: Establecer a 'true' para activar los logs en CloudWatch
- `AWS_REGION`: Región de AWS donde se encuentra CloudWatch
- `CLOUDWATCH_GROUP_NAME`: Nombre del grupo de logs en CloudWatch

## Notas importantes

- En producción, NO utilizar credenciales AWS en variables de entorno. Utilizar roles IAM para el servicio ECS.
- Ajustar la retención de logs en CloudWatch según necesidades para controlar costos.
- Monitorear el uso de CloudWatch para evitar cargos inesperados.

