const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');
const { hostname } = require('os');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Nombre de la aplicación y entorno
const appName = process.env.APP_NAME || 'node-cloudwatch-app';
const environment = process.env.NODE_ENV || 'development';

// Configuración del logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: {
    service: appName,
    environment,
    hostname: hostname(),
  },
  transports: [
    // Siempre registrar en la consola
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

// Añadir transporte de CloudWatch si estamos en producción (o si se especifica forzadamente)
if (process.env.NODE_ENV === 'production' || process.env.ENABLE_CLOUDWATCH === 'true') {
  logger.add(
    new WinstonCloudWatch({
      logGroupName: process.env.CLOUDWATCH_GROUP_NAME || `/${appName}/${environment}`,
      logStreamName: function() {
        // Crear un nombre de stream único basado en la fecha y hostname
        const date = new Date().toISOString().split('T')[0];
        return `${date}-${hostname()}-${Math.floor(Math.random() * 10000)}`;
      },
      awsRegion: process.env.AWS_REGION || 'us-east-1',
      messageFormatter: ({ level, message, ...meta }) => {
        return JSON.stringify({
          level,
          message,
          timestamp: new Date().toISOString(),
          ...meta,
        });
      },
      retentionInDays: 14,
    })
  );
  logger.info('CloudWatch logs habilitado');
} else {
  logger.info('CloudWatch logs deshabilitado (solo logs en consola)');
}

module.exports = { logger }; 