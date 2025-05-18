const express = require('express');
const dotenv = require('dotenv');
const { logger } = require('./logger');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  logger.info('Petición recibida en la ruta principal');
  res.json({ message: 'API funcionando correctamente' });
});

// Ruta para probar errores
app.get('/error', (req, res) => {
  try {
    logger.info('Generando error intencional para probar los logs');
    throw new Error('Error intencional para probar CloudWatch Logs');
  } catch (error) {
    logger.error('Error capturado:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Manejador global de errores
app.use((err, req, res, next) => {
  logger.error('Error no manejado:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  logger.info(`Servidor ejecutándose en el puerto ${PORT}`);
});

// Manejar señales de terminación
process.on('SIGTERM', () => {
  logger.info('Recibida señal SIGTERM. Cerrando el servidor.');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('Recibida señal SIGINT. Cerrando el servidor.');
  process.exit(0);
});

// Capturar errores no manejados
process.on('uncaughtException', (error) => {
  logger.error('Error no capturado:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Promesa rechazada no manejada:', reason);
  process.exit(1);
}); 