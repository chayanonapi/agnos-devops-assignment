const express = require('express');
const client = require('prom-client');
const logger = require('./logger');

const app = express();
const PORT = 8080;

/* ===== Metrics ===== */
const requestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request latency',
  labelNames: ['method', 'route', 'status']
});

const errorCounter = new client.Counter({
  name: 'http_request_errors_total',
  help: 'Total HTTP errors'
});

/* ===== Logging + Metrics Middleware ===== */
app.use((req, res, next) => {
  logger.info({
    service: 'api',
    method: req.method,
    path: req.path
  }, 'Incoming request');

  const end = requestDuration.startTimer();

  res.on('finish', () => {
    end({
      method: req.method,
      route: req.path,
      status: res.statusCode
    });

    if (res.statusCode >= 500) {
      errorCounter.inc();
    }
  });

  next();
});

/* ===== Health Endpoint ===== */
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

/* ===== Metrics Endpoint ===== */
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

/* ===== Start Server ===== */
app.listen(PORT, () => {
  logger.info(
    { service: 'api' },
    `API running on port ${PORT}`
  );
});

