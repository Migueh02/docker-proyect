FROM node:18-alpine

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Puerto que expone el contenedor
EXPOSE 3000

# Variables de entorno para producción
ENV NODE_ENV=production
ENV PORT=3000
ENV ENABLE_CLOUDWATCH=true

# Comando para iniciar la aplicación
CMD ["node", "index.js"] 